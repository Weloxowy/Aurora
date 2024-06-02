using Aurora.Server.Controllers.UserEntity;
using Aurora.Server.Models.AspNetUsers;
using Aurora.Server.Models.PersonalInfoEntity;
using Aurora.Server.Persistance.AspNetUsers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Nodes;

namespace Aurora.Server.Controllers.AspNetUsers
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserEntityController : ControllerBase
    {
        private readonly AspNetUsersService _userEntityService = new AspNetUsersService();

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            foreach (var cookie in Request.Cookies.Keys)
            {
                if (cookie.StartsWith(".AspNetCore.Identity.Application"))
                {
                    Response.Cookies.Delete(cookie);
                }
            }

            return Ok("Identity cookies deleted successfully.");

        }

        [HttpGet("info")]
        public async Task<IActionResult> GetUserInfo()
        {
            // Check if user is authenticated
            var user = HttpContext.User;
            if (user.Identity != null && user.Identity.IsAuthenticated)
            {
                // Retrieve user ID from claims
                var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null)
                {
                    return BadRequest("User ID claim not found.");
                }

                // Parse user ID
                if (!Guid.TryParse(userIdClaim.Value, out Guid userId))
                {
                    return BadRequest("Invalid user ID format.");
                }

                // Retrieve user entity by ID
                using (var session = NHibernateHelper.OpenSession())
                {
                    var userEntity = session.Get<Models.AspNetUsers.AspNetUsers>(userIdClaim.Value);
                    if (userEntity == null)
                    {
                        return NotFound("User not found.");
                    }

                    return Ok(userEntity);
                }
            }
            else
            {
                // User is not authenticated
                return Unauthorized();
            }
        }

        [HttpPost("registerCustom")]
        public ActionResult<Models.AspNetUsers.AspNetUsers> Register([FromBody] Models.AspNetUsers.AspNetUsers userEntity)
        {
            if (userEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        /*
                         * if (!_aspNetUsersService.VerifyPassword(userEntity.PasswordHash))
                         {
                             return Conflict("Password is too short");
                         }
                        */
                        var passwordHasher = new PasswordHasher<Models.AspNetUsers.AspNetUsers>();
                        string hashedPassword = passwordHasher.HashPassword(null, userEntity.PasswordHash);
                        userEntity.PasswordHash = hashedPassword;

                        if (userEntity.Email != null)
                        {
                            userEntity.NormalizedEmail = userEntity.Email.ToUpper();
                            userEntity.UserName = userEntity.Email;
                            userEntity.NormalizedUserName = userEntity.UserName.ToUpper();

                        }

                        userEntity.UserRank = UserRank.NonConfirmedUser;

                        if (userEntity.FirstName != null)
                            userEntity.FirstName = userEntity.FirstName;
                        if (userEntity.LastName != null)
                            userEntity.LastName = userEntity.LastName;

                        session.Save(userEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = userEntity.Id }, userEntity);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }

        }


        [HttpGet]
        public ActionResult<IEnumerable<Models.AspNetUsers.AspNetUsers>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var categoryEntities = session.Query<Models.AspNetUsers.AspNetUsers>().ToList();
                return Ok(categoryEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.AspNetUsers.AspNetUsers> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var userEntity = session.Get<Models.AspNetUsers.AspNetUsers>(id);
                AspNetUsersService user = new AspNetUsersService();
                if (userEntity == null)
                {
                    return NotFound();
                }

                return Ok(userEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.AspNetUsers.AspNetUsers> CreateKlientEntity([FromBody] Models.AspNetUsers.AspNetUsers userEntity)
        {
            if (userEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var passwordHasher = new PasswordHasher<Models.AspNetUsers.AspNetUsers>();
                        string hashedPassword = passwordHasher.HashPassword(null, userEntity.Password);
                        userEntity.PasswordHash = hashedPassword;

                        /*if (!_userEntityService.VerifyPassword(userEntity.Password))
                        {
                            return Conflict("Password is too short");
                        }*/
                        session.Save(userEntity);

                        if (userEntity.Email != null)
                            userEntity.NormalizedEmail = userEntity.Email.ToUpper();
                        if (userEntity.UserName != null)
                            userEntity.NormalizedUserName = userEntity.UserName.ToUpper();

                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = userEntity.Id }, userEntity);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }

        }
        [HttpDelete("{id}")]
        public ActionResult DeleteUserEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var userEntity = session.Get<Models.AspNetUsers.AspNetUsers>(id);

                        if (userEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(userEntity);


                        transaction.Commit();

                        return NoContent();
                    }
                    catch (Exception ex)
                    {

                        transaction.Rollback();
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }
        }
        [HttpPut("{id}")]
        public ActionResult<Models.AspNetUsers.AspNetUsers> EditUserEntity([FromBody] Models.AspNetUsers.AspNetUsers userEntity)
        {
            if (userEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingUser = session.Query<Models.AspNetUsers.AspNetUsers>().FirstOrDefault(u => u.Id == userEntity.Id);
                        if (existingUser == null)
                        {
                            return NotFound("User not found");
                        }

                        /* if (!_userEntityService.VerifyPassword(userEntity.Password))
                         {
                             return Conflict("Password is too short");
                         }


                         existingUser.Password = _userEntityService.HashPassword(userEntity.Password, 16);

                         */
                        // existingUser.AddressId = userEntity.AddressId;
                        session.Update(existingUser);
                        transaction.Commit();

                        return Ok(existingUser);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }
        }

        [HttpGet("allusersinfo")]
        public async Task<ActionResult<List<UserFullInfoDTO>>> GetUserFullInfoAsync()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var users = await Task.Run(() =>
                {
                    return (from u in session.Query<Models.AspNetUsers.AspNetUsers>()
                            join a in session.Query<Models.AddressEntity.AddressEntity>() on u.AddressId equals a.Id into addressJoin
                            from a in addressJoin.DefaultIfEmpty()
                            join b in session.Query<Models.BankInfoEntity.BankInfoEntity>() on u.BankInfoEntityId equals b.Id into bankJoin
                            from b in bankJoin.DefaultIfEmpty()
                            join p in session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>() on u.PersonalInfoEntityId equals p.Id into personalJoin
                            from p in personalJoin.DefaultIfEmpty()
                            select new UserFullInfoDTO
                            {
                                UserId = Guid.Parse(u.Id),
                                FirstName = u.FirstName,
                                LastName = u.LastName,
                                Email = u.Email,
                                IsUserProfileActive = u.IsUserProfileActive,
                                UserRank = u.UserRank,
                                AddressId = a != null ? a.Id : null,
                                Street = a.Street,
                                PostalCode = a.PostalCode,
                                City = a.City,
                                Region = a.Region,
                                Country = a.Country,
                                BankInfoEntityId = b != null ? b.Id : null,
                                AccountNumber = b.AccountNumber,
                                IBANAccountNumber = b.IBANAccountNumber,
                                BankName = b.BankName,
                                SWIFTBankCode = b.SWIFTBankCode,
                                BankCountry = b.Country,
                                OwnerName = b.OwnerName,
                                US = "I US w Małogoszczy",  // Przykładowe wartości, ponieważ nie są określone
                                CityUS = "Małogoszcz",
                                PersonalInfoEntityId = p != null ? p.Id : null,
                                HireDate = p.HireDate,
                                FireDate = p.FireDate,
                                Department = p.Department,
                                Position = p.Position,
                                NIP = p.NIP,
                                HealthCareNumber = p.HealthCareNumber,
                                PersonalNotes = p.Notes,
                                TypeOfContract = p.TypeOfContract
                            }).ToList();
                });

                return Ok(users);
            }
        }



        [HttpGet("allinfo")]
        public async Task<IActionResult> GetUserAllInfo()
        {
            // Check if user is authenticated
            var user = HttpContext.User;
            if (user.Identity != null && user.Identity.IsAuthenticated)
            {
                // Retrieve user ID from claims
                var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null)
                {
                    return BadRequest("User ID claim not found.");
                }

                // Parse user ID
                if (!Guid.TryParse(userIdClaim.Value, out Guid userId))
                {
                    return BadRequest("Invalid user ID format.");
                }

                // Retrieve user entity by ID
                using (var session = NHibernateHelper.OpenSession())
                {
                    var userEntity = await Task.Run(() =>
                    {
                        return (from u in session.Query<Models.AspNetUsers.AspNetUsers>()
                                join a in session.Query<Models.AddressEntity.AddressEntity>() on u.AddressId equals a.Id into addressJoin
                                from a in addressJoin.DefaultIfEmpty()
                                join b in session.Query<Models.BankInfoEntity.BankInfoEntity>() on u.BankInfoEntityId equals b.Id into bankJoin
                                from b in bankJoin.DefaultIfEmpty()
                                join p in session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>() on u.PersonalInfoEntityId equals p.Id into personalJoin
                                from p in personalJoin.DefaultIfEmpty()
                                where u.Id == userIdClaim.Value
                                select new UserFullInfoDTO
                                {
                                    UserId = Guid.Parse(u.Id),
                                    FirstName = u.FirstName,
                                    LastName = u.LastName,
                                    Email = u.Email,
                                    IsUserProfileActive = u.IsUserProfileActive,
                                    UserRank = u.UserRank,
                                    AddressId = a != null ? a.Id : null,
                                    Street = a.Street,
                                    PostalCode = a.PostalCode,
                                    City = a.City,
                                    Region = a.Region,
                                    Country = a.Country,
                                    BankInfoEntityId = b != null ? b.Id : null,
                                    AccountNumber = b.AccountNumber,
                                    IBANAccountNumber = b.IBANAccountNumber,
                                    BankName = b.BankName,
                                    SWIFTBankCode = b.SWIFTBankCode,
                                    BankCountry = b.Country,
                                    OwnerName = b.OwnerName,
                                    US = "defaultUS",  // Przykładowe wartości, ponieważ nie są określone
                                    CityUS = "defaultCityUS",
                                    PersonalInfoEntityId = p != null ? p.Id : null,
                                    HireDate = p.HireDate,
                                    FireDate = p.FireDate,
                                    Department = p.Department,
                                    Position = p.Position,
                                    NIP = p.NIP,
                                    HealthCareNumber = p.HealthCareNumber,
                                    PersonalNotes = p.Notes,
                                    TypeOfContract = p.TypeOfContract
                                }).FirstOrDefault();
                    });

                    return Ok(userEntity);
                }
            }
            else
            {
                // User is not authenticated
                return Unauthorized();
            }
        }


    }
}




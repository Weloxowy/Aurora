using Aurora.Server.Persistance.AspNetUsers;
using Aurora.Server.Persistence.AddressEntity;
using Aurora.Server.Persistence.BankInfoEntity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Aurora.Server.Controllers.BankInfoEntity
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class BankInfoEntityController : ControllerBase
    {
        private readonly BankInfoEntityService _bankInfoEntityService = new BankInfoEntityService();

        [HttpGet]
        public ActionResult<IEnumerable<Models.BankInfoEntity.BankInfoEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var bankInfoEntities = session.Query<Models.BankInfoEntity.BankInfoEntity>().ToList();
                return Ok(bankInfoEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.BankInfoEntity.BankInfoEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var bankInfoEntity = session.Get<Models.BankInfoEntity.BankInfoEntity>(id);
                if (bankInfoEntity == null)
                {
                    return NotFound();
                }

                return Ok(bankInfoEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.BankInfoEntity.BankInfoEntity> CreateBankInfoEntity([FromBody] Models.BankInfoEntity.BankInfoEntity bankInfoEntity)
        {
            if (bankInfoEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(bankInfoEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = bankInfoEntity.Id }, bankInfoEntity);
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
        public ActionResult DeleteBankInfoEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var bankInfoEntity = session.Get<Models.BankInfoEntity.BankInfoEntity>(id);

                        if (bankInfoEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(bankInfoEntity);
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


        [HttpPut]
        public ActionResult<Models.BankInfoEntity.BankInfoEntity> EditBankInfoEntity([FromBody] Models.BankInfoEntity.BankInfoEntity bankInfoEntity)
        {
            if (bankInfoEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingBankInfo = session.Query<Models.AddressEntity.AddressEntity>().FirstOrDefault(a => a.Id == bankInfoEntity.Id);
                        if (existingBankInfo == null)
                        {
                            return NotFound("Address not found");
                        }

                        Type type = existingBankInfo.GetType();
                        PropertyInfo[] properties = type.GetProperties();
                        foreach (PropertyInfo property in properties)
                        {
                            object value = property.GetValue(bankInfoEntity);
                            property.SetValue(existingBankInfo, value);
                        }

                        session.Update(existingBankInfo);
                        transaction.Commit();
                        return Ok(existingBankInfo);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }
        }
    }
}

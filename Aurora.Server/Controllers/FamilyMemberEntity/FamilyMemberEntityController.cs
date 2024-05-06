using Aurora.Server.Persistance.AspNetUsers;
using Aurora.Server.Persistence.FamilyMemberEntity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.Server.Controllers.FamilyMemberEntity
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyMemberEntityController : ControllerBase
    {
        private readonly FamilyMemberEntityService _familyMemberEntityService = new FamilyMemberEntityService();
        [HttpGet]
        public ActionResult<IEnumerable<Models.FamilyMemberEntity.FamilyMemberEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var familyMemberEntities = session.Query<Models.FamilyMemberEntity.FamilyMemberEntity>().ToList();
                return Ok(familyMemberEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.FamilyMemberEntity.FamilyMemberEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var familyMemberEntity = session.Get<Models.FamilyMemberEntity.FamilyMemberEntity>(id);
                FamilyMemberEntityService user = new FamilyMemberEntityService();
                if (familyMemberEntity == null)
                {
                    return NotFound();
                }

                return Ok(familyMemberEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.FamilyMemberEntity.FamilyMemberEntity> CreateAddressEntity([FromBody] Models.FamilyMemberEntity.FamilyMemberEntity familyMemberEntity)
        {
            if (familyMemberEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(familyMemberEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = familyMemberEntity.Id }, familyMemberEntity);
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
        public ActionResult DeleteFamilyMemberEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var familyMemberEntity = session.Get<Models.FamilyMemberEntity.FamilyMemberEntity>(id);

                        if (familyMemberEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(familyMemberEntity);
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
        public ActionResult<Models.FamilyMemberEntity.FamilyMemberEntity> EditUserEntity([FromBody] Models.FamilyMemberEntity.FamilyMemberEntity familyMemberEntity)
        {
            if (familyMemberEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingFamilyMember = session.Query<Models.AddressEntity.AddressEntity>().FirstOrDefault(f => f.Id == familyMemberEntity.Id);
                        if (existingFamilyMember == null)
                        {
                            return NotFound("Family member not found");
                        }
                        session.Update(existingFamilyMember);
                        transaction.Commit();

                        return Ok(existingFamilyMember);
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

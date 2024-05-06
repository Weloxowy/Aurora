using Aurora.Server.Persistence.FamilyMemberEntity;
using Aurora.Server.Persistence.PersonalInfoEntity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.Server.Controllers.PersonalInfoEntity
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalInfoEntityController : ControllerBase
    {
        private readonly PersonalInfoEntityService _personalInfoEntityService = new PersonalInfoEntityService();
        [HttpGet]
        public ActionResult<IEnumerable<Models.PersonalInfoEntity.PersonalInfoEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var personalInfoEntities = session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>().ToList();
                return Ok(personalInfoEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.PersonalInfoEntity.PersonalInfoEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var personalInfoEntity = session.Get<Models.PersonalInfoEntity.PersonalInfoEntity>(id);
                PersonalInfoEntityService user = new PersonalInfoEntityService();
                if (personalInfoEntity == null)
                {
                    return NotFound();
                }

                return Ok(personalInfoEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.PersonalInfoEntity.PersonalInfoEntity> CreateAddressEntity([FromBody] Models.PersonalInfoEntity.PersonalInfoEntity personalInfoEntity)
        {
            if (personalInfoEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(personalInfoEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = personalInfoEntity.Id }, personalInfoEntity);
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
        public ActionResult DeletePersonalInfoEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var personalInfoEntity = session.Get<Models.PersonalInfoEntity.PersonalInfoEntity>(id);

                        if (personalInfoEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(personalInfoEntity);
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
        public ActionResult<Models.PersonalInfoEntity.PersonalInfoEntity> EditPersonalInfoEntity([FromBody] Models.PersonalInfoEntity.PersonalInfoEntity personalInfoEntity)
        {
            if (personalInfoEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingPersonalInfoEntity = session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>().FirstOrDefault(p => p.Id == personalInfoEntity.Id);
                        if (existingPersonalInfoEntity == null)
                        {
                            return NotFound("Family member not found");
                        }
                        session.Update(existingPersonalInfoEntity);
                        transaction.Commit();

                        return Ok(existingPersonalInfoEntity);
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

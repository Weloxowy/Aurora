using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Aurora.Server.Controllers.RoleEntity
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleEntityController : ControllerBase
    {
        //dodac services
        [HttpGet]
        public ActionResult<IEnumerable<Models.RoleEntity.RoleEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var roleEntities = session.Query<Models.RoleEntity.RoleEntity>().ToList();
                return Ok(roleEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.RoleEntity.RoleEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var roleEntity = session.Get<Models.RoleEntity.RoleEntity>(id);
                if (roleEntity == null)
                {
                    return NotFound();
                }

                return Ok(roleEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.RoleEntity.RoleEntity> CreateRoleEntity([FromBody] Models.RoleEntity.RoleEntity roleEntity)
        {
            if (roleEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(roleEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = roleEntity.Id }, roleEntity);
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
        public ActionResult DeleteRoleEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var roleEntity = session.Get<Models.RoleEntity.RoleEntity>(id);

                        if (roleEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(roleEntity);
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
        public ActionResult<Models.RoleEntity.RoleEntity> EditRoleEntity([FromBody] Models.RoleEntity.RoleEntity roleEntity)
        {
            if (roleEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingRole = session.Query<Models.RoleEntity.RoleEntity>().FirstOrDefault(e => e.Id == roleEntity.Id);
                        if (existingRole == null)
                        {
                            return NotFound("Address not found");
                        }

                        Type type = existingRole.GetType();
                        PropertyInfo[] properties = type.GetProperties();
                        foreach (PropertyInfo property in properties)
                        {
                            object value = property.GetValue(roleEntity);
                            property.SetValue(existingRole, value);
                        }

                        session.Update(existingRole);
                        transaction.Commit();
                        return Ok(existingRole);
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

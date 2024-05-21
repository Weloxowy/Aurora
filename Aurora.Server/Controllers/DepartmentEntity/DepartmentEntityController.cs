using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Aurora.Server.Controllers.DepartmentEntity
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentEntityController : ControllerBase
    {
        //dodac services
        [HttpGet]
        public ActionResult<IEnumerable<Models.DepartmentEntity.DepartmentEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var departmentEntities = session.Query<Models.DepartmentEntity.DepartmentEntity>().ToList();
                return Ok(departmentEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.DepartmentEntity.DepartmentEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var department = session.Get<Models.DepartmentEntity.DepartmentEntity>(id);
                if (department == null)
                {
                    return NotFound();
                }

                return Ok(department);
            }
        }

        [HttpPost]
        public ActionResult<Models.DepartmentEntity.DepartmentEntity> CreateBankInfoEntity([FromBody] Models.DepartmentEntity.DepartmentEntity departmentEntity)
        {
            if (departmentEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(departmentEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = departmentEntity.Id }, departmentEntity);
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
        public ActionResult DeleteDepartmentEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var departmentEntity = session.Get<Models.DepartmentEntity.DepartmentEntity>(id);

                        if (departmentEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(departmentEntity);
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
        public ActionResult<Models.DepartmentEntity.DepartmentEntity> EditDepartmentEntity([FromBody] Models.DepartmentEntity.DepartmentEntity departmentEntity)
        {
            if (departmentEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingDepartment = session.Query<Models.DepartmentEntity.DepartmentEntity>().FirstOrDefault(e => e.Id == departmentEntity.Id);
                        if (existingDepartment == null)
                        {
                            return NotFound("Address not found");
                        }

                        Type type = existingDepartment.GetType();
                        PropertyInfo[] properties = type.GetProperties();
                        foreach (PropertyInfo property in properties)
                        {
                            object value = property.GetValue(departmentEntity);
                            property.SetValue(existingDepartment, value);
                        }

                        session.Update(existingDepartment);
                        transaction.Commit();
                        return Ok(existingDepartment);
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

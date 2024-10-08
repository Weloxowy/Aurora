﻿using Aurora.Server.Persistance.AspNetUsers;
using Aurora.Server.Persistence.AddressEntity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Aurora.Server.Controllers.AddressEntity
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class AddressEntityController : ControllerBase
    {
        private readonly AddressEntityService _addressEntityService = new AddressEntityService();

        [HttpGet]
        public ActionResult<IEnumerable<Models.AddressEntity.AddressEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var addressEntities = session.Query<Models.AddressEntity.AddressEntity>().ToList();
                return Ok(addressEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.AddressEntity.AddressEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var addressEntity = session.Get<Models.AddressEntity.AddressEntity>(id);
                AspNetUsersService user = new AspNetUsersService();
                if (addressEntity == null)
                {
                    return NotFound();
                }

                return Ok(addressEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.AddressEntity.AddressEntity> CreateAddressEntity([FromBody] Models.AddressEntity.AddressEntity addressEntity)
        {
            if (addressEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {         
                        session.Save(addressEntity);
                        transaction.Commit();
                        return CreatedAtAction(nameof(GetById), new { id = addressEntity.Id }, addressEntity);
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
        public ActionResult DeleteAddressEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var addressEntity = session.Get<Models.AddressEntity.AddressEntity>(id);

                        if (addressEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(addressEntity);
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

        
        [HttpPatch]
        public ActionResult<Models.AddressEntity.AddressEntity> EditUserEntity([FromBody] Models.AddressEntity.AddressEntity addressEntity)
        {
            if (addressEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {

                        var existingAddress = session.Query<Models.AddressEntity.AddressEntity>().FirstOrDefault(a => a.Id == addressEntity.Id);
                        if (existingAddress == null)
                        {
                            return NotFound("Address not found");
                        }
                        /*
                         existingAddress = addressEntity;
                         */
                        Type type = existingAddress.GetType();
                        PropertyInfo[] properties = type.GetProperties();
                        foreach (PropertyInfo property in properties)
                        {
                            object value = property.GetValue(addressEntity);
                            property.SetValue(existingAddress, value);
                        }
                        
                        session.Update(existingAddress);
                        transaction.Commit();
                        return Ok(existingAddress);
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

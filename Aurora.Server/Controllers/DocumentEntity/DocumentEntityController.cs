using System.Net.NetworkInformation;
using Aurora.Server.Persistance.AspNetUsers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Microsoft.IdentityModel.Tokens;
using Aurora.Server.Controllers.UserEntity;
using System.Security.Claims;
using Aurora.Server.Models.FileEntity;
using NHibernate.Linq;

namespace Aurora.Server.Controllers.DocumentEntity
{

    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentEntityController : ControllerBase
    {

        [HttpGet]
        public ActionResult<IEnumerable<Models.FileEntity.DocumentEntity>> GetAll()
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var documentEntities = session.Query<Models.FileEntity.DocumentEntity>().ToList();
                return Ok(documentEntities);
            }
        }

        [HttpGet("id/{id}")]
        public ActionResult<Models.FileEntity.DocumentEntity> GetById(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var documentEntity = session.Get<Models.FileEntity.DocumentEntity>(id);
                if (documentEntity == null)
                {
                    return NotFound();
                }

                return Ok(documentEntity);
            }
        }

        [HttpPost]
        public ActionResult<Models.FileEntity.DocumentEntity> CreateDocumentEntity([FromBody] Models.FileEntity.DocumentEntity documentEntity)
        {
            if (documentEntity == null)
            {
                return BadRequest("Invalid data");
            }

            try
            {
                /*
                // Assuming that InputData contains the Base64 encoded string of the PDF file
                byte[] bytes = Convert.FromBase64String(documentEntity.InputData);
                string base64String = Convert.ToBase64String(bytes);
                documentEntity.FileItem = base64String;
                */
                using (var session = NHibernateHelper.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        try
                        {
                            session.Save(documentEntity);
                            transaction.Commit();
                            return CreatedAtAction(nameof(GetById), new { id = documentEntity.Id }, documentEntity);
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error processing file: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteDocumentEntity(Guid id)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var documentEntity = session.Get<Models.FileEntity.DocumentEntity>(id);

                        if (documentEntity == null)
                        {
                            return NotFound();
                        }


                        session.Delete(documentEntity);
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
        /*
        [HttpGet("documentinfo/{id}")]
        public async Task<IActionResult> GetDocumentInfo(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid ID");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var userEntity = await Task.Run(() =>
                    {
                        return (from d in session.Query<Models.FileEntity.DocumentEntity>()
                                join a in session.Query<Models.AspNetUsers.AspNetUsers>() on d.SenderId equals a.Id into aspJoin
                                from a in aspJoin.DefaultIfEmpty()
                                join ap in session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>() on a.PersonalInfoEntityId equals ap.Id into apJoin
                                from ap in apJoin.DefaultIfEmpty()
                                join b in session.Query<Models.AspNetUsers.AspNetUsers>() on d.RecieversId equals b.Id into bspJoin
                                from b in bspJoin.DefaultIfEmpty()
                                join bp in session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>() on b.PersonalInfoEntityId equals bp.Id into bpJoin
                                from bp in apJoin.DefaultIfEmpty()
                                where d.Id.ToString() == id
                                select new DocumentEntityDTO
                                {
                                    Id = d.Id,
                                    Description = d.Description,
                                    TypeOfDocument = d.TypeOfDocument,
                                    Tags = d.Tags,
                                    Status = d.Status,
                                    CreateDate = d.CreateDate,
                                    Language = d.Language,
                                    FileItem = d.FileItem,
                                    InputData = d.InputData,
                                    SenderId = a != null ? Guid.Parse(a.Id) : Guid.NewGuid(),
                                    SFirstName = a.FirstName,
                                    SLastName = a.LastName,
                                    SPersonalInfoEntityId = a.PersonalInfoEntityId,
                                    SDepartment = ap.Department,
                                    SPosition = ap.Position,
                                    RecieversId = b != null ? Guid.Parse(b.Id) : Guid.NewGuid(),
                                    RFirstName = b.FirstName,
                                    RLastName = b.LastName,
                                    RPersonalInfoEntityId = b.PersonalInfoEntityId,
                                    RDepartment = bp.Department,
                                    RPosition = bp.Position,
                                }).FirstOrDefault();
                    });

                    if (userEntity == null)
                    {
                        return NotFound("Document not found");
                    }

                    return Ok(userEntity);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving document: {ex.Message}");
                }
            }
        }
        */

        //skuteczną metodą na tworzenie zagnieżdzonych zapytań będzie rozbicie ich jak poniżej. podwojne zagnieżdzenie nie jest obsługiwane przez EF.
        [HttpPost("documentinfo")]
        public async Task<IActionResult> GetDocumentInfo([FromBody] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid ID");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                try
                {
                    if (!Guid.TryParse(id, out Guid documentId))
                    {
                        return BadRequest("Invalid GUID format");
                    }

                    // Pobranie DocumentEntity
                    var documentEntity = await Task.Run(() => session.Query<Models.FileEntity.DocumentEntity>()
                        .FirstOrDefault(d => d.Id == documentId));

                    if (documentEntity == null)
                    {
                        return NotFound("Document not found");
                    }

                    // Pobranie informacji o Sender
                    var sender = await Task.Run(() =>
                    {
                        return (from a in session.Query<Models.AspNetUsers.AspNetUsers>()
                                join ap in session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>() on a.PersonalInfoEntityId equals ap.Id into apJoin
                                from ap in apJoin.DefaultIfEmpty()
                                where a.Id == documentEntity.SenderId
                                select new
                                {
                                    a.Id,
                                    a.FirstName,
                                    a.LastName,
                                    a.PersonalInfoEntityId,
                                    Department = ap.Department,
                                    Position = ap.Position
                                }).FirstOrDefault();
                    });

                    // Pobranie informacji o Reciever
                    var reciever = await Task.Run(() =>
                    {
                        return (from b in session.Query<Models.AspNetUsers.AspNetUsers>()
                                join bp in session.Query<Models.PersonalInfoEntity.PersonalInfoEntity>() on b.PersonalInfoEntityId equals bp.Id into bpJoin
                                from bp in bpJoin.DefaultIfEmpty()
                                where b.Id == documentEntity.RecieversId
                                select new
                                {
                                    b.Id,
                                    b.FirstName,
                                    b.LastName,
                                    b.PersonalInfoEntityId,
                                    Department = bp.Department,
                                    Position = bp.Position
                                }).FirstOrDefault();
                    });

                    // Stworzenie obiektu DTO
                    var documentEntityDTO = new DocumentEntityDTO
                    {
                        Id = documentEntity.Id,
                        Description = documentEntity.Description,
                        TypeOfDocument = documentEntity.TypeOfDocument,
                        Tags = documentEntity.Tags,
                        Status = documentEntity.Status,
                        CreateDate = documentEntity.CreateDate,
                        Language = documentEntity.Language,
                        FileItem = documentEntity.FileItem,
                        InputData = documentEntity.InputData,
                        SenderId = sender != null ? Guid.Parse(sender.Id) : Guid.Empty,
                        SFirstName = sender?.FirstName,
                        SLastName = sender?.LastName,
                        SDepartment = sender?.Department,
                        SPosition = sender?.Position,
                        RecieversId = reciever != null ? Guid.Parse(reciever.Id) : Guid.Empty,
                        RFirstName = reciever?.FirstName,
                        RLastName = reciever?.LastName,
                        RDepartment = reciever?.Department,
                        RPosition = reciever?.Position,
                    };

                    return Ok(documentEntityDTO);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving document: {ex.Message}");
                }
            }
        }

        /*
        [HttpPatch]
        public ActionResult<Models.FileEntity.DocumentEntity> EditDocumentEntity([FromBody] Models.FileEntity.DocumentEntity documentEntity)
        {
            if (documentEntity == null)
            {
                return BadRequest("Invalid data");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var existingDocument = session.Query<Models.FileEntity.DocumentEntity>().FirstOrDefault(a => a.Id == documentEntity.Id);
                        if (existingDocument == null)
                        {
                            return NotFound("Document not found");
                        }

                        Type type = existingDocument.GetType();
                        PropertyInfo[] properties = type.GetProperties();

                        foreach (PropertyInfo property in properties)
                        {
                            object newValue = property.GetValue(documentEntity);

                            if (newValue != null)
                            {
                                property.SetValue(existingDocument, newValue);
                            }
                        }

                        session.Update(existingDocument);
                        transaction.Commit();
                        return Ok(existingDocument);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        // Log the exception for debugging
                        Console.WriteLine($"Exception: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        if (ex.InnerException != null)
                        {
                            Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                            Console.WriteLine($"Inner Stack Trace: {ex.InnerException.StackTrace}");
                        }
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }
        }
        */
        [HttpPatch("id/{id}")]
        public ActionResult EditDocumentStatus(Guid id, [FromBody] int status)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("Invalid ID");
            }

            using (var session = NHibernateHelper.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var existingDocument = session.Query<Models.FileEntity.DocumentEntity>().FirstOrDefault(a => a.Id == id);
                        if (existingDocument == null)
                        {
                            return NotFound("Document not found");
                        }

                        switch (status)
                        {
                            case 0:
                                existingDocument.Status = FileStatus.Delivered; // Only update the status field
                                break;
                            case 1:
                                existingDocument.Status = FileStatus.Accepted; // Only update the status field
                                break;
                            case 2:
                                existingDocument.Status = FileStatus.Rejected ; // Only update the status field
                                break;
                            case 3:
                                existingDocument.Status = FileStatus.Error ; // Only update the status field
                                break;
                            default:
                                throw new Exception("Wrong file status");
                        }

                        session.Update(existingDocument);
                        transaction.Commit();
                        return Ok(existingDocument);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        // Log the exception for debugging
                        Console.WriteLine($"Exception: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        if (ex.InnerException != null)
                        {
                            Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                            Console.WriteLine($"Inner Stack Trace: {ex.InnerException.StackTrace}");
                        }
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
                    }
                }
            }
        }

    }
}

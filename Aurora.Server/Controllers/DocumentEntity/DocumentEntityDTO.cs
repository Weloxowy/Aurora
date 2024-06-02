using Aurora.Server.Models.FileEntity;

namespace Aurora.Server.Controllers.DocumentEntity
{
    public class DocumentEntityDTO
    {

        public virtual Guid Id { get; set; }
        public virtual string Description { get; set; }
        public virtual string TypeOfDocument { get; set; }
        public virtual string? Tags { get; set; }
        public virtual FileStatus Status { get; set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual string Language { get; set; }
        public virtual string FileItem { get; set; }
        public virtual string InputData { get; set; }

        //sender
        public virtual Guid SenderId { get; set; }
        public virtual string? SFirstName { get; set; }
        public virtual string? SLastName { get; set; }
        public virtual string? SDepartment { get; set; }
        public virtual string? SPosition { get; set; }
        public virtual Guid? SPersonalInfoEntityId { get; set; }

        

        //reciever
        public virtual Guid RecieversId { get; set; }
        public virtual string? RFirstName { get; set; }
        public virtual string? RLastName { get; set; }
        public virtual string? RDepartment { get; set; }
        public virtual string? RPosition { get; set; }
        public virtual Guid? RPersonalInfoEntityId { get; set; }

    }
}

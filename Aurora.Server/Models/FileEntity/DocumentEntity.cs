using System.Reflection.Metadata;

namespace Aurora.Server.Models.FileEntity
{
    public class DocumentEntity : FileEntity
    {
        public DocumentEntity(): base() { }

        public DocumentEntity(Guid id, string senderId, string recieversId, string description, string typeOfDocument, string tags, FileStatus status, DateTime createDate, string language, string fileItem, string inputData)
            : base(id,senderId,recieversId,description,typeOfDocument,tags,status,createDate,language)
        {
            FileItem = fileItem;
            InputData = inputData;
        }

        public virtual string FileItem { get; set; }
        public virtual string InputData { get; set; }

    }
}

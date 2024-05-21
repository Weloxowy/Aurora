namespace Aurora.Server.Models.FileEntity
{
    public class DocumentEntity : FileEntity
    {
        public DocumentEntity(): base() { }

        public DocumentEntity(Guid id, Guid senderId, Guid[] recieversId, string description, string typeOfDocument, string[] tags, FileStatus status, DateTime createDate, string language, byte[] file, string[] inputData)
            : base(id,senderId,recieversId,description,typeOfDocument,tags,status,createDate,language)
        {
            File = file;
            InputData = inputData;
        }

        public virtual byte[] File { get; set; }
        public virtual string[] InputData { get; set; }

    }
}

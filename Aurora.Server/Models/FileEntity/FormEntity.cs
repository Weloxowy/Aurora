namespace Aurora.Server.Models.FileEntity
{
    public class FormEntity : FileEntity
    {
        public FormEntity(): base() { }

        public FormEntity(Guid id, string senderId, string recieversId, string description, string typeOfDocument, string tags, FileStatus status, DateTime createDate, string language, string typeOfForm, string inputData)
            : base(id, senderId, recieversId, description, typeOfDocument, tags, status, createDate, language)
        {
            TypeOfForm = typeOfForm;
            InputData = inputData;
        }
        public virtual string TypeOfForm { get; set; }//enum
        public virtual string InputData { get; set; }
     
    }
}

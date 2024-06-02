using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.FileEntity
{
    public class DocumentEntityMapping : ClassMap<DocumentEntity>
    {
        readonly string tablename = nameof(DocumentEntity);

        public DocumentEntityMapping()
        {
            Id(x => x.Id);
            Map(x => x.SenderId);
            Map(x => x.RecieversId);
            Map(x => x.Description);
            Map(x => x.TypeOfDocument);
            Map(x => x.Tags);
            Map(x => x.Status).CustomType<FileStatus>();
            Map(x => x.CreateDate);
            Map(x => x.Language);
            Map(x => x.FileItem);
            Map(x => x.InputData);
            Table(tablename);
        }
    }
}

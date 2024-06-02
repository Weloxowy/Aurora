using FluentMigrator;

namespace Aurora.Server.Persistence.DocumentEntity.Database
{
    [Migration(011)]
    public class CreateTable_DocumentEntity : Migration
    {
        public override void Down()
        {
            if (Schema.Table("DocumentEntity").Exists())
            {
                Delete.Table("DocumentEntity");
            };
        }

        public override void Up()
        {
            Create.Table("DocumentEntity")
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.Id)).AsGuid().NotNullable().PrimaryKey()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.SenderId)).AsString().NotNullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.RecieversId)).AsString().NotNullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.Description)).AsString().Nullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.TypeOfDocument)).AsString().NotNullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.Tags)).AsString().Nullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.Status)).AsInt32().NotNullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.CreateDate)).AsDateTime().NotNullable() //tu DateTime
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.Language)).AsString().Nullable()
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.FileItem)).AsString(Int32.MaxValue).Nullable() //problem był taki, że nie może być w bazie pola o nazwie File (słowo kluczowe). testować inne metody.
               .WithColumn(nameof(Models.FileEntity.DocumentEntity.InputData)).AsString().NotNullable();
            Create.ForeignKey("FK_Document_Sender").FromTable("DocumentEntity").ForeignColumn("SenderId").ToTable("AspNetUsers").PrimaryColumn("Id");
        }
    }
}

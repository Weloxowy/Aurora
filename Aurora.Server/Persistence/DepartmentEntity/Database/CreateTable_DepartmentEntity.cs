using FluentMigrator;

namespace Aurora.Server.Persistence.DepartmentEntity.Database
{
    [Migration(004)]
    public class CreateTable_DepartmentEntity : Migration
    {
        public override void Up()
        {
            Create.Table("DepartmentEntity")
                .WithColumn(nameof(Models.DepartmentEntity.DepartmentEntity.Id)).AsGuid().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.DepartmentEntity.DepartmentEntity.DepartmentName)).AsString().NotNullable()
                .WithColumn(nameof(Models.DepartmentEntity.DepartmentEntity.DepartmentInfo)).AsString().NotNullable();
        }

        public override void Down()
        {
            if (Schema.Table("DepartmentEntity").Exists())
            {
                Delete.Table("DepartmentEntity");
            };

        }
    }
}

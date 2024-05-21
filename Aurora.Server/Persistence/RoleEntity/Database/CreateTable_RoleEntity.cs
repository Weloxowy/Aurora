using FluentMigrator;

namespace Aurora.Server.Persistence.RoleEntity.Database
{
    [Migration(005)]
    public class CreateTable_RoleEntity : Migration
    {
        public override void Up()
        {
            Create.Table("RoleEntity")
                .WithColumn(nameof(Models.RoleEntity.RoleEntity.Id)).AsString().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.RoleEntity.RoleEntity.RoleName)).AsString().NotNullable();
        }

        public override void Down()
        {
            if (Schema.Table("RoleEntity").Exists())
            {
                Delete.Table("RoleEntity");
            };
        }
    }
}

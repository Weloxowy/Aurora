using FluentMigrator;

namespace Aurora.Server.Persistence.DepartmentRoleEntity.Database
{
    [Migration(006)]
    public class CreateTable_DepartmentRoleEntity : Migration
    {
        public override void Down()
        {
            if (Schema.Table("DepartmentRoleEntity").Exists())
            {
                Delete.Table("DepartmentRoleEntity");
            };
        }

        public override void Up()
        {
            Create.Table("DepartmentRoleEntity")
               .WithColumn(nameof(Models.DepartmentRoleEntity.DepartmentRoleEntity.Id)).AsGuid().NotNullable().PrimaryKey()
               .WithColumn("RoleId").AsGuid().Nullable()
               .WithColumn("DepartmentId").AsGuid().Nullable();
            Create.ForeignKey("FK_DepartmentRole_Role").FromTable("DepartmentRoleEntity").ForeignColumn("RoleId").ToTable("RoleEntity").PrimaryColumn("Id");
            Create.ForeignKey("FK_DepartmentRole_Department").FromTable("DepartmentRoleEntity").ForeignColumn("DepartmentId").ToTable("DepartmentEntity").PrimaryColumn("Id");
        }
    }
}

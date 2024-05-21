using FluentMigrator;

namespace Aurora.Server.Persistance.AspNetUsers.Database
{
    [Migration(009)]
    public class CreateTable_UserClaims : Migration
    {
        public override void Down()
        {
            Delete.Table("AspNetUserClaims");
        }

        public override void Up()
        {
            Create.Table("AspNetUserClaims")
           .WithColumn("Id").AsInt32().PrimaryKey().Identity()
           .WithColumn("UserId").AsString(128).NotNullable()
           .WithColumn("ClaimType").AsString(256).NotNullable()
           .WithColumn("ClaimValue").AsString(256).NotNullable();
        }
    }
}

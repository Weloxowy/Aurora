using FluentMigrator;

namespace Aurora.Server.Persistance.UserEntity.Database
{
    [Migration(008)]
    public class CreateTable_UserTokens : Migration
    {
        public override void Up()
        {
            Create.Table("AspNetUserTokens")
                .WithColumn("UserId").AsString(128).NotNullable()
                .WithColumn("LoginProvider").AsString(128).NotNullable()
                .WithColumn("Name").AsString(128).NotNullable()
                .WithColumn("Value").AsString(128).NotNullable();

            Create.PrimaryKey("PK_AspNetUserTokens")
                .OnTable("AspNetUserTokens")
                .Columns("UserId", "LoginProvider", "Name");

            Create.Index("IX_AspNetUserTokens_UserId")
                .OnTable("AspNetUserTokens")
                .OnColumn("UserId");
        }

        public override void Down()
        {
            Delete.Index("IX_AspNetUserTokens_UserId").OnTable("AspNetUserTokens");
            Delete.PrimaryKey("PK_AspNetUserTokens").FromTable("AspNetUserTokens");
            Delete.Table("AspNetUserTokens");
        }
    }
}

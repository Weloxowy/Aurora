using FluentMigrator;
namespace Aurora.Server.Persistance.UserEntity.Database
{
    [Migration(010)]
    public class CreateTable_AspNetUsers : Migration
    {
        public override void Up()
        {
            Create.Table("AspNetUsers")
                .WithColumn("Id").AsString().NotNullable().PrimaryKey()
                .WithColumn("UserName").AsString().Nullable()
                .WithColumn("NormalizedUserName").AsString().Nullable()
                .WithColumn("Email").AsString().Nullable()
                .WithColumn("NormalizedEmail").AsString().Nullable().Unique()
                .WithColumn("EmailConfirmed").AsBoolean().Nullable()
                .WithColumn("PasswordHash").AsString().Nullable()
                .WithColumn("SecurityStamp").AsString().Nullable()
                .WithColumn("ConcurrencyStamp").AsString().Nullable()
                .WithColumn("PhoneNumber").AsString().Nullable().Nullable()
                .WithColumn("PhoneNumberConfirmed").AsBoolean().Nullable()
                .WithColumn("TwoFactorEnabled").AsBoolean().Nullable()
                .WithColumn("LockoutEnd").AsDateTimeOffset().Nullable()
                .WithColumn("LockoutEnabled").AsBoolean().Nullable()
                .WithColumn("AccessFailedCount").AsInt32().Nullable()
                .WithColumn(nameof(Models.AspNetUsers.AspNetUsers.FirstName)).AsString().Nullable()
                .WithColumn(nameof(Models.AspNetUsers.AspNetUsers.LastName)).AsString().Nullable()
                .WithColumn(nameof(Models.AspNetUsers.AspNetUsers.Password)).AsString().Nullable()
                .WithColumn(nameof(Models.AspNetUsers.AspNetUsers.IsUserProfileActive)).AsBoolean().Nullable()
                .WithColumn(nameof(Models.AspNetUsers.AspNetUsers.UserRank)).AsInt32().Nullable()
                .WithColumn("AddressId").AsString().Nullable()
                .WithColumn("FamilyMemberId").AsString().Nullable()
                .WithColumn("BankInfoEntityId").AsString().Nullable();
            Create.ForeignKey("FK_User_Address").FromTable("AspNetUsers").ForeignColumn("AddressId").ToTable("AddressEntity").PrimaryColumn("Id");
            Create.ForeignKey("FK_User_FamilyMember").FromTable("AspNetUsers").ForeignColumn("FamilyMemberId").ToTable("FamilyMemberEntity").PrimaryColumn("Id");
            Create.ForeignKey("FK_User_BankInfo").FromTable("AspNetUsers").ForeignColumn("BankInfoEntityId").ToTable("BankInfoEntity").PrimaryColumn("Id");
        }

        public override void Down()
        {
            if (Schema.Table("AspNetUsers").Exists())
            {
                Delete.Table("AspNetUsers");
            };

        }
    }
}

using FluentMigrator;

namespace Aurora.Server.Persistence.FamilyMemberEntity.Database
{
    [Migration(202405030002)]
    public class CreateTable_FamilyMemberEntity : Migration
    {
        public override void Up()
        {
            Create.Table("FamilyMemberEntity")
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.Id)).AsString().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.Name)).AsString().NotNullable()
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.TelephoneNumber)).AsString().NotNullable()
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.Notes)).AsString().NotNullable()
                .WithColumn("AddressId").AsString().Nullable();
            Create.ForeignKey("FK_FamilyMember_Address").FromTable("FamilyMemberEntity").ForeignColumn("AddressId").ToTable("AddressEntity").PrimaryColumn("Id");
        }
        public override void Down()
        {
            Delete.Table("FamilyMemberEntity");
        }
    }
}

using FluentMigrator;

namespace Aurora.Server.Persistence.PersonalInfoEntity.Database
{
    [Migration(007)]
    public class CreateTable_PersonalInfoEntity : Migration
    {
        public override void Up()
        {
            Create.Table("PersonalInfoEntity")
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.Id)).AsString().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.HireDate)).AsDateTime().NotNullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.FireDate)).AsDateTime().Nullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.Department)).AsString().NotNullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.Position)).AsString().NotNullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.NIP)).AsString().Nullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.HealthCareNumber)).AsString().Nullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.Notes)).AsString().NotNullable()
                .WithColumn(nameof(Models.PersonalInfoEntity.PersonalInfoEntity.TypeOfContract)).AsInt32().NotNullable()
                .WithColumn("FamilyMemberContact").AsString().Nullable();
            Create.ForeignKey("FK_PersonalInfo_FamilyMember").FromTable("PersonalInfoEntity").ForeignColumn("FamilyMemberContact").ToTable("FamilyMemberEntity").PrimaryColumn("Id");
        }

        public override void Down()
        {
            if (Schema.Table("PersonalInfoEntity").Exists())
            {
                Delete.Table("PersonalInfoEntity");
            };

        }
    }
}

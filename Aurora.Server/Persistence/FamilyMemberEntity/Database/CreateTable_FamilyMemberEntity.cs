﻿using FluentMigrator;

namespace Aurora.Server.Persistence.FamilyMemberEntity.Database
{
    [Migration(003)]
    public class CreateTable_FamilyMemberEntity : Migration
    {
        public override void Up()
        {
            Create.Table("FamilyMemberEntity")
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.Id)).AsGuid().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.Name)).AsString().NotNullable()
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.TelephoneNumber)).AsString().NotNullable()
                .WithColumn(nameof(Models.FamilyMemberEntity.FamilyMemberEntity.Notes)).AsString().NotNullable()
                .WithColumn("AddressId").AsGuid().Nullable();
            Create.ForeignKey("FK_FamilyMember_Address").FromTable("FamilyMemberEntity").ForeignColumn("AddressId").ToTable("AddressEntity").PrimaryColumn("Id");
        }
        public override void Down()
        {
            if (Schema.Table("FamilyMemberEntity").Exists())
            {
                Delete.Table("FamilyMemberEntity");
            };
        }
    }
}

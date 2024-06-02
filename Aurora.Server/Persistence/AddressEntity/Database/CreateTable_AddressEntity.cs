using FluentMigrator;

namespace Aurora.Server.Persistence.AddressEntity.Database
{
    [Migration(001)]
    public class CreateTable_AddressEntity : Migration
    {
        public override void Up()
        {
            Create.Table("AddressEntity")
                .WithColumn(nameof(Models.AddressEntity.AddressEntity.Id)).AsGuid().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.AddressEntity.AddressEntity.Street)).AsString().NotNullable()
                .WithColumn(nameof(Models.AddressEntity.AddressEntity.PostalCode)).AsString().NotNullable()
                .WithColumn(nameof(Models.AddressEntity.AddressEntity.City)).AsString().NotNullable()
                .WithColumn(nameof(Models.AddressEntity.AddressEntity.Region)).AsString().NotNullable()
                .WithColumn(nameof(Models.AddressEntity.AddressEntity.Country)).AsString().NotNullable();
        }

        public override void Down()
        {
            if (Schema.Table("AddressEntity").Exists())
            {
                Delete.Table("AddressEntity");
            };

        }
    }
}

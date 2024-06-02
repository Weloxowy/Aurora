using FluentMigrator;

namespace Aurora.Server.Persistence.BankInfoEntity.Database
{
    [Migration(002)]
    public class CreateTable_BankInfoEntity : Migration
    {
        public override void Up()
        {
            Create.Table("BankInfoEntity")
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.Id)).AsGuid().NotNullable().PrimaryKey()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.AccountNumber)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.IBANAccountNumber)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.SWIFTBankCode)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.BankName)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.Country)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.OwnerName)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.US)).AsString().NotNullable()
                .WithColumn(nameof(Models.BankInfoEntity.BankInfoEntity.CityUS)).AsString().NotNullable();
        }

        public override void Down()
        {
            if (Schema.Table("BankInfoEntity").Exists())
            {
                Delete.Table("BankInfoEntity");
            };

        }
    }
}

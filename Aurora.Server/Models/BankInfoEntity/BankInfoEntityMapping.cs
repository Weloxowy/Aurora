using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.BankInfoEntity
{
    public class BankInfoEntityMapping : ClassMap<BankInfoEntity>
    {
        readonly string tablename = nameof(BankInfoEntity);

        public BankInfoEntityMapping()
        {
            Id(x => x.Id);
            Map(x => x.AccountNumber);
            Map(x => x.BankName);
            Map(x => x.IBANAccountNumber);
            Map(x => x.SWIFTBankCode);
            Map(x => x.Country);
            Map(x => x.OwnerName);
            Map(x => x.US);
            Map(x => x.CityUS);
            Table(tablename);
        }
    }
}

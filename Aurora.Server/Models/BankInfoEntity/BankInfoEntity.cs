namespace Aurora.Server.Models.BankInfoEntity
{
    public class BankInfoEntity
    {
        public BankInfoEntity(): base() { }

        public BankInfoEntity(Guid id, string accountNumber,  string bankName, string country, string ownerName, string uS, string cityUS, string iBANAccountNumber, string sWIFTBankCode)
        {
            Id = id;
            AccountNumber = accountNumber;
            IBANAccountNumber = iBANAccountNumber;
            SWIFTBankCode = sWIFTBankCode;
            BankName = bankName;
            Country = country;
            OwnerName = ownerName;
            US = uS;
            CityUS = cityUS;
        }

        public virtual Guid Id { get; set; }
        public virtual string AccountNumber { get; set; }
        public virtual string IBANAccountNumber { get; set; }
        public virtual string BankName { get; set; }
        public virtual string SWIFTBankCode { get; set; }
        public virtual string Country { get; set; }
        public virtual string OwnerName { get; set; }
        public virtual string US { get; set; }
        public virtual string CityUS { get; set; }
    }
}

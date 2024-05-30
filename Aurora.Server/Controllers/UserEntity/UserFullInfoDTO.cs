using Aurora.Server.Models.AspNetUsers;

namespace Aurora.Server.Controllers.UserEntity
{
    public class UserFullInfoDTO
    {
        //user
        public virtual Guid UserId { get; set; }
        public virtual string? FirstName { get; set; }
        public virtual string? LastName { get; set; }
        public virtual bool? IsUserProfileActive { get; set; }
        public virtual UserRank? UserRank { get; set; }
        public virtual Guid? AddressId { get; set; }
        public virtual Guid? FamilyMemberId { get; set; }
        public virtual Guid? BankInfoEntityId { get; set; }
        //family member
        public virtual string? Name { get; set; }
        public virtual string? TelephoneNumber { get; set; }
        public virtual string? Notes { get; set; }
        //address of user
        public virtual string Street { get; set; }
        public virtual string PostalCode { get; set; }
        public virtual string City { get; set; }
        public virtual string Region { get; set; }
        public virtual string Country { get; set; }
        //bank info
        public virtual string AccountNumber { get; set; }
        public virtual string IBANAccountNumber { get; set; }
        public virtual string BankName { get; set; }
        public virtual string SWIFTBankCode { get; set; }
        public virtual string BankCountry { get; set; }
        public virtual string OwnerName { get; set; }
        public virtual string US { get; set; }
        public virtual string CityUS { get; set; }
    }
}

using Aurora.Server.Models.AspNetUsers;
using Aurora.Server.Models.PersonalInfoEntity;

namespace Aurora.Server.Controllers.UserEntity
{
    public class UserFullInfoDTO
    {
        //user
        public virtual Guid UserId { get; set; }
        public virtual string? FirstName { get; set; }
        public virtual string? LastName { get; set; }
        public virtual string? Email { get; set; }
        public virtual bool? IsUserProfileActive { get; set; }
        public virtual UserRank? UserRank { get; set; }
        public virtual Guid? AddressId { get; set; }
        public virtual Guid? FamilyMemberId { get; set; }
        public virtual Guid? BankInfoEntityId { get; set; }
        public virtual Guid? PersonalInfoEntityId { get; set; }
        //address of user
        public virtual string? Street { get; set; }
        public virtual string? PostalCode { get; set; }
        public virtual string? City { get; set; }
        public virtual string? Region { get; set; }
        public virtual string? Country { get; set; }
        //bank info
        public virtual string? AccountNumber { get; set; }
        public virtual string? IBANAccountNumber { get; set; }
        public virtual string? BankName { get; set; }
        public virtual string? SWIFTBankCode { get; set; }
        public virtual string? BankCountry { get; set; }
        public virtual string? OwnerName { get; set; }
        public virtual string? US { get; set; }
        public virtual string? CityUS { get; set; }
        //personal info
        public virtual DateTime? HireDate { get; set; }
        public virtual DateTime? FireDate { get; set; }
        public virtual string? Department { get; set; }
        public virtual string? Position { get; set; }
        public virtual string? NIP { get; set; }
        public virtual string? HealthCareNumber { get; set; }
        public virtual string? PersonalNotes { get; set; }
        public virtual TypeOfContract? TypeOfContract { get; set; }
    }
}

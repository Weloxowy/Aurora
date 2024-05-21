using Microsoft.AspNetCore.Identity;

namespace Aurora.Server.Models.AspNetUsers
{
    public class AspNetUsers : IdentityUser
    {
        public AspNetUsers() : base() { }
        public AspNetUsers(Guid id, string FirstName, string LastName, string Password, bool isUserProfileActiver, UserRank userRank, Guid addressId, Guid familyMemberId, Guid bankInfoEntityId) 
        {
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Password = Password;
            this.IsUserProfileActive = isUserProfileActiver;
            this.UserRank = userRank;
            this.AddressId = addressId;
            this.FamilyMemberId = familyMemberId;
            this.BankInfoEntityId = bankInfoEntityId;
        }


        public virtual string? FirstName { get; set; }
        public virtual string? LastName { get; set; }
        public virtual string? Password { get; set; }
        public virtual bool? IsUserProfileActive { get; set; }
        public virtual UserRank? UserRank { get; set; }
        public virtual Guid AddressId { get; set; }
        public virtual Guid FamilyMemberId { get; set; }
        public virtual Guid BankInfoEntityId { get; set; }
    }
}

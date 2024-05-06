namespace Aurora.Server.Models.FamilyMemberEntity
{
    public class FamilyMemberEntity
    {
        public FamilyMemberEntity() : base() { }

        public FamilyMemberEntity(Guid id, string name, string telephoneNumber, string notes, Guid? addressId)
        {
            Id = id;
            Name = name;
            TelephoneNumber = telephoneNumber;
            Notes = notes;
            AddressId = addressId;
        }

        public virtual Guid Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string TelephoneNumber { get; set; }
        public virtual string Notes { get; set; }
        public virtual Guid? AddressId { get; set; }
        
    }
}

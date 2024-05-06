namespace Aurora.Server.Models.PersonalInfoEntity
{
    public class PersonalInfoEntity
    {
        public PersonalInfoEntity() : base() { }

        public PersonalInfoEntity(Guid id, DateTime hireDate, DateTime? fireDate, string department, string position, string? nip, string? healthCareNumber, string notes, TypeOfContract typeOfContract, Guid familyMemberContact)
        {
            Id = id;
            HireDate = hireDate;
            FireDate = fireDate;
            Department = department;
            Position = position;
            NIP = nip;
            HealthCareNumber = healthCareNumber;
            Notes = notes;
            TypeOfContract = typeOfContract;
            FamilyMemberContact = familyMemberContact;
        }

        public virtual Guid Id { get; set; }
        public virtual DateTime HireDate { get; set; }
        public virtual DateTime? FireDate { get; set; }
        public virtual string Department { get; set; }
        public virtual string Position { get; set; }
        public virtual string? NIP { get; set; }
        public virtual string? HealthCareNumber { get; set; }
        public virtual string Notes { get; set; }
        public virtual TypeOfContract TypeOfContract { get; set; }
        public virtual Guid? FamilyMemberContact { get; set; }
    }
}

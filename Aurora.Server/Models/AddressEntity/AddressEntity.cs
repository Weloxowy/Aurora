namespace Aurora.Server.Models.AddressEntity
{
    public class AddressEntity
    {

        public AddressEntity() : base() { }

        public AddressEntity(Guid id, string street, string postalCode, string city, string region, string country)
        {
            Id = id;
            Street = street;
            PostalCode = postalCode;
            City = city;
            Region = region;
            Country = country;
        }

        public virtual Guid Id {  get; set; }
        public virtual string Street { get; set; }
        public virtual string PostalCode { get; set; }
        public virtual string City { get; set; }
        public virtual string Region { get; set; }
        public virtual string Country { get; set; }
    }
}

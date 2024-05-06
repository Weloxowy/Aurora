using FluentAssertions;
using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.AddressEntity
{
    public class AddressEntityMapping : ClassMap<AddressEntity>
    {
        readonly string tablename = nameof(AddressEntity);

        public AddressEntityMapping() 
        {
            Id(x => x.Id);
            Map(x => x.Street);
            Map(x => x.City);
            Map(x => x.PostalCode);
            Map(x => x.Country);
            Map(x => x.Region);
            Table(tablename);
        }
    }
}

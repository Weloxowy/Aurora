using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.FamilyMemberEntity
{
    public class FamilyMemberEntityMapping : ClassMap<FamilyMemberEntity>
    {
        readonly string tablename = nameof(FamilyMemberEntity);

        public FamilyMemberEntityMapping() { 
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.TelephoneNumber);
            Map(x => x.Notes);
            Map(x => x.AddressId);
            Table(tablename);
        }
    }
}

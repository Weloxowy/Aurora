using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.PersonalInfoEntity
{
    public class PersonalInfoEntityMapping : ClassMap<PersonalInfoEntity>
    {
        readonly string tablename = nameof(PersonalInfoEntity);
        public PersonalInfoEntityMapping()
        {
            Id(x => x.Id);
            Map(x => x.HireDate);
            Map(x => x.FireDate);
            Map(x => x.Department);
            Map(x => x.Position);
            Map(x => x.NIP);
            Map(x => x.HealthCareNumber);
            Map(x => x.Notes);
            Map(x => x.TypeOfContract).CustomType<TypeOfContract>();

            Table(tablename);
        }
    }
}

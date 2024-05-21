using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.RoleEntity
{
    public class RoleEntityMapping : ClassMap<RoleEntity>
    {
        readonly string tablename = nameof(RoleEntity);
        public RoleEntityMapping()
        {
            Id(x => x.Id);
            Map(x => x.RoleName);
            Table(tablename);
        }
    }
}

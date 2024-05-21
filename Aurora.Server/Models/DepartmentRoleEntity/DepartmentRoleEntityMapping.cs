using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.DepartmentRoleEntity
{
    public class DepartmentRoleEntityMapping : ClassMap<DepartmentRoleEntity>
    {
        readonly string tablename = nameof(DepartmentRoleEntityMapping);
        public DepartmentRoleEntityMapping()
        {
            Id(x => x.Id);
            Map(x => x.RoleId);
            Map(x => x.DepartmentId);
            Table(tablename);
        }
    }
}

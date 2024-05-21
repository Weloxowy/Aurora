using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.DepartmentEntity
{
    public class DepartmentEntityMapping : ClassMap<DepartmentEntity>
    {
        readonly string tablename = nameof(DepartmentEntity);
        public DepartmentEntityMapping() {
            Id(x => x.Id);
            Map(x => x.DepartmentName);
            Map(x => x.DepartmentInfo);
            Table(tablename);
        }

    }
}

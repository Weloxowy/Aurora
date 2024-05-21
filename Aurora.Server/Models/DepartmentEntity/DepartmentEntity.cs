namespace Aurora.Server.Models.DepartmentEntity
{
    public class DepartmentEntity
    {
        public DepartmentEntity():base() { }

        public DepartmentEntity(Guid id, string departmentName, string departmentInfo)
        {
            Id = id;
            DepartmentName = departmentName;
            DepartmentInfo = departmentInfo;
        }

        public virtual Guid Id { get; set; }
        public virtual string DepartmentName { get; set; } 
        public virtual string DepartmentInfo { get; set; }
    }
}

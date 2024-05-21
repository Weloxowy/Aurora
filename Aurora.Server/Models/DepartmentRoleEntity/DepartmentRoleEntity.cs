namespace Aurora.Server.Models.DepartmentRoleEntity
{
    public class DepartmentRoleEntity
    {
        public DepartmentRoleEntity(): base() { }

        public DepartmentRoleEntity(Guid id, Guid roleId, Guid departmentId)
        {
            Id = id;
            RoleId = roleId;
            DepartmentId = departmentId;
        }

        public virtual Guid Id { get; set; }
        public virtual Guid RoleId { get; set; }
        public virtual Guid DepartmentId { get; set; }
    }
}

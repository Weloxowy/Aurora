namespace Aurora.Server.Models.RoleEntity
{
    public class RoleEntity
    {
        public RoleEntity() : base() { }

        public RoleEntity(Guid id, string roleName)
        {
            Id = id;
            RoleName = roleName;
        }

        public virtual Guid Id { get; set; }
        public virtual string RoleName { get; set; }
    }
}

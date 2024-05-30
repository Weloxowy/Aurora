using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Cfg;
using NHibernate;
using Aurora.Server.Models.AspNetUsers;
using NHibernate.Tool.hbm2ddl;
using static NHibernate.Impl.CriteriaImpl;
using Aurora.Server.Models.AddressEntity;
using Aurora.Server.Models.BankInfoEntity;
using Aurora.Server.Models.DepartmentEntity;
using Aurora.Server.Controllers.DepartmentRoleEntity;
using Aurora.Server.Models.DepartmentRoleEntity;
using Aurora.Server.Models.FamilyMemberEntity;
using Aurora.Server.Models.FileEntity;
using Aurora.Server.Models.PersonalInfoEntity;
using Aurora.Server.Models.RoleEntity;

namespace Aurora.Server
{
    public class NHibernateHelper
    {
        private static ISessionFactory _sessionFactory;

        public static NHibernate.ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }

        private static ISessionFactory SessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                {
                    _sessionFactory = Fluently.Configure()
                        .Database(
                            MsSqlConfiguration.MsSql2012.ConnectionString("Server=localhost\\SQLEXPRESS;Database=Aurora;Integrated Security=SSPI;Application Name=Aurora;TrustServerCertificate=true;")
                        )//TODO NAZWA DLA BAZY DANYCH NA TEN MOMENT TO Kwiaciarnia 
                        /* .Mappings(m =>
                             m.FluentMappings.AddFromAssemblyOf<KlientEntity>()
                         ) Przykład mapowania TODO NIE ZAPOMINAĆ O MAPOWANIACH KOLEDZY*/
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<AspNetUsers>().AddFromAssemblyOf<UserRank>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<AddressEntity>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<BankInfoEntity>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<DepartmentEntity>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<DepartmentRoleEntity>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<FamilyMemberEntity>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<PersonalInfoEntity>().AddFromAssemblyOf<TypeOfContract>())
                        .Mappings(m =>
                            m.FluentMappings.AddFromAssemblyOf<RoleEntity>())
                        .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(false, true))
                        .BuildSessionFactory();
                }
                return _sessionFactory;
            }
        }

    }
}

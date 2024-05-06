using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Cfg;
using NHibernate;
using Aurora.Server.Models.AspNetUsers;
using NHibernate.Tool.hbm2ddl;
using static NHibernate.Impl.CriteriaImpl;
using Aurora.Server.Models.AddressEntity;

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
                            m.FluentMappings.AddFromAssemblyOf<AddressEntity>().AddFromAssemblyOf<UserRank>())
                        .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(false, true))
                        .BuildSessionFactory();
                }
                return _sessionFactory;
            }
        }

    }
}

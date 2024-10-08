﻿using FluentNHibernate.Mapping;

namespace Aurora.Server.Models.AspNetUsers
{
        public class UserEntityMapping : ClassMap<AspNetUsers>
        {
            readonly string tablename = nameof(AspNetUsers);
            public UserEntityMapping()
            {
                Id(x => x.Id);
                Map(x => x.FirstName);
                Map(x => x.LastName);
                Map(x => x.Password);
                Map(x => x.IsUserProfileActive);
                Map(x => x.UserRank).CustomType<UserRank>();
                Map(x => x.AddressId);
                Map(x => x.FamilyMemberId);
                Map(x => x.BankInfoEntityId);
                Map(x => x.PersonalInfoEntityId);

                Map(x => x.UserName);
                Map(x => x.NormalizedUserName);
                Map(x => x.Email);
                Map(x => x.NormalizedEmail).Unique();
                Map(x => x.EmailConfirmed);
                Map(x => x.PasswordHash);
                Map(x => x.SecurityStamp);
                Map(x => x.ConcurrencyStamp);
                Map(x => x.PhoneNumber);
                Map(x => x.PhoneNumberConfirmed);
                Map(x => x.TwoFactorEnabled);
                Map(x => x.LockoutEnd);
                Map(x => x.LockoutEnabled);
                Map(x => x.AccessFailedCount);
            
                Table(tablename);
            }
        }
    }

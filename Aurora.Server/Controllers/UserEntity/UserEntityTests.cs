using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aurora.Server.Controllers.UserEntity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Aurora.Server.Controllers.AspNetUsers.UserEntityTests
{
    [TestClass]
    public class UserEntityTests
    {
        [TestMethod]
        public void GetAllTest()
        {
            // Arrange
            var controller = new UserEntityController();

            // Act
            var result = controller.GetAll();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
        }

    }
}

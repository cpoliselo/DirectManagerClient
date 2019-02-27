using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OAP.Api.Controllers;
using CPClient.Infra.Data.Context;
using Xunit;

namespace OAP.UnitTest
{
    public class SearchLogTest
    {
        private readonly SearchLogController controller;

        public SearchLogTest()
        {
            controller = new SearchLogController();

            var optionsBuilder = new DbContextOptionsBuilder<SqlContext>();

            optionsBuilder.UseSqlServer("Server=localhost;Database=OAPDatabaseTestSearchLog;Trusted_Connection=True;MultipleActiveResultSets=true");

            var context = new SqlContext(optionsBuilder.Options);

            context.Database.Migrate();
            CPClient.Infra.Data.DbInitializer.Initialize(context);
        }

        [Fact]
        public void SearchLog_Get_By_All_Should_Be_Ok()
        {
            //Chamada para a web API
            var searchLog = controller.Get();

            //Valida o tipo da resosta com FluentAssertations
            searchLog.Should().BeOfType<OkObjectResult>();
        }
    }
}

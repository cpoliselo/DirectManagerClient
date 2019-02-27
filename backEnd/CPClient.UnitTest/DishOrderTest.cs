using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OAP.Api.Controllers;
using CPClient.Infra.Data.Context;
using Xunit;

namespace OAP.UnitTest
{
    public class DishOrderTest
    {
        private readonly DishOrderController controller;


        public DishOrderTest()
        {
            controller = new DishOrderController();

            var optionsBuilder = new DbContextOptionsBuilder<SqlContext>();

            optionsBuilder.UseSqlServer("Server=localhost;Database=OAPDatabaseTestDishOrder;Trusted_Connection=True;MultipleActiveResultSets=true");

            var context = new SqlContext(optionsBuilder.Options);

            context.Database.Migrate();
            CPClient.Infra.Data.DbInitializer.Initialize(context);
        }

        [Fact]
        public void DishOrder_Get_By_All_Should_Connection_Ok()
        {
            var dish = controller.Get("morning, 1, 2, 3", false);

            //Valida o tipo da resosta com FluentAssertations
            dish.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_Ok()
        {
            var dish = controller.Get("morning, 1, 2, 3", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("eggs, Toast, coffee", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_OkMultipleCoffee()
        {
            var dish = controller.Get("morning, 1, 2, 3, 3, 3", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("eggs, Toast, coffee(x3)", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_OkMorningDessert()
        {
            var dish = controller.Get("morning, 1, 2, 3, 4", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("eggs, Toast, coffee, error", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_OkCaseSensitive()
        {
            var dish = controller.Get(" MoRnIng, 2, 1, 3", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("eggs, Toast, coffee", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_OkWrongOrder()
        {
            var dish = controller.Get("morning, 2, 1, 3", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("eggs, Toast, coffee", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_OkMultiplePotato()
        {
            var dish = controller.Get("night, 1, 2, 2, 4", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("steak, potato(x2), cake", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_OkMultipleCake()
        {
            var dish = controller.Get("night, 1, 2, 3, 4, 4", false);

            var viewResult = Assert.IsType<OkObjectResult>(dish).Value;

            Assert.Equal("steak, potato, wine, cake", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_BadRequest()
        {
            var dish = controller.Get("blabla, 1, 2, 3", false);

            dish.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_BadRequestPeriod()
        {
            var dish = controller.Get("blabla, 1, 2, 3", false);

            dish.Should().BeOfType<BadRequestObjectResult>();

            var viewResult = Assert.IsType<BadRequestObjectResult>(dish).Value;

            Assert.Equal("Period not found", viewResult);

        }

        [Fact]
        public void DishOrder_Get_Search_Should_Be_BadRequestIncorrectSearch()
        {
            var dish = controller.Get("blabla", false);

            dish.Should().BeOfType<BadRequestObjectResult>();

            var viewResult = Assert.IsType<BadRequestObjectResult>(dish).Value;

            Assert.Equal("please enter at least one option", viewResult);

        }

    }
}

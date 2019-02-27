using Microsoft.EntityFrameworkCore.Migrations;

namespace CPClient.Infra.Data.Migrations
{
    public partial class AtualizandoCamposClienteTelefone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DDD",
                table: "ClienteTelefone",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DDD",
                table: "ClienteTelefone");
        }
    }
}

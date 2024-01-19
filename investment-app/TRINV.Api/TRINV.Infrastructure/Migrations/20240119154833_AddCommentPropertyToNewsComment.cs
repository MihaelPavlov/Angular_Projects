using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TRINV.Infrastructure.Migrations
{
    public partial class AddCommentPropertyToNewsComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "NewsComments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "NewsComments");
        }
    }
}

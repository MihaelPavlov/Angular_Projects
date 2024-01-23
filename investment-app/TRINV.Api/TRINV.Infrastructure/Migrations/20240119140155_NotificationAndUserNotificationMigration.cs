using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TRINV.Infrastructure.Migrations
{
    public partial class NotificationAndUserNotificationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserNotifications",
                table: "UserNotifications");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "HasSeenNotification",
                table: "UserNotifications",
                newName: "IsSeen");

            migrationBuilder.RenameColumn(
                name: "NotificationId",
                table: "UserNotifications",
                newName: "NotificationType");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserNotifications",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "UserNotifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Notifications",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserNotifications",
                table: "UserNotifications",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserNotifications",
                table: "UserNotifications");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserNotifications");

            migrationBuilder.DropColumn(
                name: "Message",
                table: "UserNotifications");

            migrationBuilder.RenameColumn(
                name: "NotificationType",
                table: "UserNotifications",
                newName: "NotificationId");

            migrationBuilder.RenameColumn(
                name: "IsSeen",
                table: "UserNotifications",
                newName: "HasSeenNotification");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Notifications",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Notifications",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserNotifications",
                table: "UserNotifications",
                columns: new[] { "NotificationId", "UserId" });
        }
    }
}

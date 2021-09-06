# Travelo

Travelo is a webshop SPA, with .NET backend and Angular frontend. Customers can browse and pay for holiday trips.
<br>
By default the owner of the shop can modify deals via the admin user:
<br>
<br>
username: admin@admin.com
<br>
password: $Adminpassword123
<br>
<br>
*Build, seed MSSQL database:*
```
dotnet ef migrations add InitialMigration
dotnet ef database update
```
<br>

*Run:*
```
dotnet run
```

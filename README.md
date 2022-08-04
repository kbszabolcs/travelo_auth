# Travelo

Travelo is a webshop SPA with .NET backend and Angular frontend, where customers can browse and pay for holiday trips.
<br>

## How to run

*Set connection string in appsettings.json:*
```
(LocalDb)\MSSQLLocalDB
```
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

## Access admin user

By default the owner of the shop can modify deals via the admin user:
<br>
<br>
username: admin@admin.com
<br>

password: $Adminpassword123
<br>
<br>

## Backend architecture

![image](https://user-images.githubusercontent.com/47303182/179362613-7a4e4b43-507f-423c-a28a-8c27443cc0fa.png)

<br>
Swagger documentation is available at [The swagger endpoint](https://localhost:5001/swagger/)
<br>


### Technology

- Repository pattern
- DTOs (Automapper)
- .Net Identity
- JWT based auth (OpenIdConnect)
- Database seed


using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using travelo_auth.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using App.Services;
using IdentityServer4.Models;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace travelo_auth
{
    public class Startup
    {
        public Startup(
            IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Database configuration
            services.AddDbContext<TripDbContext>(opt => opt.UseSqlServer(
                Configuration.GetConnectionString("TraveloDatabaseConnection")
            ));
            services.AddScoped<ITripRepository, SqlTripRepository>();
            services.AddScoped<IOrderRepository, SqlOrderRepository>();

            // Dto mapping via automapper package
            services.AddAutoMapper(System.AppDomain.CurrentDomain.GetAssemblies());

            services.AddDatabaseDeveloperPageExceptionFilter();

            // Service for getting the User's details
            services.AddHttpContextAccessor(); 

            // ASP.NET Core Identity:
            // Is an API that supports user interface (UI) login functionality.
            // Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.
            // DefaultIdentity: login, register, profile pages are scaffolded ...            
            services.AddDefaultIdentity<ApplicationUser>(options =>
                options.SignIn.RequireConfirmedAccount = false)
                    .AddRoles<IdentityRole>()
                    .AddSignInManager<SignInManager<ApplicationUser>>()
                    .AddClaimsPrincipalFactory<ClaimsFactory<ApplicationUser>>()
                    .AddEntityFrameworkStores<TripDbContext>()
                    .AddDefaultTokenProviders();

            // Backend API protection auth server
            // After authentication the server generates a JWT token for authorization purposes which
            // is later owned by the client.
            // JWT token has manually added role claims concerning the authenticated user  
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, TripDbContext>(
                    o =>
                    {
                        o.IdentityResources.Add(
                             new IdentityResource
                             {
                                 Name = "Roles",
                                 UserClaims = { JwtClaimTypes.Role }
                             }
                         );

                        var frontendClient = o.Clients["travelo_auth"];
                        frontendClient.AllowedScopes.Add("Roles");
                        frontendClient.UpdateAccessTokenClaimsOnRefresh = true;
                        frontendClient.AlwaysIncludeUserClaimsInIdToken = true;
                        frontendClient.AlwaysSendClientClaims = true;

                        var protectedAdminAPI = o.ApiResources["travelo_authAPI"];
                        protectedAdminAPI.UserClaims.Add(JwtClaimTypes.Role);
                    }
                )
                .AddJwtBearerClientAuthentication();

            // A policy which can be used to ensure that only users with the admin role have access to an API  
            services.AddAuthorization(o =>
            {
                o.AddPolicy(
                    "AdminPolicy",
                    policy => policy.RequireAssertion(
                        context =>
                            context.User.HasClaim(
                                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
                                "Admin"
                            )
                        )
                    );
            });

            // Configures IdentityServer to be responsible for authentication
            services.AddAuthentication()
                .AddIdentityServerJwt();

            // Configures backend to read role claims from the authorization (JWT) token and set
            // user's claims accordingly
            services.Configure<JwtBearerOptions>(
            IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
            options =>
            {
                var onTokenValidated = options.Events.OnTokenValidated;

                options.Events.OnTokenValidated = async context =>
                {
                    await onTokenValidated(context);
                    var jwtToken = (JwtSecurityToken)context.SecurityToken;
                    var adminRoleClaim = jwtToken.Claims.FirstOrDefault(
                        claim => claim.Value == "Admin"
                    );
                    if (adminRoleClaim != null)
                    {
                        var identity = (ClaimsIdentity)context.HttpContext.User.Identity;
                        identity.AddClaim(adminRoleClaim);
                    }
                };
            });

            services.AddControllersWithViews();
            services.AddRazorPages();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // Register the Swagger services
            services.AddSwaggerDocument();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            // Init roles, users in the database
            Task.Run(() => CreateRolesandUsers(userManager, roleManager)).Wait();

            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        public async Task CreateRolesandUsers(UserManager<ApplicationUser> _userManager, RoleManager<IdentityRole> _roleManager)
        {
            bool isAdminRoleExist = await _roleManager.RoleExistsAsync("Admin");
            if (!isAdminRoleExist)
            {
                // first we create Admin rool    
                var adminRole = new IdentityRole();
                adminRole.Name = "Admin";
                await _roleManager.CreateAsync(adminRole);

                //Here we create a Admin super user who will maintain the website                   

                var adminUser = new ApplicationUser();
                adminUser.UserName = "admin@admin.com";
                adminUser.Email = "admin@admin.com";

                string adminUserPassword = "$Adminpassword123";

                IdentityResult adminUserCreateResult = await _userManager.CreateAsync(adminUser, adminUserPassword);


                //Add default User to Role Admin    
                if (adminUserCreateResult.Succeeded)
                {
                    var adminUserAddToRoleResult = await _userManager.AddToRoleAsync(adminUser, "Admin");
                    var adminClaim = new Claim("Role", "Admin");
                    await _userManager.AddClaimAsync(adminUser, adminClaim);
                }
            }

            // Creating role     
            bool isCustomerRoleExist = await _roleManager.RoleExistsAsync("Customer");
            if (!isCustomerRoleExist)
            {
                var customerRole = new IdentityRole();
                customerRole.Name = "Customer";
                await _roleManager.CreateAsync(customerRole);
            }
        }

    }
}

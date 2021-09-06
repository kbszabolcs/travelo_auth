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
            // Database
            services.AddDbContext<TripDbContext>(opt => opt.UseSqlServer(
                Configuration.GetConnectionString("TraveloDatabaseConnection")
            ));
            services.AddScoped<ITripRepository, SqlTripRepository>();

            // Dto mapping
            services.AddAutoMapper(System.AppDomain.CurrentDomain.GetAssemblies());

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddDefaultIdentity<ApplicationUser>(options =>
                options.SignIn.RequireConfirmedAccount = false)
                    .AddRoles<IdentityRole>()
                    .AddSignInManager<SignInManager<ApplicationUser>>()
                    .AddClaimsPrincipalFactory<ClaimsFactory<ApplicationUser>>()
                    .AddEntityFrameworkStores<TripDbContext>()
                    .AddDefaultTokenProviders();

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

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.Configure<JwtBearerOptions>(
            IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
            options =>
            {
                var validationParameters = options.TokenValidationParameters;

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
            bool x = await _roleManager.RoleExistsAsync("Admin");
            if (!x)
            {
                // first we create Admin rool    
                var role = new IdentityRole();
                role.Name = "Admin";
                await _roleManager.CreateAsync(role);

                //Here we create a Admin super user who will maintain the website                   

                var user = new ApplicationUser();
                user.UserName = "admin@admin.com";
                user.Email = "admin@admin.com";

                string userPWD = "$Adminpassword123";

                IdentityResult chkUser = await _userManager.CreateAsync(user, userPWD);


                //Add default User to Role Admin    
                if (chkUser.Succeeded)
                {
                    var result1 = await _userManager.AddToRoleAsync(user, "Admin");
                    var adminClaim = new Claim("Role", "Admin");
                    await _userManager.AddClaimAsync(user, adminClaim);
                }
            }

            // Creating role     
            x = await _roleManager.RoleExistsAsync("Customer");
            if (!x)
            {
                var role = new IdentityRole();
                role.Name = "Customer";
                await _roleManager.CreateAsync(role);
            }
        }

    }
}

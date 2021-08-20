using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using travelo_auth.Models;

namespace App.Services
{
    public class ClaimsFactory<T> : UserClaimsPrincipalFactory<T>
      where T : ApplicationUser
    {
        private readonly UserManager<T> _userManager;

        public ClaimsFactory(
            UserManager<T> userManager,
            IOptions<IdentityOptions> optionsAccessor) : base(userManager, optionsAccessor)
        {
            _userManager = userManager;
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(T user)
        {
            var identity = await base.GenerateClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            
            identity.AddClaims(roles.Select(role => new Claim(JwtClaimTypes.Role, role)));
            
            return identity;
        }
    }
}
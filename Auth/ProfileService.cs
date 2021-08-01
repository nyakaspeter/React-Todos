using System;
using System.Linq;
using System.Net.Mime;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactTodos.Db;

namespace ReactTodos.Auth
{
    public class ProfileService : IProfileService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;

        public ProfileService(ApplicationDbContext context, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory)
        {
            _context = context;
            _claimsFactory = claimsFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == sub);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            if (user.Email != null)
                claims.Add(new Claim(PropertyConstants.Email, user.Email));
            if (user.Name != null)
                claims.Add(new Claim(PropertyConstants.Name, user.Name));

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == sub);

            context.IsActive = (user != null) && user.LockoutEnabled && (user.LockoutEnd == null || user.LockoutEnd >= DateTimeOffset.UtcNow);
        }
    }
}
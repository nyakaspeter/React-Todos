using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ReactTodos.Db
{
    public class DatabaseInitializer
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public DatabaseInitializer(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync();

            await _userManager.CreateAsync(new ApplicationUser
            {
                Email = "test@user.com",
                UserName = "TestUser",
                Name = "Test User"
            }, "TestPassword");
        }
    }
}
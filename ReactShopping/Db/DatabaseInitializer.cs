using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ReactShopping.Db
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
                Email = "registered@info.com",
                UserName = "registered",
                Name = "Regisztrált Regina"
            }, "P@ssw0rd");
        }
    }
}
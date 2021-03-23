using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactShopping.Db.Configurations;
using ReactShopping.Db.Entities;

namespace ReactShopping.Db
{    
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Todo> Todos { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new TodoConfiguration());
        }
    }
}
using Microsoft.AspNetCore.Identity;

namespace ReactShopping.Db
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
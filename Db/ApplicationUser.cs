using Microsoft.AspNetCore.Identity;

namespace ReactTodos.Db
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
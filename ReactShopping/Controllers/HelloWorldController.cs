using Microsoft.AspNetCore.Mvc;

namespace ReactShopping.Controllers
{
    [Route("api/[controller]/[action]")]
    public class HelloWorldController : Controller
    {
        [HttpGet]
        public string HelloWorld()
        {
            return "HelloWorld";
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using ReactShopping.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using ReactShopping.Db.Entities;

namespace ReactShopping.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TodosController : Controller
    {
        private readonly ITodoService _todoService;

        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Todo>>> TodoItems()
        {
            return await _todoService.GetTodoItemsAsync();
        }

        [HttpGet]
        public async Task<ActionResult<List<Todo>>> AllItems()
        {
            return await _todoService.GetAllItemsAsync();
        }

        [HttpPost]
        public async Task AddTodo(Todo todo)
        {
            await _todoService.AddTodoItemAsync(todo);
        }
    }
}
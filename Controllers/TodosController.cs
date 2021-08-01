using Microsoft.AspNetCore.Mvc;
using ReactTodos.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using ReactTodos.Db.Entities;

namespace ReactTodos.Controllers
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

        [HttpGet]
        public async Task<ActionResult<List<Todo>>> TodaysItems()
        {
            return await _todoService.GetTodaysItemsAsync();
        }

        [HttpPost]
        public async Task AddTodo(Todo todo)
        {
            await _todoService.AddTodoItemAsync(todo);
        }

        [HttpPatch]
        public async Task EditTodo(Todo todo)
        {
            await _todoService.EditTodoItemAsync(todo);
        }

        [HttpPut]
        public async Task ToggleTodo(string id)
        {
            await _todoService.ToggleTodoItemAsync(id);
        }

        [HttpDelete]
        public async Task DeleteTodo(string id)
        {
            await _todoService.DeleteTodoItemAsync(id);
        }
    }
}
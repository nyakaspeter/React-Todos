using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ReactShopping.Db.Entities;

namespace ReactShopping.Interfaces
{
    public interface ITodoService
    {
        Task<List<Todo>> GetTodoItemsAsync();
        Task<List<Todo>> GetAllItemsAsync();
        Task<List<Todo>> GetTodaysItemsAsync();
        Task AddTodoItemAsync(Todo todo);
        Task ToggleTodoItemAsync(string id);
        Task DeleteTodoItemAsync(string id);
        Task EditTodoItemAsync(Todo todo);
    }
}

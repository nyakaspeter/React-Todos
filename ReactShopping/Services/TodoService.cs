using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactShopping.Db;
using ReactShopping.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactShopping.Db.Entities;

namespace ReactShopping.Services
{
    public class TodoService : ITodoService
    {
        private readonly ApplicationDbContext _dbContext;

        public TodoService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Todo>> GetAllItemsAsync()
        {
            return await _dbContext.Todos.ToListAsync();
        }

        public async Task<List<Todo>> GetTodoItemsAsync()
        {
            return await _dbContext.Todos
                .Where(t => !t.IsDone)
                .ToListAsync();
        }

        public async Task AddTodoItemAsync(Todo todo)
        {
            _dbContext.Todos.Add(todo);
            await _dbContext.SaveChangesAsync();
        }
    }
}

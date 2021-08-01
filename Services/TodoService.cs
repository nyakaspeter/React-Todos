using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactTodos.Db;
using ReactTodos.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactTodos.Db.Entities;
using System;

namespace ReactTodos.Services
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

        public async Task<List<Todo>> GetTodaysItemsAsync()
        {
            return await _dbContext.Todos
                .Where(t => t.Deadline.Value.Date == DateTime.Today)
                .ToListAsync();
        }

        public async Task AddTodoItemAsync(Todo todo)
        {
            _dbContext.Todos.Add(todo);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ToggleTodoItemAsync(string id)
        {
            var todo = _dbContext.Todos.First(t => t.Id.Equals(Guid.Parse(id)));
            todo.IsDone = !todo.IsDone;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteTodoItemAsync(string id)
        {
            var todo = _dbContext.Todos.First(t => t.Id.Equals(Guid.Parse(id)));
            _dbContext.Todos.Remove(todo);
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditTodoItemAsync(Todo todo)
        {
            var toEdit = _dbContext.Todos.First(t => t.Id.Equals(todo.Id));
            toEdit.Title = todo.Title;
            toEdit.Description = todo.Description;
            toEdit.Deadline = todo.Deadline;
            await _dbContext.SaveChangesAsync();
        }
    }
}

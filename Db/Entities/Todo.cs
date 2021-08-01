using System;
using System.ComponentModel.DataAnnotations;

namespace ReactTodos.Db.Entities
{
    public class Todo
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsDone { get; set; }
        
        public DateTime? Deadline { get; set; }
    }
}

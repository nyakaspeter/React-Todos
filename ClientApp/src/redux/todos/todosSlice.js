import { createSlice } from "@reduxjs/toolkit";
import { TodosClient } from "../../api/app.generated";

const client = new TodosClient("https://localhost:44312");

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    error: "",
    tab: "all",
    todos: [],
    showNew: false,
    titleInput: "",
    descriptionInput: "",
    deadlineInput: null,
    showTodo: false,
    todoId: "",
    todoTitle: "",
    todoDescription: "",
    todoDone: false,
    todoDeadline: null,
    showEdit: false
  },
  reducers: {
    getAllItemsRequest(state, action) {
      state.loading = true;
      state.tab = "all";
    },
    getTodoItemsRequest(state, action) {
      state.loading = true;
      state.tab = "todo";
    },
    getTodaysItemsRequest(state, action) {
      state.loading = true;
      state.tab = "today";
    },
    getItemsSuccess(state, action) {
      state.todos = action.payload;
      state.loading = false;
      state.error = "";
    },
    getItemsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addItemRequest(state, action) {
      state.loading = true;
    },
    addItemSuccess(state, action) {
      state.loading = false;
      state.error = "";
    },
    addItemFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    editItemRequest(state, action) {
      state.loading = true;
    },
    editItemSuccess(state, action) {
      state.loading = false;
      state.error = "";
    },
    editItemFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteItemRequest(state, action) {
      state.loading = true;
    },
    deleteItemSuccess(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.loading = false;
      state.error = "";
    },
    deleteItemFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleItemRequest(state, action) {
      state.loading = true;
    },
    toggleItemSuccess(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
      state.loading = false;
      state.error = "";
    },
    toggleItemFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    showNewModal(state, action) {
      state.titleInput = "";
      state.descriptionInput = "";
      state.deadlineInput = null;
      state.showNew = true;
    },
    hideNewModal(state, action) {
      state.showNew = false;
    },
    showTodoModal(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      state.todoId = todo.id;
      state.todoTitle = todo.title;
      state.todoDescription = todo.description;
      state.todoDeadline = todo.deadline;
      state.todoDone = todo.isDone;
      state.showTodo = true;
    },
    hideTodoModal(state, action) {
      state.showTodo = false;
    },
    showEditModal(state, action) {
      state.showTodo = false;
      state.titleInput = state.todoTitle;
      state.descriptionInput = state.todoDescription;
      state.deadlineInput = state.todoDeadline;
      state.showEdit = true;
    },
    hideEditModal(state, action) {
      state.showEdit = false;
    },
    handleTitleChange(state, action) {
      state.titleInput = action.payload.target.value;
    },
    handleDescriptionChange(state, action) {
      state.descriptionInput = action.payload.target.value;
    },
    handleDeadlineChange(state, action) {
      state.deadlineInput = action.payload;
    }
  }
});

export const {
  getAllItemsRequest,
  getTodoItemsRequest,
  getTodaysItemsRequest,
  getItemsSuccess,
  getItemsFailure,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  editItemRequest,
  editItemSuccess,
  editItemFailure,
  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,
  toggleItemRequest,
  toggleItemSuccess,
  toggleItemFailure,
  showNewModal,
  hideNewModal,
  showTodoModal,
  hideTodoModal,
  showEditModal,
  hideEditModal,
  handleTitleChange,
  handleDescriptionChange,
  handleDeadlineChange
} = todosSlice.actions;

export default todosSlice.reducer;

export const getAllItems = () => async dispatch => {
  try {
    dispatch(getAllItemsRequest());
    let items = await client.allItems();
    items = items.sort((a, b) => {
      return a.deadline.valueOf() - b.deadline.valueOf();
    });
    dispatch(getItemsSuccess(items));
  } catch (error) {
    dispatch(getItemsFailure(error.message));
  }
};

export const getTodoItems = () => async dispatch => {
  try {
    dispatch(getTodoItemsRequest());
    let items = await client.todoItems();
    items = items.sort((a, b) => {
      return a.deadline.valueOf() - b.deadline.valueOf();
    });
    dispatch(getItemsSuccess(items));
  } catch (error) {
    dispatch(getItemsFailure(error.message));
  }
};

export const getTodaysItems = () => async dispatch => {
  try {
    dispatch(getTodaysItemsRequest());
    let items = await client.todaysItems();
    items = items.sort((a, b) => {
      return a.deadline.valueOf() - b.deadline.valueOf();
    });
    dispatch(getItemsSuccess(items));
  } catch (error) {
    dispatch(getItemsFailure(error.message));
  }
};

export const toggleItem = id => async (dispatch, getState) => {
  try {
    const { tab } = getState().todos;
    dispatch(toggleItemRequest());
    await client.toggleTodo(id);
    dispatch(toggleItemSuccess(id));
    if (tab === "todo") dispatch(getTodoItems());
  } catch (error) {
    dispatch(toggleItemFailure(error.message));
  }
};

export const deleteItem = id => async dispatch => {
  try {
    dispatch(deleteItemRequest());
    await client.deleteTodo(id);
    dispatch(deleteItemSuccess(id));
  } catch (error) {
    dispatch(deleteItemFailure(error.message));
  }
};

export const addItem = item => async (dispatch, getState) => {
  try {
    const { tab } = getState().todos;
    dispatch(addItemRequest());
    await client.addTodo(
      undefined,
      item.title,
      item.description,
      false,
      item.deadline ? item.deadline : new Date()
    );
    dispatch(addItemSuccess());
    switch (tab) {
      case "all":
        dispatch(getAllItems());
        break;
      case "todo":
        dispatch(getTodoItems());
        break;
      case "today":
        dispatch(getTodaysItems());
        break;
    }
    dispatch(hideNewModal());
  } catch (error) {
    dispatch(addItemFailure(error.message));
  }
};

export const editItem = () => async (dispatch, getState) => {
  try {
    const {
      todoId,
      todoDone,
      todoDeadline,
      titleInput,
      descriptionInput,
      deadlineInput,
      tab
    } = getState().todos;
    dispatch(editItemRequest());
    await client.editTodo(
      todoId,
      titleInput,
      descriptionInput,
      todoDone,
      deadlineInput == null ? todoDeadline : deadlineInput
    );
    dispatch(editItemSuccess());
    switch (tab) {
      case "all":
        dispatch(getAllItems());
        break;
      case "todo":
        dispatch(getTodoItems());
        break;
      case "today":
        dispatch(getTodaysItems());
        break;
    }
    dispatch(hideEditModal());
  } catch (error) {
    dispatch(editItemFailure(error.message));
  }
};

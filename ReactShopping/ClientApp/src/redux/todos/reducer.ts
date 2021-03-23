import {
  GET_ALL_ITEMS_REQUEST,
  GET_ALL_ITEMS_SUCCESS,
  GET_ALL_ITEMS_FAILURE,
  GET_TODO_ITEMS_REQUEST,
  GET_TODO_ITEMS_SUCCESS,
  GET_TODO_ITEMS_FAILURE,
  GET_TODAYS_ITEMS_REQUEST,
  GET_TODAYS_ITEMS_SUCCESS,
  GET_TODAYS_ITEMS_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  TOGGLE_ITEM_REQUEST,
  TOGGLE_ITEM_SUCCESS,
  TOGGLE_ITEM_FAILURE,
  SHOW_NEW_MODAL,
  HIDE_TODO_MODAL,
  SHOW_EDIT_MODAL,
  HIDE_EDIT_MODAL,
  HIDE_NEW_MODAL,
  SHOW_TODO_MODAL,
  HANDLE_TITLE_CHANGE,
  HANDLE_DEADLINE_CHANGE,
  HANDLE_DESCRIPTION_CHANGE
} from "./actions";
import { Todo } from "../../api/app.generated";

const initialTodosState = {
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
};

export function todos(state = initialTodosState, action) {
  console.log(action);
  //console.log(state);
  switch (action.type) {
    case GET_ALL_ITEMS_REQUEST:
      return { ...state, loading: true, tab: "all" };
    case GET_ALL_ITEMS_SUCCESS:
      return { ...state, todos: action.payload, loading: false, error: "" };
    case GET_ALL_ITEMS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_TODO_ITEMS_REQUEST:
      return { ...state, loading: true, tab: "todo" };
    case GET_TODO_ITEMS_SUCCESS:
      return { ...state, todos: action.payload, loading: false, error: "" };
    case GET_TODO_ITEMS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_TODAYS_ITEMS_REQUEST:
      return { ...state, loading: true, tab: "today" };
    case GET_TODAYS_ITEMS_SUCCESS:
      return { ...state, todos: action.payload, loading: false, error: "" };
    case GET_TODAYS_ITEMS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_ITEM_REQUEST:
      return { ...state, loading: true };
    case ADD_ITEM_SUCCESS:
      return { ...state, loading: false, error: "" };
    case ADD_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case EDIT_ITEM_REQUEST:
      return { ...state, loading: true };
    case EDIT_ITEM_SUCCESS:
      return { ...state, loading: false, error: "" };
    case EDIT_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case DELETE_ITEM_REQUEST:
      return { ...state, loading: true };
    case DELETE_ITEM_SUCCESS:
      var newTodos = state.todos.filter(todo => todo.id !== action.payload);
      return { ...state, todos: newTodos, loading: false, error: "" };
    case DELETE_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case TOGGLE_ITEM_REQUEST:
      return { ...state, loading: true };
    case TOGGLE_ITEM_SUCCESS:
      var newTodos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          var newTodo = todo;
          newTodo.isDone = !newTodo.isDone;
          return newTodo;
        } else return todo;
      });
      return { ...state, todos: newTodos, loading: false, error: "" };
    case TOGGLE_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case SHOW_NEW_MODAL:
      return {
        ...state,
        titleInput: "",
        descriptionInput: "",
        deadlineInput: null,
        showNew: true
      };
    case HIDE_NEW_MODAL:
      return { ...state, showNew: false };
    case SHOW_TODO_MODAL:
      const todo = state.todos.find(todo => todo.id === action.payload);
      return {
        ...state,
        todoId: todo.id,
        todoTitle: todo.title,
        todoDescription: todo.description,
        todoDeadline: todo.deadline,
        todoDone: todo.isDone,
        showTodo: true
      };
    case HIDE_TODO_MODAL:
      return { ...state, showTodo: false };
    case SHOW_EDIT_MODAL:
      return {
        ...state,
        showTodo: false,
        titleInput: state.todoTitle,
        descriptionInput: state.todoDescription,
        deadlineInput: state.todoDeadline,
        showEdit: true
      };
    case HIDE_EDIT_MODAL:
      return { ...state, showEdit: false };
    case HANDLE_TITLE_CHANGE:
      return { ...state, titleInput: action.payload.target.value };
    case HANDLE_DESCRIPTION_CHANGE:
      return { ...state, descriptionInput: action.payload.target.value };
    case HANDLE_DEADLINE_CHANGE:
      return { ...state, deadlineInput: action.payload };
    default:
      return state;
  }
}

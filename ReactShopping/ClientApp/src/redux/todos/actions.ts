import { TodosClient } from "../../api/app.generated";

export const GET_ALL_ITEMS_REQUEST = "GET_ALL_ITEMS_REQUEST";
export const GET_ALL_ITEMS_SUCCESS = "GET_ALL_ITEMS_SUCCESS";
export const GET_ALL_ITEMS_FAILURE = "GET_ALL_ITEMS_FAILURE";
export const GET_TODO_ITEMS_REQUEST = "GET_TODO_ITEMS_REQUEST";
export const GET_TODO_ITEMS_SUCCESS = "GET_TODO_ITEMS_SUCCESS";
export const GET_TODO_ITEMS_FAILURE = "GET_TODO_ITEMS_FAILURE";
export const GET_TODAYS_ITEMS_REQUEST = "GET_TODAYS_ITEMS_REQUEST";
export const GET_TODAYS_ITEMS_SUCCESS = "GET_TODAYS_ITEMS_SUCCESS";
export const GET_TODAYS_ITEMS_FAILURE = "GET_TODAYS_ITEMS_FAILURE";
export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";
export const EDIT_ITEM_REQUEST = "EDIT_ITEM_REQUEST";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILURE = "EDIT_ITEM_FAILURE";
export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";
export const TOGGLE_ITEM_REQUEST = "TOGGLE_ITEM_REQUEST";
export const TOGGLE_ITEM_SUCCESS = "TOGGLE_ITEM_SUCCESS";
export const TOGGLE_ITEM_FAILURE = "TOGGLE_ITEM_FAILURE";
export const SHOW_NEW_MODAL = "SHOW_NEW_MODAL";
export const HIDE_NEW_MODAL = "HIDE_NEW_MODAL";
export const SHOW_TODO_MODAL = "SHOW_TODO_MODAL";
export const HIDE_TODO_MODAL = "HIDE_TODO_MODAL";
export const SHOW_EDIT_MODAL = "SHOW_EDIT_MODAL";
export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL";
export const HANDLE_TITLE_CHANGE = "HANDLE_TITLE_CHANGE";
export const HANDLE_DESCRIPTION_CHANGE = "HANDLE_DESCRIPTION_CHANGE";
export const HANDLE_DEADLINE_CHANGE = "HANDLE_DEADLINE_CHANGE";

const client = new TodosClient("https://localhost:44312");

export const handleTitleChange = event => ({
  type: HANDLE_TITLE_CHANGE,
  payload: event
});
export const handleDescriptionChange = event => ({
  type: HANDLE_DESCRIPTION_CHANGE,
  payload: event
});
export const handleDeadlineChange = value => ({
  type: HANDLE_DEADLINE_CHANGE,
  payload: value
});
export const showNewModal = () => ({
  type: SHOW_NEW_MODAL
});
export const hideNewModal = () => ({
  type: HIDE_NEW_MODAL
});
export const showTodoModal = id => ({
  type: SHOW_TODO_MODAL,
  payload: id
});
export const hideTodoModal = () => ({
  type: HIDE_TODO_MODAL
});
export const showEditModal = () => ({
  type: SHOW_EDIT_MODAL
});
export const hideEditModal = () => ({
  type: HIDE_EDIT_MODAL
});
export const getAllItemsRequest = () => ({
  type: GET_ALL_ITEMS_REQUEST
});
export const getAllItemsSuccess = items => ({
  type: GET_ALL_ITEMS_SUCCESS,
  payload: items
});
export const getAllItemsFailure = error => ({
  type: GET_ALL_ITEMS_FAILURE,
  payload: error
});

export const getTodoItemsRequest = () => ({
  type: GET_TODO_ITEMS_REQUEST
});
export const getTodoItemsSuccess = items => ({
  type: GET_TODO_ITEMS_SUCCESS,
  payload: items
});
export const getTodoItemsFailure = error => ({
  type: GET_TODO_ITEMS_FAILURE,
  payload: error
});

export const getTodaysItemsRequest = () => ({
  type: GET_TODAYS_ITEMS_REQUEST
});
export const getTodaysItemsSuccess = items => ({
  type: GET_TODAYS_ITEMS_SUCCESS,
  payload: items
});
export const getTodaysItemsFailure = error => ({
  type: GET_TODAYS_ITEMS_FAILURE,
  payload: error
});

export const addItemRequest = () => ({
  type: ADD_ITEM_REQUEST
});
export const addItemSuccess = () => ({
  type: ADD_ITEM_SUCCESS
});
export const addItemFailure = error => ({
  type: ADD_ITEM_FAILURE,
  payload: error
});

export const editItemRequest = () => ({
  type: EDIT_ITEM_REQUEST
});
export const editItemSuccess = () => ({
  type: EDIT_ITEM_SUCCESS
});
export const editItemFailure = error => ({
  type: EDIT_ITEM_FAILURE,
  payload: error
});

export const deleteItemRequest = () => ({
  type: DELETE_ITEM_REQUEST
});
export const deleteItemSuccess = id => ({
  type: DELETE_ITEM_SUCCESS,
  payload: id
});
export const deleteItemFailure = error => ({
  type: DELETE_ITEM_FAILURE,
  payload: error
});

export const toggleItemRequest = () => ({
  type: TOGGLE_ITEM_REQUEST
});
export const toggleItemSuccess = id => ({
  type: TOGGLE_ITEM_SUCCESS,
  payload: id
});
export const toggleItemFailure = error => ({
  type: TOGGLE_ITEM_FAILURE,
  payload: error
});

export const getAllItems = () => {
  return function(dispatch) {
    dispatch(getAllItemsRequest());
    client
      .allItems()
      .then(items => {
        dispatch(
          getAllItemsSuccess(
            items.sort((a, b) => {
              return a.deadline.valueOf() - b.deadline.valueOf();
            })
          )
        );
      })
      .catch(error => {
        dispatch(getAllItemsFailure(error.message));
      });
  };
};

export const getTodoItems = () => {
  return function(dispatch) {
    dispatch(getTodoItemsRequest());
    client
      .todoItems()
      .then(items => {
        dispatch(
          getTodoItemsSuccess(
            items.sort((a, b) => {
              return a.deadline.valueOf() - b.deadline.valueOf();
            })
          )
        );
      })
      .catch(error => {
        dispatch(getTodoItemsFailure(error.message));
      });
  };
};

export const getTodaysItems = () => {
  return function(dispatch) {
    dispatch(getTodaysItemsRequest());
    client
      .todaysItems()
      .then(items => {
        dispatch(
          getTodaysItemsSuccess(
            items.sort((a, b) => {
              return a.deadline.valueOf() - b.deadline.valueOf();
            })
          )
        );
      })
      .catch(error => {
        dispatch(getTodaysItemsFailure(error.message));
      });
  };
};

export const toggleItem = id => {
  return function(dispatch, getState) {
    const { tab } = getState().todos;
    dispatch(toggleItemRequest());
    client
      .toggleTodo(id)
      .then(() => {
        dispatch(toggleItemSuccess(id));
        if (tab === "todo") dispatch(getTodoItems());
      })
      .catch(error => {
        dispatch(toggleItemFailure(error.message));
      });
  };
};

export const deleteItem = id => {
  return function(dispatch) {
    dispatch(deleteItemRequest());
    client
      .deleteTodo(id)
      .then(() => {
        dispatch(deleteItemSuccess(id));
      })
      .catch(error => {
        dispatch(deleteItemFailure(error.message));
      });
  };
};

export const addItem = item => {
  return function(dispatch, getState) {
    const { tab } = getState().todos;
    dispatch(addItemRequest());
    client
      .addTodo(
        undefined,
        item.title,
        item.description,
        false,
        item.deadline ? item.deadline : new Date()
      )
      .then(() => {
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
      })
      .catch(error => {
        dispatch(addItemFailure(error.message));
      });
  };
};

export const editItem = () => {
  return function(dispatch, getState) {
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
    client
      .editTodo(
        todoId,
        titleInput,
        descriptionInput,
        todoDone,
        deadlineInput == null ? todoDeadline : deadlineInput
      )
      .then(() => {
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
      })
      .catch(error => {
        dispatch(deleteItemFailure(error.message));
      });
  };
};

// src/redux/modules/todosSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

const initialState = {
  todos: [{ id: nanoid(), todoTitle: "예시1", isDone: false }],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  // 여기 todos는 어디인건지?
  "todos/__getTodos",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3001/todos");
      //action.payload data.data
      console.log(res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodo = createAsyncThunk(
  "todos/__postTodo",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const res = await axios.post("http://localhost:3001/todos", payload);
      // 투두 추가한거 보내고, 업데이트 후 다시 받아와야함
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchTodo = createAsyncThunk(
  "todos/__patchTodo",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      await axios.patch(
        `http://localhost:3001/todos/${payload.id}`,
        payload.data
      );
      //   patch를 하고 나서 겟요청을 다시한다.
      const res = await axios.get("http://localhost:3001/todos");
      //action.payload data.data
      console.log(res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "todos/__deleteTodo",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:3001/todos/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    // ---------------------------------------getTodo
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    //----------------------------postTodo
    [__postTodo.pending]: (state, action) => {
      state.isLoading = true;
    },

    [__postTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = [...state.todos, action.payload];
    },

    [__postTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //----------------------------deleteTodo
    [__deleteTodo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //------------------------patchTodo
    [__patchTodo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__patchTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      // console.log(action.payload);
    },
    [__patchTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;

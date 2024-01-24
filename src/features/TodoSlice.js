import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todos: []
}


export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo: (state,action) => {
            const todo = {
                id:action.payload.$id,
                content:action.payload.content,
                status:action.payload.status
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action) => {
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
        },
        updateTodo: (state,action) => {
            state.todos = state.todos.map((todo) => todo.id == action.payload.id ? {...todo,content:action.payload.content} : todo)
           
        },
        toggleTodo: (state,action) => {
            state.todos = state.todos.map((todo) => todo.id == action.payload.id ? {...todo, status:action.payload.status} : todo)
            
        }
    }
})

export const {addTodo,removeTodo,updateTodo,toggleTodo} = todoSlice.actions

export default todoSlice.reducer


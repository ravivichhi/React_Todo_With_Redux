import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeTodo,updateTodo,toggleTodo } from '../features/TodoSlice';
import todoservice from '../appwrite/todo'

function TodoItems( { todo } ) {
    const dispatch = useDispatch();
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.content)

    const deleteTodo = async() => {
        await todoservice.deleteTodo({id:todo.$id}).then((deleted) => {
            if(deleted){
                dispatch(removeTodo(todo.$id))
            }
        })
    }

    const toggleCompleted = async() => {
        await todoservice.toggleTodo(todo.$id,{status:!todo.status}).then((toggled) => {
            if(toggled){
                dispatch(toggleTodo({id:todo.$id,status:toggled.status}))
            }
        })
    }
    const updatedTodo = async() => {
        await todoservice.updateTodo(todo.$id,{content:todoMsg})
            .then((updated) => {
                dispatch(updateTodo({ id:updated.$id, content:updated.content}))
                setIsTodoEditable((prev) => !prev)
            })
    }
    
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.status ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.status}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.status ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
           
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.status) return;

                    if (isTodoEditable) {
                        updatedTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.status}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={deleteTodo}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItems;


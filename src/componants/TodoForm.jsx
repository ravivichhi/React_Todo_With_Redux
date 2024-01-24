import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addTodo} from '../features/TodoSlice';
import todoservice from '../appwrite/todo'

function TodoForm() {
    const [todo, setTodo] = useState('');
    const [error, setError] = useState("")
    const authData = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch();

    const add = async(e) => {
        e.preventDefault()
        setError('')
            const todoData = {
                user_id: authData.$id,
                content:todo,
                status:false
            }
        try {
            const submitData = await todoservice.createTodo(todoData)
            if(submitData){
                dispatch(addTodo(submitData))
            }
        } catch (error) {
            setError(error.message)
        }


        setTodo('')
    }
    

    return (
        <>
        <div className='text-red-600'>{error}</div>
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
        </>
    );
}

export default TodoForm;



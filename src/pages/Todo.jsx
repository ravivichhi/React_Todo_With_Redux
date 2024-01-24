import { useEffect, useState } from 'react';
import TodoForm from '../componants/TodoForm';
import TodoItems from '../componants/TodoItems';
import { useSelector } from 'react-redux'
import todoservice from '../appwrite/todo'

const Todo = () => {
    const todos = useSelector(state => state.todo.todos)
    const authData = useSelector(state => state.auth.userData)
    const [error, setError] = useState('')
    const [userTodos, setusertodos] = useState(todos)

    useEffect(() => {
      try {
        todoservice.listTodo({user_id:authData.$id}).then((todo)=>{
          if(todo.documents){
            setusertodos(todo.documents)
          }
        })
      } catch (error) {
        setError(error.message)
      }
    },[todos,authData])
    
  
    return (
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <p className='text-red-500'>{error}</p>
        <div className="mb-4">
            <TodoForm />
          </div>
        <div className="flex flex-wrap gap-y-3">
        {userTodos && userTodos.length > 0 ? (
          userTodos.map((todo)=>(
              <div className='w-full'
              key={todo.$id}
              >
              <TodoItems todo={todo} />
              </div>
              ))
              ) : (
                <p className="text-center w-full">No data available!!</p>
              )}
        </div>
    </div>
    );
}

export default Todo;

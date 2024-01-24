import {useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {login as authLogin} from '../features/AuthSlice'
import Input from './Input'
import { useDispatch } from 'react-redux'
import service from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await service.login(data)
            if (session) {
                const userData = await service.getAccount()
                if(userData) dispatch(authLogin(userData));
                navigate("/dashboard")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign Up
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <button
                type="submit"
                className="w-full  px-6 py-2 duration-200 hover:bg-blue-300 bg-blue-400 m-2 rounded-full"
                >Sign in</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login

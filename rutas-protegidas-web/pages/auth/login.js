import React from 'react'
import AuthLayout from '../../components/auth'
import * as regex from '../../components/help/regex'
import useAccount from '../../services/authentication/useAccount'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ImSpinner9 } from 'react-icons/im'
import { useRouter } from 'next/router'
const Login = () => {
    const router = useRouter()
    const { setData, error, isLoading } = useAccount()

    const [dataUser, setDataUser] = React.useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = React.useState(false)
    const [errorLocal, setError] = React.useState('')

    React.useEffect(() => {
        if (error) {
            setError(error)
        }
    }, [error])


    const data = (e) => {
        e.preventDefault()
        let userData = {
            email: e.target[0].value,
            password: e.target[1].value
        }
        const validate = regex.regexEmail(userData.email)

        if (!userData.password || userData.password === '') {
            setError('Ingresa tu correo electrónico')
        } else if (!validate) {
            setError('Formato de correo no válido')
        } else if (!userData.password || userData.password === '') {
            setError('Ingresa la contraseña')
        } else {
            if (error)
                setError('')
            setData(userData)
        }

    }

    const updateProperty = (value, property) => {
        if (error)
            setError('')
        setDataUser({ ...dataUser, [property]: value })
    }

    return (
        <AuthLayout>
            <div className="w-1/2 mx-6 flex flex-col justify-around" style={{ height: '90%' }}>
                <h2 className="font-bold text-4xl -mt-12">Iniciar sesión</h2>
                <h4 className="font-semibold text-lg mb-6">{`Art&Expression: Le'Vouisa`}</h4>
                <form
                    onSubmit={data}
                >
                    <div className='flex flex-col '>
                        <label name="email" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Tu email <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                        <input
                            className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type="email" placeholder="jhon00@example.com"
                            value={dataUser.email} onChange={({ target }) => updateProperty(target.value, 'email')}
                        />
                    </div>
                    <div className='flex flex-col my-4 relative z-10'>
                        <label name="password" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Contraseña <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                        {
                            showPassword ?
                                <AiOutlineEye className="absolute bottom-2 right-3 z-30 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                : <AiOutlineEyeInvisible className="absolute bottom-2 right-3 z-30 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                        }
                        <input className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type={`${!showPassword ? 'password' : 'text'}`} placeholder='Hey bro, nic3 p4ssword'
                            value={dataUser.password} onChange={({ target }) => updateProperty(target.value, 'password')}
                        />
                    </div>
                    <div className='w-full flex justify-center mt-4'>
                        <button
                            disabled={isLoading ? true : false}
                            className={`bg-indigo-${isLoading ? '4':'8'}00 text-white border-gray-${isLoading ? '3':'7'}00 flex items-center py-2 px-5 border-2 rounded-md hover:scale-95 transition duration-200`} 
                            type='submit'>
                                {
                                    isLoading ? <ImSpinner9 className={`animate-spin mr-2 text-indigo-800`} size={20} /> : null
                                }
                            <p>Iniciar sesión</p>
                        </button>
                    </div>
                </form>
                <p className="font-semibold text-red-500 my-4 w-48 mx-auto text-center">{errorLocal}</p>
                <hr className='h-1 shadow border-0 rounded bg-indigo-300' />
                <div className='text-center'>
                    <p className="mb-2 text-gray-500">¿Olviste tu contraseña? <span className="font-bold cursor-not-allowed">Recuperar aquí</span></p>
                    <p className='mb-0'>¿Usuario nuevo? <span ><button className='font-bold cursor-pointer' onClick={() => router.push('/auth/register')}>Registrar</button></span></p>
                </div>
                <hr className='h-1 shadow border-0 rounded bg-indigo-300' />
            </div>
            <div>
                <img className='w-96 rounded-3xl' style={{ height: '512px' }} alt='Imagen inicio de sesión' src='https://definicion.mx/wp-content/uploads/2015/01/Abstracto.jpg' />
            </div>
        </AuthLayout>
    )
}

export default Login
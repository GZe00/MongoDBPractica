import React from 'react'
import AuthLayout from '../../components/auth'
import { useRouter } from 'next/router'
import * as regex from '../../components/help/regex'
import useAccount from '../../services/authentication/useAccount'
import { ImSpinner9 } from 'react-icons/im'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle } from 'react-icons/ai'

const Register = () => {

  const router = useRouter()
  const { error, setNewUser, statusCreate, isLoading } = useAccount()

  const [dataUser, setDataUser] = React.useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  })
  const [confirmPass, setConfirmPass] = React.useState('')

  const [showPasswordOne, setShowPasswordOne] = React.useState(false)
  const [showPasswordTwo, setShowPasswordTwo] = React.useState(false)


  const [errorLocal, setError] = React.useState('')

  React.useEffect(() => {
    if (error) {
      setError(error)
    }
  }, [error])

  React.useEffect(() => {
    if (errorLocal)
      setError('')
    if (dataUser.password !== confirmPass) {
      setError('Contraseñas no coinciden')
    }
  }, [dataUser.password, confirmPass])

  const matchPass = () => {
    if (dataUser.password !== confirmPass) {
      return false
    }
    return true
  }

  const data = (e) => {
    e.preventDefault()
    let userData = {
      name: e.target[0].value,
      lastname: e.target[1].value,
      username: e.target[2].value,
      email: e.target[3].value,
      password: e.target[4].value,
    }
    const validate = regex.regexEmail(userData.email)

    if (!userData.name || userData.name === '') {
      setError('Ingresa tu nombre')
    } else if (!userData.username || userData.username === '') {
      setError('Ingresa un nombre de usuario')
    } else if (!userData.email || userData.email === '') {
      setError('Ingresa tu correo electrónico')
    } else if (!validate) {
      setError('Formato de correo no válido')
    } else if (!userData.password || userData.password === '') {
      setError('Ingresa la contraseña')
    } else if (!confirmPass || confirmPass === '') {
      setError('Confirma tu contraseña')
    } else if (!matchPass()) {
      setError('Contraseñas no coinciden')
    } else if (dataUser.password.length < 7) {
      setError('Contraseña debe ser mayor a 7 caracteres')
    } else {
      if (error)
        setError('')
      console.log(userData);
      setNewUser(userData)
    }

  }

  const updateProperty = (value, property) => {
    if (error)
      setError('')
    setDataUser({ ...dataUser, [property]: value })
  }


  return (
    <AuthLayout>
      {
        !statusCreate && statusCreate === undefined ? <>
          <div className="w-1/2 mx-5 flex flex-col justify-center " style={{ height: '80%' }}>
            <h2 className="font-bold text-4xl -mt-6">Registro</h2>
            <h4 className="font-semibold text-lg mb-1">Bienvenido, nuevo usuario</h4>
            <form
              className="w-72 mx-auto"
              onSubmit={data}
            >
              <div className="justify-around flex my-2">
                <div className='w-1/2 flex flex-col'>
                  <label name="email" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Nombre(s) <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                  <input
                    className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type="text" placeholder="Jhon Example"
                    value={dataUser.name} onChange={({ target }) => updateProperty(target.value, 'name')}
                  />
                </div>
                <div className='w-1/2 pl-1 flex flex-col'>
                  <label name="email" className='font-semibold'>Apellido(s) <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                  <input
                    className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type="text" placeholder="Smith Example"
                    value={dataUser.lastname} onChange={({ target }) => updateProperty(target.value, 'lastname')}
                  />
                </div>
              </div>
              <div className='flex flex-col my-2'>
                <label name="email" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Nombre de usuario <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                <input
                  className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type="text" placeholder="theGr3atSmith00"
                  value={dataUser.username} onChange={({ target }) => updateProperty(target.value, 'username')}
                />
              </div>
              <div className='flex flex-col my-2'>
                <label name="email" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Email <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                <input
                  className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type="email" placeholder="jhon00@example.com"
                  value={dataUser.email} onChange={({ target }) => updateProperty(target.value, 'email')}
                />
              </div>
              <div className='flex flex-col my-2 relative z-10'>
                <label name="password" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Contraseña <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                {
                  showPasswordOne ?
                    <AiOutlineEye className="absolute bottom-2 right-3 z-30 cursor-pointer" onClick={() => setShowPasswordOne(!showPasswordOne)} />
                    : <AiOutlineEyeInvisible className="absolute bottom-2 right-3 z-30 cursor-pointer" onClick={() => setShowPasswordOne(!showPasswordOne)} />
                }
                <input className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type={`${!showPasswordOne ? 'password' : 'text'}`} placeholder='***********'
                  value={dataUser.password} onChange={({ target }) => updateProperty(target.value, 'password')}
                />
              </div>
              <div className='flex flex-col my-2 relative z-10'>
                <label name="password" className='font-semibold'><span className='text-red-600 font-semibold mr-1'>*</span>Confirmar contraseña <hr className='ml-1 h-1 bg-indigo-900 border-0 w-6 rounded-full mt-1 mb-4' /> </label>
                {
                  showPasswordTwo ?
                    <AiOutlineEye className="absolute bottom-2 right-3 z-30 cursor-pointer" onClick={() => setShowPasswordTwo(!showPasswordTwo)} />
                    : <AiOutlineEyeInvisible className="absolute bottom-2 right-3 z-30 cursor-pointer" onClick={() => setShowPasswordTwo(!showPasswordTwo)} />
                }
                <input className='px-2 py-1 rounded-lg focus:outline-none focus:ring focus:ring-violet-500' type={`${!showPasswordTwo ? 'password' : 'text'}`} placeholder='***********'
                  value={confirmPass} onChange={({ target }) => setConfirmPass(target.value)}
                />
              </div>
              <div className='w-full flex justify-center mt-4'>
                <button disabled={isLoading ? true : false}
                  className={`bg-indigo-${isLoading ? '4' : '8'}00 text-white border-gray-${isLoading ? '3' : '7'}00 flex items-center py-2 px-5 border-2 rounded-md hover:scale-95 transition duration-200`}
                  type='submit'>
                  {
                    isLoading ? <ImSpinner9 className={`animate-spin mr-2 text-indigo-800`} size={20} /> : null
                  }
                  <p>Abrir cuenta</p>
                </button>
              </div>
            </form>
            <p className={`font-semibold text-red-500 my-4 w-56 mx-auto text-center ${!errorLocal ? 'scale-y-0 ' : 'scale-y-100'} transition-all duration-500`}>{errorLocal}</p>
            <hr className='h-1 shadow border-0 rounded bg-indigo-300' />
            <div className='text-center'>
              <p className='mb-2'>¿Ya tienes una cuenta? <span ><button className='font-bold cursor-pointer' onClick={() => router.push('/auth/login')}>Iniciar sesión</button></span></p>
              <p className="mb-0">¿Olviste tu contraseña? <span className="font-bold cursor-pointer">Recuperar aquí</span></p>
            </div>
            <hr className='h-1 shadow border-0 rounded bg-indigo-300' />
          </div>
          <div>
            <img className='w-96 rounded-3xl' style={{ height: '512px' }} alt='Imagen inicio de sesión' src='https://definicion.mx/wp-content/uploads/2015/01/Abstracto.jpg' />
          </div>
        </>
          :
          //Si, lo se, no está centrado, no me culpes vale?
          <div className='w-72 h-auto mx-auto -mr-6 flex flex-col justify-center items-center'>
            <AiOutlineCheckCircle className='text-green-500' size={96} />
            <p className='text-green-500 text-2xl font-semibold'>Registro exitosamente</p>
            <div className='text-center mt-6'>
              <p>Registro totalmente satisfactorio, el siguiente paso es iniciar sesión con el email y contraseña que acabas de crear</p>
              <p>Email: {dataUser.email ?? '¿Que pasó master?'}</p>
              <p>Contraseña: ***************</p>
              <button className='border-2 bg-indigo-100 border-indigo-300 rounded-lg px-5 py-1 mt-4 hover:scale-95 hover:bg-indigo-50 transition-transform duration-300' onClick={() => router.push('/auth/login')}>
                Iniciar sesión
              </button>
            </div>
          </div>
      }
    </AuthLayout >
  )
}

export default Register
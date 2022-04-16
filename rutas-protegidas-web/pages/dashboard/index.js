import React from 'react'
import Layout from '../../components/layout'
import { FaUserCircle } from 'react-icons/fa'
import { BiMessageAltDetail } from 'react-icons/bi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { ImSpinner9 } from 'react-icons/im'
import useAccount from '../../services/authentication/useAccount'

const Dashboard = () => {

  const { setGetUser, userInfo } = useAccount()

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTokenLocal = localStorage.getItem('apitoken');
      if (isTokenLocal) {
        setGetUser(isTokenLocal)
      }
    }
  }, [])

  React.useEffect(() => {
    console.log(userInfo)
  }, [userInfo])


  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex items-center">
          <div className="w-full items-center flex flex-col justify-center">
            <FaUserCircle className="text-gray-400" size={96} />
            <div className="text-center">
              <p className="text-sm text-gray-700">Contacto</p>
              <div className="overflow-x-auto" style={{ maxWidth: '172px' }}>
                <p className="text-xl text-center">{userInfo ? `${userInfo.email}` : <ImSpinner9 className="animate-spin text-gray-700" spin={18}/>}</p>
              </div>
            </div>
          </div>
          <div className="pl-10 flex flex-col">
            <div>
              <p className="text-3xl">{userInfo ? `${userInfo.name} ${userInfo?.lastname}` : <ImSpinner9 className="animate-spin text-indigo-500" spin={18}/>}</p>
              <p className="text-lg my-1 text-gray-500">{userInfo ? `${userInfo.username}` : <ImSpinner9 className="animate-spin text-indigo-500" spin={12} />}</p>
            </div>
            <div className="flex flex-col">
              <div className="bg-slate-300 flex rounded-lg px-4 py-1">
                <div className="flex flex-col mx-2">
                  <p className='text-gray-600 text-xs'>Pinturas</p>
                  <span className="text-2xl text-center">{'6'}</span>
                </div>
                <div className="flex flex-col mx-2">
                  <p className='text-gray-600 text-xs'>Seguidores</p>
                  <span className="text-2xl text-center">{'380'}</span>
                </div>
                <div className="flex flex-col mx-2">
                  <p className='text-gray-600 text-xs'>Puntuación</p>
                  <span className="text-2xl text-center">{'4.8'}</span>
                </div>
              </div>
              <div className=' flex justify-between mt-3'>
                <button className="border-gray-400 bg-gray-300 border-2 rounded-lg px-3 py-1 flex items-center hover:scale-105 transition-transform duration-300">
                  <BiMessageAltDetail size={28} className="pr-2 text-gray-600" />
                  <p className="text-gray-600">Mensaje</p>
                </button>
                <button className="border-indigo-600 bg-indigo-500 border-2 rounded-lg px-3 py-1 flex items-center hover:scale-105 transition-transform duration-300">
                  <IoIosAddCircleOutline size={28} className="pr-2 text-white" />
                  <p className='text-white'>Seguir</p>
                </button>
              </div>
            </div>

          </div>


        </div>
      </div>

      <div className='w-96 text-left mx-auto mt-8 bg-slate-100 shadow rounded-xl px-6 py-5'>
        <p>Gracias por utilizar esta pequeña demo, recuerda que este es una práctica sin ningun fin en especifico y además tuvo más que el proposito de que el autor pusiera en practica base de datos utilizando Mongo</p>
        <p className='mt-1'>Si por alguna razón ingresaste datos reales, no hay de que preocuparse, constantemente estaré limpiando la base de datos y no habrá ningún registro de nadie, además, es muy probable que esta demo deje de funcionar porque utilizaré la base de datos para otras practicas/proyectos (porque se tiene disponible 1 base de datos free por usuario)</p>
      </div>
    </Layout>
  )
}

export default Dashboard
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { RiProfileLine } from 'react-icons/ri'
import { MdGroupAdd } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { useRouter } from 'next/router'

const DropdownAccount = () => {
    const router = useRouter();
    const [showMenu, setShowMenu] = React.useState(false)

    const dropdown = () => setShowMenu(!showMenu)

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('apitoken');
            router.push('/auth/login')
        }
    }
    return <div className="absolute right-12 top-2 ">
        <div className="w-64 mx-auto flex justify-end">
            <FaRegUserCircle className="cursor-pointer" size={64} onClick={dropdown}/>
        </div>
        <div className={`absolute w-64 h-auto bg-white top-16 rounded-lg shadow ${!showMenu ? 'scale-y-0 ' : 'scale-y-100'} transition-all duration-200`}>
            <div className='flex items-center w-full h-auto my-2 py-1 hover:bg-slate-200 cursor-pointer'>
                <RiProfileLine className='mx-2' />
                <p className="">Perfil</p>
            </div>
            <hr />
            <div className='flex items-center w-full h-auto my-2 py-1 hover:bg-slate-200 cursor-pointer'>
                <MdGroupAdd className='mx-2' />
                <p className="">Buscar amigos</p>
            </div>
            <hr />
            <div className='flex items-center w-full h-auto my-2 py-1 hover:bg-slate-200 cursor-pointer' onClick={logout}>
                <BiLogOut className='mx-2'/>
                <p className="">Cerrar sesión</p>
            </div>
        </div>

    </div>
}

export default DropdownAccount
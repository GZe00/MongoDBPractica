import React from 'react'
import DropdownAccount from '../dropdown/account'
import {BiSearch} from 'react-icons/bi'

const NavBar = () => {
    return <div className="w-full flex justify-center items-center relative">
        <div className="my-6 relative">
            <BiSearch className="absolute bottom-2 left-2 text-gray-600" />
            <input className="border-2 border-gray-400 rounded-lg px-6 py-1" placeholder="Buscar amigo..." />
        </div>
        <DropdownAccount />
    </div>

}

export default NavBar
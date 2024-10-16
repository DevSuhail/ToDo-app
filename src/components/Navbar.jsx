import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-lime-500 py-2'>
            <div className='logo'>
                <span className='font-bold text-xl mx-10'>ToDo-Manager</span>
            </div>
            <ul className="flex gap-10 mx-10">
                <li className='cursor-pointer hover:font-bold transition-all font-medium'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all font-medium'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar

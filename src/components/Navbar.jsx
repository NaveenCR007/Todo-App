import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className='flex justify-between items-center max-w-full h-15 bg-purple-500'>
                <div className="left px-5 font-bold text-2xl cursor-pointer">
                    iTask
                </div>

                <div className="right font-medium">
                    <ul className='flex gap-4 px-5'>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'>About</li>
                        <li className='cursor-pointer'>Contact Us</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className='container relative mx-auto p-6'>
        <div className='flex items-center justify-between'>
          <div className='pt-2'>
            <a href='/'>Login Management</a>
          </div>

          <div className='hidden md:flex space-x-6'>
            <a
              className='hover:bg-brightRed hover:text-white rounded-full p-2 px-5'
              href='/'
            >
              Home
            </a>
            <a
              className='hover:bg-brightRed hover:text-white rounded-full p-2 px-5'
              href='/about'
            >
              About
            </a>
          </div>

          <a
            href='/'
            className='hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight'
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

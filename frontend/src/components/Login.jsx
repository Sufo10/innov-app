import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div
          className='bg-white px-6 py-8 shadow-md
          shadow-slate-400 text-black w-full rounded-lg'
        >
          <h1 className='mb-8 text-3xl text-center'>Login</h1>

          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-brightRed text-white hover:bg-brightRedLight my-1'
          >
            Login
          </button>
        </div>

        <div className='text-grey-dark mt-6'>
          Haven't registered yet?{' '}
          <Link
            className='no-underline border-b border-blue text-blue'
            to='/register'
          >
            Register Here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex items-end justify-between'>
        <h1 className='text-2xl'>Hello <br /> <span className='text-3xl font-semibold'>Praneeth</span></h1>
        <button className='bg-red-500 text-white text-lg font-medium py-2 px-5 py-2 rounded'>Log Out</button>
      </div>
    </div>
  )
}

export default Header

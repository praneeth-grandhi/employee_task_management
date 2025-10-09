import React from 'react'

const CreateTask = () => {
  return (
        <div className='p-8 bg-[#1c1c1c] mt-7 rounded-lg'>
            <form className='flex flex-wrap w-full items-start justify-between gap-5' action="">
              <div className='w-1/2'>
                <div>
                  <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                  <input className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Enter task title'/>
                </div>
                  <div>
                  <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                  <input className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                </div>
                <div>
                  <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
                  <input className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Enter employee name' />
                </div>
                <div>
                  <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                  <input className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Design, Dev, etc.' />
                </div>
              </div>
                <div>
                  <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                  <textarea className='text-sm py-1 px-2 rounded w-full h-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4' name="" placeholder='Enter task description' id='' cols="30" rows="10"></textarea>
                  <button className='bg-emerald-500 hover:bg-emerald-600 text-white text-sm mt-4 w-full py-3 px-5 rounded'>Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask

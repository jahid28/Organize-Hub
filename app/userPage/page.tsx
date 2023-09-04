'use client'
import React from 'react'
import {MdAddTask} from 'react-icons/md'
import {IoIosToday} from 'react-icons/Io'
import {CgNotes} from 'react-icons/cg'
import { useRouter } from 'next/navigation'

const UserPage = () => {
  const router=useRouter()


  return (
    <div className='h-[100vh] w-[100vw] flex flex-wrap justify-center place-items-center bg'>
      
      <div onClick={()=>{
        router.replace("/todoIncomplete")
      }} className='bg_dark p-10 mx-5 cursor-pointer rounded-md border-black border-2 hover:shadow-2xl shadow-black'>
        <p className='text-center text text-2xl py-2'>TO-DO</p>
        <p className='text-9xl text'><MdAddTask/></p>
      </div>
      <div onClick={()=>{
        router.replace("/today")
      }} className='bg_dark p-10 mx-5 cursor-pointer rounded-md border-black border-2 hover:shadow-2xl shadow-black'>
        <p className='text-center text text-2xl py-2'>Today Tasks</p>
        <p className='text-9xl text'><IoIosToday/></p>
      </div>

      <div onClick={()=>{
        router.replace("/note")
      }} className='bg_dark p-10 mx-5 cursor-pointer rounded-md border-black border-2 hover:shadow-2xl shadow-black'>
        <p className='text-center text text-2xl py-2'>Notes</p>
        <p className='text-9xl text'><CgNotes/></p>
      </div>

     


    

    </div>
  )
}

export default UserPage

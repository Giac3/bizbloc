import React from 'react'
import bizbloclogo from '../assets/bizbloclogo.svg'
import { FcGoogle} from 'react-icons/fc'
import { BsInfoSquareFill } from 'react-icons/bs'

const Home = () => {
  return (
    <div  className='w-screen h-screen items-center justify-center  flex  '>
      <div className='w-screen h-screen fixed' >
      <svg preserveAspectRatio='none'  className='w-[100%] h-[100%] absolute' viewBox="0 0 1456 1842" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2_9"  maskUnits="userSpaceOnUse" x="0" y="0" width="3457" height="1842">
<path d="M3456 0H0V1842H3456V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_2_9)">
<path d="M3456 0H0V1842H3456V0Z" fill="#E9F3FA"/>
<path d="M0 1351.9C345.6 1243.35 1036.8 880.871 1728 809.164C2419.2 737.458 3110.4 956.524 3456 993.364V1842H0V1351.9Z" fill="#BFDBFE"/>
</g>
</svg>
      </div>
        <div className='rounded-full w-32 h-32 absolute left-32 top-52 shadow-xl bg-blue-200 flex items-center justify-center'>
      <img draggable={false} className='scale-[0.5]' src={bizbloclogo}/>

      </div>
      <h1 className='absolute left-32 mt-10 top-80 text-gray-700 font-josefin text-3xl font-bold'>Move your CV to the web</h1>      
      <h2 className='absolute left-32 top-80 mt-20 text-gray-500 text-opacity-80  font-josefin text-md font-medium'>Build your virtual business card today !</h2>      
    <div className='bg-white flex-col gap-1 shadow-md w-[300px] flex justify-center items-center h-[250px]  absolute right-40 z-10 rounded-md'>
<h1 className=' font-josefin font-extrabold'>No Need to Sign Up</h1>
<h2 className=' font-josefin font-medium text-gray-500 text-opacity-60'>Just Log In with one of our options</h2>
<button className=' bg-gray-500 text-white p-2 font-josefin rounded-md shadow-md m-2'>Anonymous Log In</button>
<button className=' bg-blue-200 text-gray-600 p-2 flex items-center justify-center gap-2 font-josefin rounded-md shadow-md m-2'>Log In With Google <FcGoogle className='w-6 h-6'/> </button>
    <div>
      <BsInfoSquareFill className='w-6 h-6 cursor-pointer text-gray-400 shadow-md'/>
    </div>
    </div>
    
    </div>

    
  )
}

export default Home

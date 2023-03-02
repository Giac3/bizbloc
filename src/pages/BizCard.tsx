import React, { useEffect, useRef, useState } from 'react'
import { update, useAuth } from '../contexts/AuthContext'
import { BsLinkedin } from 'react-icons/bs'
import { FaInstagram, FaGithubSquare, FaTwitter } from 'react-icons/fa'
import { AiFillFacebook} from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { IoAddCircleSharp } from 'react-icons/io5'
import { GoBrowser } from 'react-icons/go'
import '../App.css'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
const BizCard = () => {
    const  {currentUser } = useAuth()
    const docRef = doc(db, "/bizcards", `${currentUser.uid}`)
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const positionRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const companyRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const bioRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDoc(docRef).then((docsnap) => {
            if (docsnap.exists()) {
                nameRef.current.value = docsnap.data()?.name
                positionRef.current.value = docsnap.data()?.position
                companyRef.current.value = docsnap.data()?.company
                emailRef.current.value = docsnap.data()?.email
                bioRef.current.value = docsnap.data()?.bio
            }
        })
    }, [])

    const handleSave = () => {
        
        const object = {
            name: nameRef.current.value,
            position: positionRef.current.value,
            company: companyRef.current.value,
            email: emailRef.current.value,
            bio: bioRef.current.value,
            photo: "bllblb",
            linkedin: "http",
            github: "http",
            twitter: "http",
            website: "http",
            youtube: "http",
            instagram: "http",
            facebook: "http",
        }
        update(object, currentUser, setLoading)
    }


  return (
    <div className='w-scren h-screen gap-2 flex-col bg-blue-100 flex items-center justify-center'>
        <div className='w-[400px] h-[300px] grid-cols-2 p-3 bg-white shadow-md rounded-md grid '>
            <div className='w-32 h-32  rounded-md '>
                <img className='rounded-md' src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=Boots"/>
            </div>
            <div className=' w-56 h-32  -ml-10 rounded-md'>
                <input ref={nameRef} placeholder='Name...' className='text-black outline-none w-56 font-josefin font-bold text-xl'/>
                <input ref={positionRef} placeholder='Current Position...' className='text-black h-4 text-sm outline-none w-56 font-josefin font-bold '/>
                <input ref={companyRef} placeholder='Current Company...' className='text-black h-4 text-sm outline-none w-56 font-josefin font-bold '/>
                <input ref={emailRef} placeholder='Email...' className='text-black text-sm h-6   outline-none w-56 font-josefin font-bold '/>
                <div className=' items-center mt-1 w-56 h-6 flex flex-row'>
                    <BsLinkedin className='cursor-pointer h-6 w-6 text-[#0077B7]'/>
                    <FaInstagram className='cursor-pointer rounded-md text-white insta h-6 w-6 ml-2'/>
                    <FaGithubSquare className='cursor-pointer rounded-md text-black scale-[1.1] h-6 w-6 ml-2'/>
                    <AiFillFacebook className='cursor-pointer rounded-md text-[#1877F2] h-6 scale-[1.2] w-6 ml-2'/>
                    <IoLogoYoutube className='cursor-pointer rounded-md text-[#FF0001] h-6 scale-[1.1] w-6 ml-2'/>
                    <FaTwitter className='cursor-pointer rounded-md text-[#189DF1] h-6 scale-[1.1] w-6 ml-2'/>
                    <GoBrowser className='cursor-pointer rounded-md  h-6 scale-[1.1] w-6 ml-2'/>
                </div>
            </div>
            <div className=' w-[372px] h-16 bg-black mt-3  rounded-md'>
                <textarea ref={bioRef} placeholder='Bio...' className='text-black resize-none outline-none w-[372px] h-16 font-josefin font-bold text-sm'/>
            </div>
            <div></div>
            <div className=' w-[372px] mt-3 h-12 border-[1px]  rounded-md flex items-center'>
                <label className='text-xs font-josefin absolute mb-12 w-10 flex items-center justify-center ml-2 bg-white'>Skills</label>
                <button className='text-xs shadow-md flex items-center justify-center rounded-md bg-gray-200 p-1 ml-1'><IoAddCircleSharp className='cursor-pointer rounded-md text-gray-800 h-5 w-5'/></button>
                
            </div>

        </div>
        <div className='w-[400px] flex justify-end items-center gap-2'>
            <button className='text-xs font-josefin underline text-gray-500'>reset</button>
        <button onClick={handleSave} disabled={loading} className='bg-green-200 p-1 rounded-md shadow-md font-josefin'>Save</button>
        </div>
    </div>
  )
}

export default BizCard

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare, FaInstagram, FaTwitter } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { GoBrowser } from 'react-icons/go'

const AddLink = ({setShowAddLinks, setLinkedin, setGithub, setInstagram, setTwitter, setWebsite, setYoutube, setFacebook, github, linkedin, twitter, facebook, youtube, website, instagram}:any) => {
    const linkedinRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const githubRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const instagramRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const twitterRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const websiteRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const youtubeRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const facebookRef = useRef() as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        linkedinRef.current.value = linkedin
        githubRef.current.value = github
        instagramRef.current.value = instagram
        twitterRef.current.value = twitter
        websiteRef.current.value = website
        youtubeRef.current.value = youtube
        facebookRef.current.value = facebook
    }, [])


    const handleSaveLinks = () => {
        setLinkedin(linkedinRef.current.value)
        setGithub(githubRef.current.value)
        setInstagram(instagramRef.current.value)
        setTwitter(twitterRef.current.value)
        setWebsite(websiteRef.current.value)
        setYoutube(youtubeRef.current.value)
        setFacebook(facebookRef.current.value)
        setShowAddLinks(false)
    }

  return (
    <div className='w-screen h-screen bg-blue-200 z-10 absolute bg-opacity-30 flex items-center justify-center'>
        <motion.div 
        initial={{scale:0}}
        animate={{scale:1}} 
        className='bg-white w-52 rounded-md gap-1 shadow-md h-[340px] flex items-center justify-center flex-col'>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <BsLinkedin className=' h-6 w-6 text-[#0077B7] '/>
            <input ref={linkedinRef} placeholder='Linkedin' className=' p-[2px] rounded-md border-[1px] outline-none font-josefin'/>
            </div>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <FaInstagram className=' rounded-md text-white insta h-6 w-6'/>
            <input ref={instagramRef} placeholder='Instagram' className=' border-[1px] p-[2px] rounded-md outline-none font-josefin'/>
            </div>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <FaGithubSquare className=' rounded-md text-black scale-[1.1] h-6 w-6 '/>
            <input ref={githubRef} placeholder='GitHub' className=' border-[1px] p-[2px] rounded-md outline-none font-josefin'/>
            </div>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <AiFillFacebook className=' rounded-md text-[#1877F2] h-6 scale-[1.2] w-6'/>
            <input ref={facebookRef} placeholder='Facebook' className=' border-[1px] p-[2px] rounded-md outline-none font-josefin'/>
            </div>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <IoLogoYoutube className=' rounded-md text-[#FF0001] h-6 scale-[1.1] w-6 '/>
            <input ref={youtubeRef} placeholder='Youtube' className=' border-[1px] p-[1px] rounded-md outline-none font-josefin'/>
            </div>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <FaTwitter className=' rounded-md text-[#189DF1] h-6 scale-[1.1] w-6 '/>
            <input ref={twitterRef} placeholder='Twitter' className=' border-[1px] p-[2px] rounded-md outline-none font-josefin'/>
            </div>
            <div className='flex  p-1 flex-row gap-2 items-center'>
            <GoBrowser className=' rounded-md  h-6 scale-[1.1] w-6 '/>
            <input ref={websiteRef} placeholder='Portfolio' className=' border-[1px] p-[2px] rounded-md outline-none font-josefin'/>
            </div>       
                    
                    
            <div className='flex flex-row gap-2'>
                <button onClick={() => {setShowAddLinks(false)}} className='text-xs underline font-josefin'>Cancel</button>
                <button onClick={handleSaveLinks} className='rounded-md p-1 shadow-md flex text-center bg-green-200 font-josefin'>Set</button>
            </div>
        </motion.div>
      
    </div>
  )
}

export default AddLink

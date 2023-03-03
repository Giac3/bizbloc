import React, { useEffect, useRef, useState } from 'react'
import { update, useAuth } from '../contexts/AuthContext'
import { BsLinkedin } from 'react-icons/bs'
import { FaInstagram, FaGithubSquare, FaTwitter, FaArrowUp } from 'react-icons/fa'
import { AiFillFacebook} from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { IoAddCircleSharp } from 'react-icons/io5'
import { GoBrowser } from 'react-icons/go'
import '../App.css'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { FcEditImage } from 'react-icons/fc'
import AddSkills from '../components/AddSkills'
import ScrollContainer from 'react-indiana-drag-scroll'
import AddLink from '../components/AddLink'
import bg from '../assets/bg.svg'
import bg2 from '../assets/bg2.svg'
import bg3 from '../assets/bg3.svg'
import bg4 from '../assets/bg4.svg'
import bg5 from '../assets/bg5.svg'
import { motion } from 'framer-motion'



const BizCard = () => {
    const  {currentUser } = useAuth()
    const docRef = doc(db, "/bizcards", `${currentUser.uid}`)
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const positionRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const companyRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const bioRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState("")
    const [newPhoto, setNewPhoto] = useState(null)
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [showAddSkills, setShowAddSkills] = useState(false)
    const [skills, setSkills] = useState<any>([])
    const [ linkedin, setLinkedin ] = useState("")
    const [ github, setGithub ] = useState("")
    const [ instagram, setInstagram ] = useState("")
    const [ twitter, setTwitter ] = useState("")
    const [ website, setWebsite ] = useState("")
    const [ youtube, setYoutube ] = useState("")
    const [ facebook, setFacebook ] = useState("")
    const [showAddLinks, setShowAddLinks] = useState(false)
    const [animateBGSelector, setAnimateBGSelector] = useState(false)
    const [backgroundImage, setBackgroundImage] = useState("")


    useEffect(() => {
        getDoc(docRef).then((docsnap) => {
            if (docsnap.exists()) {
                nameRef.current.value = docsnap.data()?.name
                positionRef.current.value = docsnap.data()?.position
                companyRef.current.value = docsnap.data()?.company
                emailRef.current.value = docsnap.data()?.email
                bioRef.current.value = docsnap.data()?.bio
                setPhoto(docsnap.data()?.photo)
                setSkills(docsnap.data()?.skills! ? docsnap.data()?.skills : [] )
                setLinkedin(docsnap.data()?.linkedin)
                setGithub(docsnap.data()?.github)
                setFacebook(docsnap.data()?.facebook)
                setInstagram(docsnap.data()?.instagram)
                setWebsite(docsnap.data()?.website)
                setYoutube(docsnap.data()?.youtube)
                setTwitter(docsnap.data()?.twitter)
                setBackgroundImage(docsnap.data()?.background)

            }
        })
    }, [])

    const handleEditPhoto = () => {
        inputFile.current!.click();
    }

    const handleChangePhoto = (e:any) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setNewPhoto(e.target.files[0])
            setPhoto(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleReset = () => {
        getDoc(docRef).then((docsnap) => {
            if (docsnap.exists()) {
                nameRef.current.value = docsnap.data()?.name
                positionRef.current.value = docsnap.data()?.position
                companyRef.current.value = docsnap.data()?.company
                emailRef.current.value = docsnap.data()?.email
                bioRef.current.value = docsnap.data()?.bio
                setPhoto(docsnap.data()?.photo)
                setSkills(docsnap.data()?.skills! ? docsnap.data()?.skills : [] )
            }
        })
    }

    const handleSave = () => {
        
        const object = {
            name: nameRef.current.value,
            position: positionRef.current.value,
            company: companyRef.current.value,
            email: emailRef.current.value,
            bio: bioRef.current.value,
            linkedin: linkedin,
            github: github,
            twitter: twitter,
            website: website,
            youtube: youtube,
            instagram: instagram,
            facebook: facebook,
            skills: skills,
            background: backgroundImage,
        }
        update(object, currentUser, setLoading, newPhoto)


    }

    const handleRemoveSkill = (i:any) => {
        const copy = [...skills]

        copy.splice(i,1)
        setSkills(copy)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
    }

    const handleBackgroundSelector = () => {
        if (animateBGSelector) {
            setAnimateBGSelector(false)
        } else {
            setAnimateBGSelector(true)
         }
    }

    const changeBackground = (bg:any) => {
        setBackgroundImage(bg)
    }

  return (
    <div className='w-screen overflow-hidden fixed h-screen gap-2 flex-col bg-blue-100 flex items-center justify-center'>
        <div style={{
    width: '100%',
    height: '100%',
    backgroundImage: backgroundImage === "bg" ? `url(${bg})`  : backgroundImage === "bg2" ? `url(${bg2})` : backgroundImage === "bg3" ? `url(${bg3})` :backgroundImage === "bg4" ? `url(${bg4})`: backgroundImage === "bg5" ? `url(${bg5})` : "",
    backgroundSize: 'cover'
  }} className='absolute h-[100%]'>
        
        </div>
        <div className='w-[400px] h-[300px] z-[10] grid-cols-2 p-3 bg-white shadow-md rounded-md grid '>
            <div className='w-32 h-32  rounded-md '>
            <button disabled={loading} onClick={handleEditPhoto} className='absolute w-5 rounded-md h-5 items-center justify-center flex '> <FcEditImage/> </button>
            <input onChange={handleChangePhoto} className='absolute hidden' id='file'  ref={inputFile} type={"file"}/>
                <img draggable={false} className='rounded-md' src={photo !== "" ? photo : "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Boots"}/>
            </div>
            <div className=' w-56 h-32  -ml-10 rounded-md'>
                <input ref={nameRef} placeholder='Name...' className='text-black outline-none w-56 font-josefin font-bold text-xl'/>
                <input ref={positionRef} placeholder='Current Position...' className='text-black h-4 text-sm outline-none w-56 font-josefin font-bold '/>
                <input ref={companyRef} placeholder='Current Company...' className='text-black h-4 text-sm outline-none w-56 font-josefin font-bold '/>
                <input ref={emailRef} placeholder='Email...' className='text-black text-sm h-6   outline-none w-56 font-josefin font-bold '/>
                <div className=' items-center mt-1 w-56 h-9 rounded-md flex flex-row border-[1px] p-1 justify-center'>
                <label className='text-xs font-josefin absolute ml-44 mb-9 w-10 flex items-center justify-center  bg-white'>Links
                <button onClick={() => {setShowAddLinks(true)}} className='text-xs shadow-md flex items-center justify-center rounded-full w-3 h-3 bg-gray-500 p-1 text-white ml-1'>+</button>
                </label>
                {
                    linkedin.includes('http')?<a href={linkedin} rel="noopener noreferrer" target="_blank"><BsLinkedin className='cursor-pointer h-6 w-6 text-[#0077B7]'/></a>:null
                }
                {
                    instagram.includes('http')?<a href={instagram} rel="noopener noreferrer" target="_blank"><FaInstagram className='cursor-pointer rounded-md text-white insta h-6 w-6 ml-2'/></a>:null
                }
                {
                    github.includes('http')?<a href={github} rel="noopener noreferrer" target="_blank"><FaGithubSquare className='cursor-pointer rounded-md text-black scale-[1.1] h-6 w-6 ml-2'/></a>:null
                } 
                {
                    facebook.includes('http')?<a href={facebook} rel="noopener noreferrer" target="_blank"><AiFillFacebook className='cursor-pointer rounded-md text-[#1877F2] h-6 scale-[1.2] w-6 ml-2'/></a>:null
                }
                {
                    youtube.includes('http')?<a href={youtube} rel="noopener noreferrer" target="_blank"><IoLogoYoutube className='cursor-pointer rounded-md text-[#FF0001] h-6 scale-[1.1] w-6 ml-2'/></a>:null
                }
                {
                    twitter.includes('http')?<a href={twitter} rel="noopener noreferrer" target="_blank"><FaTwitter className='cursor-pointer rounded-md text-[#189DF1] h-6 scale-[1.1] w-6 ml-2'/></a>:null
                }
                {
                    website.includes('http')?<a href={website} rel="noopener noreferrer" target="_blank"><GoBrowser className='cursor-pointer rounded-md  h-6 scale-[1.1] w-6 ml-2'/></a>:null
                }
                    
                </div>
            </div>
            <div className=' w-[372px] h-16 bg-black mt-3  rounded-md'>
                <textarea ref={bioRef} placeholder='Bio...' className='text-black resize-none outline-none w-[372px] h-16 font-josefin font-bold text-sm'/>
            </div>
            <div className='w-0 h-0'></div>
            
            
            <ScrollContainer horizontal={true} vertical={false} className='w-[372px] mt-3 h-12 border-[1px]  rounded-md flex items-center gap-2'>
                <label className='text-xs font-josefin absolute mb-12 w-10 flex items-center justify-center ml-2 bg-white'>Skills</label>
                <button onClick={() => {setShowAddSkills(true)}} className='text-xs shadow-md flex items-center justify-center rounded-md bg-gray-200 p-1 ml-1'><IoAddCircleSharp className='cursor-pointer rounded-md text-gray-800 h-5 w-5'/></button>
                {
                     skills!.length>0 ?skills?.map((skill:any, i:any) => {
                        return <div key={i} className='bg-gray-300 p-1 flex flex-row  rounded-md shadow-md font-josefin text-center'>
                            <button onClick={() => {handleRemoveSkill(i)}} className='w-2 h-2 flex items-center justify-center text-white rounded-full text-center  bg-red-400'>-</button>
                            {skill}</div>
                    }):null
                }
                </ScrollContainer>
            
            
        </div>
        <div className='w-[400px] z-[10] flex justify-end items-center gap-2'>
            <div className=' w-full '>
                <button onClick={handleCopy} className='text-xs duration-300 hover:bg-white font-josefin border-[1px] border-black p-1 rounded-md shadow-md'>Copy Link</button>
            </div>
            <button onClick={handleReset} className='text-xs min-w-[74px] font-josefin underline text-gray-500'>reset changes</button>
        <button onClick={handleSave} disabled={loading} className='bg-green-200 p-1 rounded-md shadow-md font-josefin'>Save</button>
        </div>
        {
            showAddSkills? <AddSkills setShowAddSkills={setShowAddSkills} skills={skills} setSkills={setSkills}/>:null
        }
        {
            showAddLinks?<AddLink setShowAddLinks={setShowAddLinks} setLinkedin={setLinkedin} setInstagram={setInstagram} setGithub={setGithub} setFacebook={setFacebook} setYoutube={setYoutube} setTwitter={setTwitter} setWebsite={setWebsite} linkedin={linkedin} github={github} instagram={instagram} youtube={youtube} facebook={facebook} twitter={twitter} website={website}/>:null 
        }
        <motion.div
        onClick={handleBackgroundSelector}
        initial={{translateY: 0}}
        animate={{translateY:  animateBGSelector? -130: 0}}
        className='bg-white cursor-pointer w-32 gap-1 flex-row p-2 justify-center h-10 absolute text-xs text-center items-center flex -bottom-1  rounded-md font-josefin'><span>Change Background</span>
        <motion.div
        initial={{rotate: 0}}
        animate={{rotate:  animateBGSelector? 180: 0}}>
        <FaArrowUp/>
        </motion.div>
        </motion.div>
        
        <motion.div
         initial={{translateY: 0}}
         animate={{translateY:  animateBGSelector? -130: 0}}
         className='bg-white w-[400px] h-32 absolute text-xs items-center flex   -bottom-32 rounded-md font-josefin'>
<ScrollContainer horizontal={true} vertical={false} className='bg-white grid grid-flow-col  w-[400px] h-32 absolute text-xs text-center items-center    rounded-md font-josefin'>
            <div
            onClick={() => {changeBackground("normal")}}
            style={{border: backgroundImage === "normal"? "1px solid yellow": ""}}
            className='w-24 h-24 ml-3 rounded-md bg-blue-200 shadow-md'></div>
            
            <div 
            onClick={() => {changeBackground("bg")}}
            style={{
                border: backgroundImage === "bg"? "1px solid yellow": "",      
                width: '96px',
                height: '96px',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover'
  }}  className='w-24 h-24 ml-3 rounded-md bg-blue-200 shadow-md'></div>
            <div 
            onClick={() => {changeBackground("bg2")}}
            style={{   
                border: backgroundImage === "bg2"? "1px solid yellow": "",
                width: '96px',
                height: '96px',
                backgroundImage: `url(${bg2})`,
                backgroundSize: 'cover'
  }}  className='w-24 h-24 ml-3 rounded-md bg-blue-200 shadow-md'></div>
            <div 
            onClick={() => {changeBackground("bg3")}}
            style={{
                border: backgroundImage === "bg3"? "1px solid yellow": "",
                width: '96px',
                height: '96px',
                backgroundImage: `url(${bg3})`,
                backgroundSize: 'cover'
  }}  className='w-24 h-24 ml-3 rounded-md bg-blue-200 shadow-md'></div>
            <div 
            onClick={() => {changeBackground("bg4")}}
            style={{
                border: backgroundImage === "bg4"? "1px solid yellow": "",
                width: '96px',
                height: '96px',
                backgroundImage: `url(${bg4})`,
                backgroundSize: 'cover'
  }}  className='w-24 h-24 ml-3 rounded-md bg-blue-200 shadow-md'></div>
            <div 
            onClick={() => {changeBackground("bg5")}}
            style={{
                border: backgroundImage === "bg5"? "1px solid yellow": "",
                width: '96px',
                height: '96px',
                backgroundImage: `url(${bg5})`,
                backgroundSize: 'cover'
  }}  className='w-24 h-24 ml-3 mr-3 rounded-md bg-blue-200 shadow-md'></div>
</ScrollContainer>
         </motion.div>
    </div>
  )
}

export default BizCard

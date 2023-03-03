import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFacebook } from 'react-icons/ai'
import { BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare, FaInstagram, FaTwitter } from 'react-icons/fa'
import { GoBrowser } from 'react-icons/go'
import { IoLogoYoutube } from 'react-icons/io'
import ScrollContainer from 'react-indiana-drag-scroll'
import { db } from '../firebase'

const ViewBizCard = ({userID}:any) => {
  const docRef = doc(db, "/bizcards", `${userID}`)
    const [name , setName] = useState("")
    const [position, setPosition ] = useState("")
    const [company, setCompany ] = useState("")
    const [email, setEmail ] = useState("")
    const [bio, setBio ] = useState("")
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
  useEffect(() => {
    getDoc(docRef).then((docsnap) => {
      if (docsnap.exists()) {
        setName(docsnap.data()?.name)
        setPosition(docsnap.data()?.position)
        setCompany(docsnap.data()?.company)
        setEmail(docsnap.data()?.email)
        setBio(docsnap.data()?.bio)
        setPhoto(docsnap.data()?.photo)
        setSkills(docsnap.data()?.skills! ? docsnap.data()?.skills : [] )
        setLinkedin(docsnap.data()?.linkedin)
        setGithub(docsnap.data()?.github)
        setFacebook(docsnap.data()?.facebook)
        setInstagram(docsnap.data()?.instagram)
        setWebsite(docsnap.data()?.website)
        setYoutube(docsnap.data()?.youtube)
        setTwitter(docsnap.data()?.twitter)
}
    })

  }, [])

  return (
    <div className='w-scren h-screen gap-2 flex-col bg-blue-100 flex items-center justify-center'>
        <div className='w-[400px] h-[300px] grid-cols-2 p-3 bg-white shadow-md rounded-md grid '>
            <div className='w-32 h-32  rounded-md '>
              <img draggable={false} className='rounded-md' src={photo !== "" ? photo : "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Boots"}/>
            </div>
            <div className=' w-56 h-32  -ml-10 rounded-md'>
                <div className='text-black outline-none w-56 font-josefin font-bold text-xl'><h1>{name}</h1></div>  
                <div  className='text-black h-4 text-sm outline-none w-56 font-josefin font-bold '><h1>{position}</h1></div>
                <div  className='text-black mt-2 h-4 text-sm outline-none w-56 font-josefin font-bold '><h1>{company}</h1></div>
                <div  className='text-black mt-1 h-4 text-sm outline-none w-56 font-josefin font-bold '><h1>{email}</h1></div>
                <div className=' items-center mt-2 w-56 h-9 rounded-md flex flex-row border-[1px] p-1 justify-center'>
                <label className='text-xs font-josefin absolute ml-44 mb-9 w-10 flex items-center justify-center  bg-white'>Links
                
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
            <div className=' w-[372px] h-16  mt-3  rounded-md'>
                <div  className='text-black resize-none outline-none w-[372px] h-16 font-josefin font-bold text-sm'><h1>{bio}</h1></div>
            </div>
            <div className='w-0 h-0'></div>
            
            
            <ScrollContainer horizontal={true} vertical={false} className='w-[372px] mt-3 h-12 border-[1px]  rounded-md flex items-center gap-2'>
                <label className='text-xs font-josefin absolute mb-12 w-10 flex items-center justify-center ml-2 bg-white'>Skills</label>
                
                {
                     skills!.length>0 ?skills?.map((skill:any, i:any) => {
                        return <div key={i} style={{marginLeft: i===0? 6: 0}} className='bg-gray-300 p-1 flex flex-row  rounded-md shadow-md font-josefin text-center'>
                            
                            {skill}</div>
                    }):null
                }
                </ScrollContainer>
            
            
        </div>
        <div className='w-[400px] flex justify-end items-center gap-2'>
            
        
        </div>
    </div>
  )
}

export default ViewBizCard

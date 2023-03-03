import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const AddSkills = ({setShowAddSkills, skills, setSkills}:any) => {
    const skillRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const handleAddSkill = () => {

        if (skillRef.current.value !== "") {
            setSkills((prevskills:any) => [...prevskills, skillRef.current.value])
            setShowAddSkills(false)
        }

    }

  return (
    <div className='w-screen h-screen bg-blue-200 z-10 absolute bg-opacity-30 flex items-center justify-center'>
        <motion.div 
        initial={{scale:0}}
        animate={{scale:1}} 
        className='bg-white w-52 rounded-md gap-1 shadow-md h-20 flex items-center justify-center flex-col'>
            <input ref={skillRef} placeholder='Type A Skill..' className=' text-center outline-none rounded-md p-1 font-josefin'/>
            <div className='flex flex-row gap-2'>
                <button onClick={() => {setShowAddSkills(false)}} className='text-xs underline font-josefin'>Cancel</button>
                <button onClick={handleAddSkill} className='rounded-md p-1 shadow-md flex text-center bg-green-200 font-josefin'>Add</button>
            </div>
        </motion.div>
      
    </div>
  )
}

export default AddSkills

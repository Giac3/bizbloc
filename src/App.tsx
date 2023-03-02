import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BizCard from './pages/BizCard'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ViewBizCard from './pages/ViewBizCard'
function App() {
  const { currentUser } = useAuth()
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
    console.log(window.location.href)
  }, [])

  

  return (
    
    <Routes>
      <Route path='/' element={<Home/>} />
      {
        currentUser! ? <Route path={ `/bizcard-${currentUser.uid}` } element={<BizCard/>} />:null
      }
      {
        currentUser! && url.includes('bizcard-') && url.split('bizcard-')[1] !== currentUser.uid ? <Route path={ `/bizcard-${url.split('bizcard-')[1]}` } element={<ViewBizCard user={url.split('bizcard-')[1]}/>} />:null
      }
      {
        !currentUser && url.includes('bizcard-') && url.split('bizcard-')[1] ? <Route path={ `/bizcard-${url.split('bizcard-')[1]}` } element={<ViewBizCard user={url.split('bizcard-')[1]}/>} />:null
      }
    </Routes>
    
  )
}

export default App

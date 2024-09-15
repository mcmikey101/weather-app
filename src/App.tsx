import './styles/App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { useState } from 'react'

function App() {
  const [system, setSystem] = useState('metric')
  function systemsetter() {
    if (system == 'metric') {
      setSystem('imperial')
    } else {
      setSystem('metric')
    }
  }
  return (  
    <>
      <div className='navbarcont'>
        <NavBar system={system} systemsetter={systemsetter}/>
      </div>
      <div className='homecont'>
        <Home system={system}/>
      </div>
    </>
  )
}

export default App

import './styles/App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'

function App() {
  return (
    <>
      <div className='navbarcont'>
        <NavBar/>
      </div>
      <div className='homecont'>
        <Home/>
      </div>
    </>
  )
}

export default App

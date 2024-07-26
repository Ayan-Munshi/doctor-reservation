import React from 'react'
import Reservation from '../components/Reservation'
import Admin from '../components/Admin'
import Home from '../components/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
function App() {
  

  return (
    <div className="bg-black">
      <Router>
       
       <Routes>
        
        <Route path='/admin' element={<Admin/>}/>

        <Route path='/' element={<Home/>}/>

        <Route path='/reservation/:docID' element={<Reservation/>}/>

       </Routes>

      </Router>
      
    </div>
  )
}

export default App



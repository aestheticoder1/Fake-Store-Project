import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import { Route, Routes } from 'react-router-dom';
import Create from './components/Create';
import Edit from './components/Edit';

const App = () => {
  return (
    <div className="h-screen w-screen flex">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
    </div>
  )
}

export default App;
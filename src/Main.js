import React from 'react'
import './Main.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/LogIn'
import New from './components/New';
import AllInfo from './components/AllInfo';
import NewMember from './components/NewMember';
import PrivateRoute from './components/PrivateRoute'



function Main() {
  
    return (
      <Router>
       <Routes>
        <Route path="/*" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/new" element={<New />} />
          <Route path="/members/:id" element={<AllInfo />} />
            <Route path="/NewM" element={<NewMember />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Main


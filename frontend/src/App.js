import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import store from './store';
import { getAllForms } from './action/formAction';

import {Routes, Route} from 'react-router-dom'
import Build from './pages/buildForm/Build';
import View from './pages/view/View';
import Table from './pages/table/Table';
import Login from './pages/login/Login';
import { loadUser } from './action/userAction';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
    // store.dispatch(getAllForms())
  })
  return (
    <div className="App">
     <Routes>
      <Route path='' Component={Login} />
      <Route path='/myforms' Component={Home} />
      <Route path='/build/:id' Component={Build} />
      <Route path='/view/:id' Component={View} />
      <Route path='/table/:id' Component={Table} />
     </Routes>
  
    </div>
  );
}

export default App;

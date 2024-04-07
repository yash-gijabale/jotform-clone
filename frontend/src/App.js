import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import store from './store';
import { getAllForms } from './action/formAction';


function App() {

  useEffect(()=>{
    store.dispatch(getAllForms())
  })
  return (
    <div className="App">
     <Home />
    </div>
  );
}

export default App;

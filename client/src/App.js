import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from "./components/navbar/navbar"
import './App.css';
import AllRoutes from './AllRoutes'
import  {useDispatch}  from 'react-redux'
import { fetchallquestion } from './actions/question';
import { useEffect } from 'react';
import { fetchallusers } from './actions/users';

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchallquestion())
    dispatch(fetchallusers())
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;

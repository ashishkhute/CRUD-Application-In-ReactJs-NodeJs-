import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import StudentData from './Components/StudentData';
import AddStudent from './Components/AddStudent';
import EditStudent from './Components/EditStudent';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Header';
import { setAuthToken } from './utils/setAuthToken';
//import Student from './Components/Student'


function App() {
//check jwt token
const token = localStorage.getItem("token");
console.log(token)
if (token) {
    setAuthToken(token);
}

  return (

    <Router>
      <Header/>
    <Routes> 
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/list' element={token?<StudentData/>:<Navigate to='/'/>}/>
      <Route path='/add' element={token?<AddStudent/>:<Navigate to='/' />}/>
      <Route path='/edit/:id' element={token?<EditStudent/>:<Navigate to='/' />}/>
      {/* <Route path='/st' element={<Student/>}/> */}

      
    </Routes>
    </Router>

    
  );
}

export default App;

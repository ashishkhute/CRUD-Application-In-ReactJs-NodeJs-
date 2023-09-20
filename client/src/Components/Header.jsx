import React from 'react'
import { useNavigate } from 'react-router';

function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
       
        navigate("/");
        window.location.reload();
      };
  return (
    <div style={{marginTop:20,marginRight:10 }}>
        <h3 style={{textAlign:'center',margin:10}}>Student CRUD App using ReactJS, NodeJS, TypeScript with JWT Authentication
        <button className='btn btn-danger' style={{float:'right'}} onClick={handleLogout}>Log Out</button></h3>
        </div>
  )
}

export default Header
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import  { Formik } from 'formik'
import { setAuthToken } from '../utils/setAuthToken';


function Login () {
  
  const [loading, setLoading] = useState(false)
  const [token, setToken ] = useState('')
  const navigate = useNavigate();

  
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
              .email("Invalid email address format")
              .required("Email is required"),
    password: Yup.string()
                  .min(8, "Pasword must be 8 or more characters")
                  .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
                  .matches(/\d/, "Password should contain at least one number")
                  .required("Password is required")
});


  // const handleSubmit = (e) => {
  //     e.preventDefault();

  //     axios.post("http://localhost:8080/users/login",{
  //       email:email,
  //       password:password
  //     }).then((res) =>{
  //       const { status } = res
  //       if(status===200){
  //       localStorage.setItem("token",res.data?.token);
  //       navigate('/list');
  //       }else{
  //         return{
  //         status:400,
  //         message:"Login Failed"
  //       }
  // }})
  //     }

 

  
  return (
    <>
    <Formik
    initialValues = {{
      email: '',
      password:''
   
    }}
    validationSchema = {LoginSchema}
  
    onSubmit= {(values) => {
      
      axios.post("http://localhost:8080/users/login", values)
     .then(response => {
       const {status, data }  = response;
       if(status === 200){
       localStorage.setItem("token", JSON.stringify(data?.userDetails?.token));
       localStorage.setItem("user", JSON.stringify(data));
       setToken(token)
       console.log(token)
       setLoading(true);
       navigate("/list");
     }else{
      navigate('/')
     }},values)
     .catch(err =>{ setLoading(false);
     console.log(err)});
    
 }}
    >
      {({values, handleChange, handleSubmit,errors})=>(
    <div className="d-flex vh-120 justify-content-center align-items-center">
      
    <div className="w-50 bg-white rounded-p-3" >
    <h1 style={{textAlign:'center',marginTop:20}}> Add Login Details</h1><br></br>
       <form onSubmit={handleSubmit}>
              <div className="form-group">
             <label> Email </label>
             <input type="text" className="form-control" id="email" value={values.email}
             onChange={handleChange}  placeholder='Enter Email'
             />
             {errors.email && <div>{errors.email}</div>}
           </div>

           <div className="form-group">
             <label>Password</label>
             <input type="text" className="form-control" id="password" value={values.password}
             onChange={handleChange}  placeholder='Enter Password' 
             />
             {errors.password && <div>{errors.password}</div>}
           </div>

              <div>
           <button   className="btn btn-success mt-4"  type='submit' >Login</button> 
           <Link to="/register"><button type="button" className="btn btn-primary" style={{marginLeft:25,marginTop:20}} >Register</button></Link>
           
           </div>   
         </form>
       </div>
       </div>)}
        </Formik>
       </>
  )
}


export default Login
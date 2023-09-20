import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
 
function Register() {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])


    useEffect(() => {
      ( async () => await Load())();
      }, [users]);
       
      async function  Load()
      {
         const result = await axios.get(
             "http://localhost:8080/users");
             setUsers(result.data.data);
             console.log(result.data);
      }
  
    //   async function register(event)
    //   {
    //       event.preventDefault();
    //   try
    //       {
    //        await axios.post("http://localhost:8080/users/register",{      
    //         userName: userName,
    //         email: email,
    //         password: password
    //       });
    //         alert("User Registered Successfully");            
    //       Load();  
    //       navigate("/");     
    //       }
    //   catch(err)
    //       {
    //         alert("Failed to add");
    //       }
    //  }

     const RegisterSchema = Yup.object().shape({
      userName:  Yup.string().required("User Name is required"),
      email:     Yup.string()
                    .email("Invalid email address format")
                    .required("Email is required"),
      password:  Yup.string()
                    .min(8, "Pasword must be 8 or more characters")
                    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
                    .matches(/\d/, "Password should contain at least one number")
                    .required("Password is required")
  });



  return (
    <>
    <Formik
    initialValues = {{
      id:'',
      userName:'',
      email: '',
      password:''
   
    }}
    validationSchema = {RegisterSchema}
    onSubmit= {(values,{resetForm}) => {
      alert(`You are Registered with User Name: `+values.userName);
      setLoading(true);
      axios.post("http://localhost:8080/users/register",values)
      .then(res=>(console.log(res)))
      .catch((err)=>console.log(err))
      setTimeout(() => {
        setLoading(false);
        resetForm();
      }, 1000 * 2);
    }
     
    }>
      {({values, handleChange, handleSubmit, errors})=>(
    <div className="d-flex justify-content-center align-items-center">
      
    <div className="w-50 bg-white rounded-p-3" >
    <h1 style={{textAlign:'center',marginTop:20}}> Add User Details</h1><br></br>
       <form onSubmit={handleSubmit}>
           <div className="form-group">
            <input  type="text" className="form-control" id="id" hidden value={values.id}
            onChange={handleChange}
            
            />
             <label htmlFor='userName'>User Name</label>
             <input  type="text" className="form-control" value={values.userName}
             id='userName' onChange={handleChange} placeholder='Enter User Name'
             />{errors.userName && <div>{errors.userName}</div>}
           </div>
         

           <div className="form-group">
             <label htmlFor='email'>Email</label>
             <input type="text" className="form-control" value={values.email} 
             id='email' onChange={handleChange} placeholder='Enter Email'
             />{errors.email && <div>{errors.email}</div>}
           </div>

           <div className="form-group">
             <label htmlFor='password'>Password</label>
             <input type="text" className="form-control" value={values.password} 
             id='password' onChange={handleChange} placeholder='Enter Password'
             />{errors.password && <div>{errors.password}</div>}
           </div>

              <div>
           <button type='submit'  className="btn btn-success mt-4" >Register</button> 
           <Link to="/"><button type="button" className="btn btn-primary" style={{marginLeft:25,marginTop:20}} >Login</button></Link>
           
           </div>   
         </form>
       </div>
       </div>)}
       </Formik>
       </>

  )
}

export default Register
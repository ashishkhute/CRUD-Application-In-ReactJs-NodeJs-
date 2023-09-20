import axios from "axios";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from 'formik'
import * as Yup from "yup"

function AddStudent() {
 
  const [students, setStudents] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    (async () => await Load())();
    }, [students]);
     
    async function  Load()
    {
       const result = await axios.get(
           "http://localhost:8080/students");
           setStudents(result.data.data);
           console.log(result.data);
    }

  //   async function addStudent(event)
  //   {
  //       event.preventDefault();
  //   try
  //       {
  //        await axios.post("http://localhost:8080/students",{      
  //         name: name,
  //         age: age,
  //         email: email,
  //         address: address,
  //         mobile: mobile
  //       });
  //         alert("Student Added Successfully");            
  //       Load();  
  //       navigate("/list");     
  //       }
  //   catch(err)
  //       {
  //         alert("Failed to add");
  //       }
  //  }

   const Schema = Yup.object().shape({

    name:     Yup.string()
                 .required("User Name is required"),
    age:      Yup.string()
                 .required("Enter valid Age"),
    email:    Yup.string()
                 .email("Invalid email address format")
                 .required("Email is required"),
    Address:  Yup.string()
                 .required("Address is required"),
    mobile:   Yup.string()
                 .required("Emter valid mobile NUmber")
});
   return(
    <>
    <Formik
    initialValues = {{
      id:'',
      name:'',
      age:'',
      email: '',
      address:'',
      mobile:''
   
    }}
    // validationSchema = { Schema }
    onSubmit= {(values,{resetForm}) => { 
      setLoading(true);
      axios.post("http://localhost:8080/students",values)
      .then(res=>(console.log(res)))
      .catch((err)=>console.log(err))
      alert(`Student added successfully`);
      setTimeout(() => {
        setLoading(false);
        resetForm();
      }, 1000 * 2);
    }
     
    }>
      {({ values, handleChange, handleSubmit, errors })=>(
    <div className="d-flex vh-120 justify-content-center align-items-center">
      
    <div className="w-50 bg-white rounded-p-3" >
    <h1 style={{textAlign:'center'}}> Add Student Details</h1><br></br>
       <form onSubmit={handleSubmit}>
           <div className="form-group">
            <input  type="text" className="form-control" id="id" hidden value={values.id}
            onChange={handleChange}

            />{errors.email && <div>{errors.email}</div>}
             <label>Student Name</label>
             <input  type="text" className="form-control" id="name" value={values.name}
             onChange={handleChange} placeholder="Enter Student Name"
             />
             {errors.name && <div>{errors.name}</div>}
           </div>
           <div className="form-group">
             <label>Age</label>
             <input  type="text" className="form-control" id="age" value={values.age}
               onChange={handleChange} placeholder="Enter Age"
             />
             {errors.age && <div>{errors.age}</div>}
           </div>

           <div className="form-group">
             <label>Email</label>
             <input type="text" className="form-control" id="email" value={values.email}
             onChange={handleChange} placeholder="Enter Email Address"
             />
             {errors.email && <div>{errors.email}</div>}
           </div>

           <div className="form-group">
             <label>Address</label>
             <input type="text" className="form-control" id="address" value={values.address}
            onChange={handleChange} placeholder="Enter Address"
             />
             {errors.address && <div>{errors.address}</div>}
           </div>

           <div className="form-group">
             <label>Mobile</label>
             <input type="text" className="form-control" id="mobile" value={values.mobile}
             onChange={handleChange} placeholder="Enter Mobile Number"
             />
             {errors.mobile && <div>{errors.mobile}</div>}
           </div>

              <div>
           <button type="submit"  className="btn btn-success mt-4" >Add</button> 
           <Link to="/list" type="button" className="btn btn-primary" style={{marginLeft:25,marginTop:20}} >Cancel</Link>
           
           </div>   
         </form>
       </div>
       </div>)}
       </Formik>
       </>

   )
}

export default AddStudent
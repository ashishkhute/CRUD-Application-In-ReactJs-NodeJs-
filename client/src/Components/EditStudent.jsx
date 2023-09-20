import axios from "axios";
import {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditStudent = () => {
  const id = useParams();
  const [name, setName ] = useState({})
  const [age, setAge ] = useState({})
  const [email, setEmail ] = useState({})
  const [address, setAddress ] = useState({})
  const [mobile, setMobile ] = useState({})
  const navigate = useNavigate();


  const getStudent =()=>{
    axios.get(`http://localhost:8080/students/${id}`)
  .then(result => {
    console.log(result)
  setName(result.data.name)
  setAge(result.data.age)
  setEmail(result.data.email)
  setAddress(result.data.address)
  setMobile(result.data.mobile)}
  )
  }
  useEffect(() =>{
    getStudent()
  },[]) 
    
  const handleSubmit = (event)=>{     
     event.preventDefault();
      let data = {id,name,age,email,address,mobile };
      let URL =`http://localhost:8080/students/${id}`;
      axios.put(URL,data)
      .then(res=>{
          console.log("res",res);
          if(res.data.affectedRows === 1){
              setName("");
              setAge("");
              setEmail("");
              setAddress("");
              setMobile("")
          }
          alert("Updated Successfully")
          navigate("/list");
      })
      .catch(err=>{
          console.log(err)
      })
  }
 
 
   return(
    <>

   <div className="d-flex  justify-content-center align-items-center">
      
    <div className="w-50 bg-white rounded-p-3" >
    <h1 style={{textAlign:'center'}}> Update Student Details</h1><br></br>
       <form onSubmit={handleSubmit}>
           <div className="form-group">
            
             <label>Student Name</label>
             <input  type="text" className="form-control" id="name"
             value={name}
             onChange={ e =>setName(e.target.value) }
             />
           </div>
           <div className="form-group">
             <label>Age</label>
             <input  type="text" className="form-control" id="age" 
              value={age}
               onChange={ e =>setAge(e.target.value) }
             />
           </div>

           <div className="form-group">
             <label>Email</label>
             <input type="text" className="form-control" id="email" 
               value={email}
             onChange={e =>setEmail(e.target.value)}
             />
           </div>

           <div className="form-group">
             <label>Address</label>
             <input type="text" className="form-control" id="address" 
               value={address}
             onChange={e =>setAddress(e.target.value)}
             />
           </div>

           <div className="form-group">
             <label>Mobile</label>
             <input type="text" className="form-control" id="mobile" 
               value={mobile}
             onChange={e =>setMobile(e.target.value)}
             />
           </div>

              <div>
           <button type="submit" className="btn btn-success mt-4">Update</button> 
           <Link to="/list" type="button" className="btn btn-primary" style={{marginLeft:20,marginTop:20}} >Cancel</Link>
           </div>   
         </form>
       </div>
       </div>
      
       </>
)
}

export default EditStudent
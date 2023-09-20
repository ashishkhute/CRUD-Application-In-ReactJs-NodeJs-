import axios from 'axios';
import DataTable from 'react-data-table-component'
import React, { useEffect, useState } from "react";
import {  useNavigate, Link, useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
} from 'reactstrap';

function StudentData()
{
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const [searchFilter, setSearchFilter] = useState([])
    const [value, setValue] =useState('')
    const {id} = useParams();


    useEffect(() => {
      getStudents();  
      }, []);

    useEffect(()=>{ fetch('http://localhost:8080/students')
    .then(res=>res.json()).then((data)=>setSearchFilter(data))
    .catch((error)=> console.log({error}));
     },[])

    useEffect(() =>{
       const Searchresults = searchFilter.filter(res =>
       res.id.toString().includes(value) ||
       res.name.toLowerCase().includes(value) || 
       res.age.toString().includes(value) ||
       res.email.toLowerCase().includes(value) || 
       res.address.toLowerCase().includes(value) ||
       res.mobile.includes(value)
      );
      setStudents(Searchresults)
     },[searchFilter,value])


  const getStudents = async () => {
      await axios.get(`http://localhost:8080/students`)
      .then((response)=>{
        setStudents(response.data); 
       }).catch((e)=> console.log(e.message))
  }

  function deleteStudent(id) {
    var result = window.confirm("Are you sure you want to delete?");
    if(result){
    axios.delete( `http://localhost:8080/students/` + id).then(() => {
      alert("Student of id: "+id+" removed Successfully!");
      getStudents();
     

    }).catch(error => {
      alert("Error Ocurred :" + error);
    });
  }
}
    
  function updateStudent(id) {
    navigate(`/edit/${id}`)
  }
  
  const handleSearch = async(e) =>
    setValue( e.target.value);

  const Columns =[
    {
      name:"Student Id",
      selector: row => row.id,
     
    },
    {
      name:"Student Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name:"Age",
      selector: row => row.age,
      sortable: true,
      
    },
    {
      name:"Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name:"Address",
      selector: row => row.address,
      sortable: true
    },
    {
      name:"Mobile Number",
      selector: row => row.mobile,
      sortable: true
    },
    {
      name:"Actions",
      cell: (row) => <button className='btn btn-primary' onClick={() =>updateStudent(row.id)}>Edit</button>
     
    },
    {
      cell: (row) => <button className='btn btn-danger' onClick={() =>deleteStudent(row.id)} >Delete</button>
    }
  ]
    
return(
<Form style={{marginLeft:200}} >
      <Row>
        <Col xl={10} lg={12} md={12}>
          <Card>
            
            <CardBody>
                <DataTable
                title={ <strong>Student Data Table</strong> }
                columns= {Columns}
                data= {students}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                  <Link to="/add" className='btn btn-primary'>Add Student</Link>}
                subHeaderAlign='left'
                striped
                paginationPerPage={8}
                paginationRowsPerPageOptions={[8,16,24,32]}
                actions={
                  <input 
                    type='text' 
                    placeholder='Search here'
                    className='w-50 form-control'
                    value={value}
                    onChange={handleSearch}/>  
                }
                responsive
                />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
    );

};

export default StudentData



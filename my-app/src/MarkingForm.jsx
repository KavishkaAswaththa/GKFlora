import React from 'react';
import axios from 'axios';
import {useEffect, useState } from "react";
//import Home from './Home';
//import { Route, Routes, useNavigate } from 'react-router-dom';
//import './Student.css'


function Student()
{
  const [attendanceId, setId] = useState('');
  const [eventId, setEvent] = useState("");
  const [volunteerEmail, setEmail] = useState("");
  const [attendance, setAttendance] = useState([]);
  //const navigate = useNavigate();



//LOGIC

 
 
useEffect(() => {
  (async () => await Load())();
  }, []);
 

  

 //GET

  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8080/api/v1/student/getall");
         setUsers(result.data);
         console.log(result.data);
  }
 






//POST

  
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8080/api/v1/attendance/saveAttendance",
        {
          attendanceId: attendanceId,
          eventId: eventId,
          volunteerEmail: volunteerEmail,
          attendance: attendance

        });
          alert("Student Registation Successfully");
          setId("");
          setEvent("");
          setEmail("");
          setAttendance("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }

 



//Edit



   async function editStudent(students)
   {
    setName(students.studentname);
    setAddress(students.studentaddress);
    setMobile(students.mobile); 
    setId(students._id);
   }
 









//DELETE





   async function DeleteStudent(studentid)
   {
        await axios.delete("http://localhost:8080/api/v1/student/delete/" + studentid); 
        alert("Student deleted Successfully");
        Load();
   }
 








//PUT


   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8080/api/v1/student/edit/" + studentid ,
       {

        studentname: studentname,
        studentaddress: studentaddress,
         mobile: mobile
       
       });
         alert("Registation Updated");
         setId("");
         setName("");
         setAddress("");
         setMobile("");
         Load();
       }
   catch(err)
       {
         alert("Student Updateddd Failed");
       }
  }









//DESIGN


  return (
    <div>
       <h1>Student Details</h1>
       <div class="container mt-4" >
          <form>
             
              <div class="form-group">
                <label>Student Name</label>
                <input  type="text" class="form-control" id="eventId"
                value={eventId}
                onChange={(event) =>
                  {
                    setEvent(event.target.value);      
                  }}
                />
              </div>

              


              <div class="form-group">
                <label>Student Address</label>
                <input  type="text" class="form-control" id="volunteerEmail" 
                 value={volunteerEmail}
                  onChange={(event) =>
                    {
                      setEmail(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Mobile</label>
                <input type="text" class="form-control" id="attendance" 
                  value={attendance}
                onChange={(event) =>
                  {
                    setAttendance(event.target.value);      
                  }}
                />
                


              </div>
              <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>

              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              <button class="btn btn-warning mt-4" onClick={() => navigate('/')}>Go to Home</button>
                 
              
              </div>
              
            </form>

          </div>
                <br/>
<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Student Name</th>
      <th scope="col">Student Address</th>
      <th scope="col">Student Mobile</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {students.map(function fn(student)
       {
            return(
            <tbody>
                <tr>
                <td>{student.studentname}</td>
                <td>{student.studentaddress}</td>
                <td>{student.mobile}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete</button>
                    
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
  
  export default Student;

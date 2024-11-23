import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Student.css'



function Student() {
  const [attendanceId, setId] = useState('');
  const [eventId, setEvent] = useState("");
  const [volunteerEmail, setEmail] = useState("");
  const [attendance, setAttendance] = useState([]); // 7 checkboxes for days of the week
  const [students, setStudents] = useState([]); // Store the loaded students
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



  // Load students on initial render
  useEffect(() => {
    (async () => await Load())();
  }, []);




  // GET: Load all students
  async function Load() {
    const result = await axios.get('http://localhost:8080/api/v1/attendance/getall');
    setStudents(result.data); // Store the loaded students in state
  }




  // POST: Save new student
  async function save(event) {
    
    
    event.preventDefault();
    console.log("save" , attendance);
    try {
      await axios.post("http://localhost:8080/api/v1/attendance/saveAttendance", {
        
        eventId: eventId,
        volunteerEmail: volunteerEmail,
        attendance: attendance
      });
      alert("Student Registration Successfully");
      resetForm();
      Load();
    } catch (err) {
      alert('Student Registration Failed');
    }
  }




  // PUT: Update student details
  async function update(event) {
    event.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/v1/attendance/edit/' + attendanceId, {
        attendanceId: attendanceId,
        eventId: eventId,
        volunteerEmail: volunteerEmail,
        attendance: attendance
      });
      alert("Student Update Successfully");
      resetForm();
      Load();
    } catch (err) {
      alert('Student Update Failed');
    }
  }




  // Edit student (populate form with selected student details)
  async function editStudent(student) {
    setId(student.attendanceId);
    setEvent(student.eventId);
    setEmail(student.volunteerEmail);
    setAttendance(student.attendance);
  }





  // DELETE: Remove student
  async function DeleteStudent(studentId) {
    await axios.delete('http://localhost:8080/api/v1/attendance/delete/' + studentId);
    alert('Student deleted Successfully');
    Load();
  }





  // Handle checkbox change for days
  const handleDayChange = (index) => {
    const updatedAttendance = attendance.map((value, idx) => (idx === index ? !value : value));
    setAttendance(updatedAttendance);
    console.log(updatedAttendance);
  };




  // Reset form after save/update
  const resetForm = () => {
    setId('');
    setEvent('');
    setEmail('');
    setAttendance([false, false, false, false, false, false, false]); // Reset checkboxes
  };



  

  // Design section with 7-day checkboxes
  return (
    <div>
      <h1>Attendance Sheet</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              className="form-control"
              value={eventId}
              onChange={(event) => setEvent(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Volunteer Email</label>
            <input
              type="email"
              className="form-control"
              value={volunteerEmail}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label> Days:</label>
            <div>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                (day, index) => (
                  <label key={index} className="mr-3">
                    <input
                      type="checkbox"
                      checked={attendance[index]}
                      onChange={() => handleDayChange(index)}
                    />{' '}
                    {day}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <br />
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Attendance ID</th>
            <th scope="col">Event ID</th>
            <th scope="col">Volunteer Email</th>
            <th scope="col">Attendance Days</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.attendanceId}</td>
              <td>{student.eventId}</td>
              <td>{student.volunteerEmail}</td>
              <td>
              function () {
                
              student.attendance.map((item, index) => (
              item ? <p key={index}>
                
                if ({item}){
                  "Hi"
                }
              
              </p> : null
              ))
            }  


                    
  

                
              



                   
                

                 
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;

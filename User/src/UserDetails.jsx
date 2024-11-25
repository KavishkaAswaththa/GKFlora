import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./UserDetails.css";

function UserDetails() 
{
 const [customerid, setId] = useState('');
 const [customerfirstname, setFirstName] = useState("");
 const [customerlastname, setLastName] = useState("");
 const [customeraddress, setAddress] = useState("");
 const [mobile, setMobile] = useState("");
 const [customers, setCustomers] = useState([]);


//LOGIC

useEffect(() => {
    (async () => await Load())();
    }, []);
   
  
    //GET
  
    async function  Load()
    {
       const result = await axios.get(
           "http://localhost:8080/api/v1/details/getall");
           setCustomers(result.data);
           console.log(result.data);
    }
   
  
    //POST
  
       async function save(event)
      {
          event.preventDefault();
      try
          {
           await axios.post("http://localhost:8080/api/v1/details/save",
          {
          customerfirstname: customerfirstname,
          customerlastname: customerlastname,
          customeraddress: customeraddress,
          mobile: mobile

          });
            alert("Customer Registation Successfully.");
            setId("");
            setFirstName("");
            setLastName("");
            setAddress("");
            setMobile("");
            Load();
          }
      catch(err)
          {
            alert("Customer Registation Failed.");
          }
     }
  
   
  
  
  
  //Edit
  
  
  
     async function editCustomer(customers)
     {
      setFirstName(customers.customerfirstname);
      setLastName(customers.customerlastname);
      setAddress(customers.customeraddress);
      setMobile(customers.mobile); 
      setId(customers._id);
     }
   
  
  //DELETE
  
     async function DeleteCustomer(customerid)
     {
          await axios.delete("http://localhost:8080/api/v1/details/delete/" + customerid); 
          alert("Customer deleted Successfully.");
          Load();
     }
   
  
  //PUT

     async function update(event)
     {
      event.preventDefault();
   
     try
         {
          await axios.put("http://localhost:8080/api/v1/details/edit/" + customerid ,
         {
  
          customerfirstname: customerfirstname,
          customerlastname: customerlastname,
          customeraddress: customeraddress,
          mobile: mobile
         
         });
           alert("Registation Updated.");
           setId("");
           setFirstName("");
           setLastName("");
           setAddress("");
           setMobile("");
           Load();
         }
     catch(err)
         {
           alert("Customer Updated Failed.");
         }
    }
  

  //DESIGN

    return (
      <div>
         <h1>Account Details</h1>
         <div class="container mt-4" >
            <form>
               
                <div class="form-group">
                  <label>Customer Fist Name</label>
                  <input  type="text" class="form-control" id="customerfirstname"
                  value={customerfirstname}
                  onChange={(event) =>
                    {
                      setFirstName(event.target.value);      
                    }}
                  />
                </div>

                <div class="form-group">
                  <label>Customer Last Name</label>
                  <input  type="text" class="form-control" id="customerlastname"
                  value={customerlastname}
                  onChange={(event) =>
                    {
                      setLastName(event.target.value);      
                    }}
                  />
                </div>
  
  
                <div class="form-group">
                  <label>Customer Address</label>
                  <input  type="text" class="form-control" id="customeraddress" 
                   value={customeraddress}
                    onChange={(event) =>
                      {
                        setAddress(event.target.value);      
                      }}
                  />
                </div>
  
                <div class="form-group">
                  <label>Mobile</label>
                  <input type="text" class="form-control" id="mobile" 
                    value={mobile}
                  onChange={(event) =>
                    {
                      setMobile(event.target.value);      
                    }}
                  />
  
  
                </div>
                <div>
                <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
  
                <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
                </div>   
              </form>
            </div>
                  <br/>
  <table class="table table-dark" align="center">
    <thead>
      <tr>
        <th scope="col">Customer First Name</th>
        <th scope="col">Customer Last Name</th>
        <th scope="col">Customer Address</th>
        <th scope="col">Customer Mobile</th>
        
        <th scope="col">Option</th>
      </tr>
    </thead>
         {customers.map(function fn(customers)
         {
              return(
              <tbody>
                  <tr>
                  <td>{customers.customerfirstname}</td>
                  <td>{customers.customerlastname}</td>
                  <td>{customers.customeraddress}</td>
                  <td>{customers.mobile}</td>        
                  <td>
                      <button type="button" class="btn btn-warning"  onClick={() => editCustomer(customers)} >Edit</button>  
                      <button type="button" class="btn btn-danger" onClick={() => DeleteCustomer(customers._id)}>Delete</button>
                  </td>
                  </tr>
              </tbody>
              );
              })}
              </table>
         </div>
              );
          }
    
export default UserDetails;
  
import axios from "axios";
import "../pages/Delivery.css";
import React, { useEffect, useState } from "react";

function Delivery() {
    const [deliveryid, setId] = useState('');
    const [delivername, setName] = useState("");
    const [deliverphone, setPhone] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

   
    async function Load() {
        const result = await axios.get("http://localhost:8080/api/v1/delivery/getperson");
        setUsers(result.data);
        console.log(result.data);
    }

    // POST
    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/delivery/saveperson", {
                delivername,
                deliverphone,
               
            });
            alert(" Details submitted successfully");
            resetForm();
            Load();
        } catch (err) {
            alert("Submission failed");
        }
    }

    // Edit
    async function editDelivery(delivery) {
        setName(delivery.delivername);
        setPhone(delivery.deliverphone);
       
    }

    // DELETE
    async function DeleteDelivery(deliveryid) {
        await axios.delete(`http://localhost:8080/api/v1/delivery/deleteperson/${deliveryid}`);
        alert("Details deleted successfully");
        Load();
    }

    // PUT
    async function update(event) {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/delivery/updateperson/${deliveryid}`, {
                delivername,
                deliverphone,
            });
            alert("Details updated");
            resetForm();
            Load();
        } catch (err) {
            alert("Update failed");
        }
    }

    // Reset form
    function resetForm() {
        setId("");
        setName("");
        setPhone("");
       
    }

    // DESIGN
    return (
        <div>
         

            <h1>Delivery Person Details</h1>
            <div className="container mt-4">
                <form>
                    <div className="form-group">
                        <label>Delivery person's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={delivername}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={deliverphone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>

                 

                    <div>
                        <button className="btn btn-primary mt-4" onClick={save}>Submit</button>
                        <button className="btn btn-warning mt-4" onClick={update}>Update</button>
                    </div>
                </form>
            </div>
            <br />

            <table className="table table-light" align="center">
                <thead>
                    <tr>
                        <th>Recipient's Name</th>
                        <th>Recipient Phone</th>
                       
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((delivery) => (
                        <tr key={delivery._id}>
                            <td>{delivery.delivername}</td>
                            <td>{delivery.deliverphone}</td>
                            
                            <td>
                                <button className="btn btn-warning" onClick={() => editDelivery(delivery)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => DeleteDelivery(delivery._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Delivery;

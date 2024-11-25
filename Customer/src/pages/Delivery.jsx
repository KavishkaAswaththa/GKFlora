import axios from "axios";
import "../pages/Delivery.css";
import React, { useEffect, useState } from "react";

function Delivery() {
    const [deliveryid, setId] = useState('');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [users, setUsers] = useState([]);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");


    useEffect(() => {
        (async () => await Load())();
    }, []);

   
    async function Load() {
        const result = await axios.get("http://localhost:8080/api/v1/delivery/getall");
        setUsers(result.data);
        console.log(result.data);
    }

    // POST
    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/delivery/save", {
                name,
                phone,
                address,
                city,
                deliveryDate,
                deliveryTime
            });
            alert("Recipient Details submitted successfully");
            resetForm();
            Load();
        } catch (err) {
            alert("Submission failed");
        }
    }

    // Edit
    async function editDelivery(delivery) {
        setName(delivery.name);
        setPhone(delivery.phone);
        setAddress(delivery.address);
        setId(delivery._id);
        setCity(delivery.city);
        setDeliveryDate(delivery.deliveryDate);
        setDeliveryTime(delivery.deliveryTime);
    }

    // DELETE
    async function DeleteDelivery(deliveryid) {
        await axios.delete("http://localhost:8080/api/v1/delivery/delete/" + deliveryid);
        alert("Details deleted successfully");
        Load();
    }

    // PUT
    async function update(event) {
        event.preventDefault();
        try {
            await axios.put("http://localhost:8080/api/v1/delivery/edit/" + deliveryid, {
                name,
                phone,
                address,
                city,
                deliveryDate,
                deliveryTime
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
        setAddress("");
        setCity("");
        setDeliveryDate("");
        setDeliveryTime("");
    }

    // DESIGN
    return (
        <div>
         

            <h1>Delivery Address</h1>
            <div className="container mt-4">
                <form>
                    <div className="form-group">
                        <label>Recipient's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="recipientname"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Recipient's Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="recipientphone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Delivery Address</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Delivery City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </div>

     

                    <div className="form-group">
                        <label>Delivery Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="deliveryDate"
                            value={deliveryDate}
                            onChange={(event) => setDeliveryDate(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Delivery Time</label>
                        <input
                            type="time"
                            className="form-control"
                            id="deliveryTime"
                            value={deliveryTime}
                            onChange={(event) => setDeliveryTime(event.target.value)}
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
                        <th>Delivery Address</th>
                        <th>Delivery City</th>
                        <th>Delivery Date</th>
                        <th>Delivery Time</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((delivery) => (
                        <tr key={delivery._id}>
                            <td>{delivery.name}</td>
                            <td>{delivery.phone}</td>
                            <td>{delivery.address}</td>
                            <td>{delivery.city}</td>
                            <td>{delivery.deliveryDate}</td>
                            <td>{delivery.deliveryTime}</td>
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

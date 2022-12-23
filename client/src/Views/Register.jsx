import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";

export default function Register() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [direccion, setDireccion] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/register",
                { name, lastName, username, direccion, password },
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.status);
            if (response.status === 200) {
                navigate('/');
                window.location.reload();
            }
        } catch (err) {
            if (!err?.response) {
                console.log({"error": "No server response"});
            } else if (err.response?.status === 409) {
                console.log({"error": "Username Taken"});
            } else {
                console.log({"error": "Registration failed"});
            }
        }
    };
    return (
        <MDBContainer className="mt-5" style={{width: "65%", margin: "auto"}}>
            <h1 className="mb-5">Registro de usuario</h1>
        <form onSubmit={handleSubmit}>
            <MDBRow className="mb-4">
            <MDBCol>
                <MDBInput id="name" label="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </MDBCol>
            <MDBCol>
                <MDBInput id="lastName" label="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </MDBCol>
            </MDBRow>
            <MDBInput
            className="mb-4"
            type=""
            id="username"
            label="username"
            value={username} onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
            className="mb-4"
            type=""
            id="direccion"
            label="dirección"
            value={direccion} onChange={(e) => setDireccion(e.target.value)}
            />
            <MDBInput
            className="mb-4"
            type="password"
            id="password"
            label="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn type="submit" className="mb-4" color="info" block>
            Registrar
            </MDBBtn>

            <div className="text-center">
            <p>
                Ya eres usuario? <a href="/" className="link-info">Login</a>
            </p>

            </div>
        </form>
        </MDBContainer>
    );
}

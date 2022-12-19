import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Navbar({ data }) {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
        const { data: response } = await axios.get(
            "http://localhost:8000/api/logout",
            {
            withCredentials: true,
            }
        );
        console.log(response);
        navigate("/logout");
        } catch (e) {}
    };
    return (
        <MDBNavbar className="p-3 bg-success bg-gradient text-white">
            <MDBContainer fluid>
                <MDBNavbarBrand className="text-white">Bienvenido, {data.name}!</MDBNavbarBrand>
                <MDBBtn color='warning' className="mx-1" onClick={handleLogOut}>Cerrar Sesión</MDBBtn>
            </MDBContainer>
        </MDBNavbar>
    );
}

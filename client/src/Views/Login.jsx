import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  // MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { username, password }, 
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        navigate('/home');
        window.location.reload();
      }
    } catch (e) {
      alert("inicio de sesion erroneo")
      console.error("error",e);
    }
  };
  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6' className="">

          <div className='d-flex flex-row ps-5 pt-5'>
            <span className="h1 fw-bold mb-0">E-commerce</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='formControlLg' size="lg" value={username} onChange={(e) => setUsername(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)}/>

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type="submit">Login</MDBBtn>
            </form>
            {/* <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Olvidaste la contraseña?</a></p> */}
            <p className='ms-5'>No tienes una cuenta creada? <a href="/register" class="link-info">Registrate!</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Barricas_Vino_Bodegas_Casajus_Ribera_del_Duero.jpg" alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left', maxHeight: '100vh'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
};

export default Login;

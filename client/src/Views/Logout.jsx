import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBSpinner, MDBTypography } from 'mdb-react-ui-kit';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <>
      <MDBContainer className="p-0 d-flex align-items-center justify-content-center" style={{height:"100vh"}} fluid>
        <MDBTypography variant='h3'>Cerrando sesión...</MDBTypography>
        <MDBSpinner role='status' className='mx-1' color='danger'>
            <span className='visually-hidden'>  Loading...</span>
        </MDBSpinner>
      </MDBContainer>
      </>

  )
};

export default Logout;

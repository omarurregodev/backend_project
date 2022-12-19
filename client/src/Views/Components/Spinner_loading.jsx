import React from 'react';
import { MDBSpinner, MDBTypography } from 'mdb-react-ui-kit';

export default function SpinnerLoading() {
  return (
    <>
        <MDBTypography variant='h3'>Iniciando...</MDBTypography>
        <MDBSpinner role='status' className='mx-2' color='info'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    </>
  );
}
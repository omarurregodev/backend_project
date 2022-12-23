import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import AddProductContainer from './AddProductContainer';
import ProdsContainer from './ProdsContainer';

function ProductContainer() {

    return (
        <MDBContainer className='p-5 border rounded bg-secondary shadow-5'>
            <h1 className='fs-1 text-white'>Productos</h1>
            <AddProductContainer></AddProductContainer>
            <br /><br /> <hr />
            <ProdsContainer></ProdsContainer>
        </MDBContainer>
    );
}

export default ProductContainer;
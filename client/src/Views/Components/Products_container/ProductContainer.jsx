import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import AddProductComponent from './AddProductComponent';
import ProductsComponent from './ProductsComponent';

function ProductContainer() {

    return (
        <MDBContainer className='p-5 border rounded bg-secondary shadow-5'>
            <h1 className='fs-1 text-white'>Productos</h1>
            <AddProductComponent></AddProductComponent>
            <br /><br /> <hr />
            <ProductsComponent></ProductsComponent>
        </MDBContainer>
    );
}

export default ProductContainer;
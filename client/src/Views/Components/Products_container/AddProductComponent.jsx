import { MDBContainer, MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import axios from "axios";

function AddProductComponent(props) {

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState();
    const [thumbnail, setThumbnail] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(productName, price, thumbnail);
            const response = await axios.post(
                "http://localhost:8000/api/addProduct",
                { productName, price, thumbnail},
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <MDBContainer>
        <h3 className="fs-3 text-primary">Agregar nuevo producto</h3>
        <form onSubmit={handleSubmit}>
            <MDBInputGroup
                className="mb-3 w-50"
                noBorder
                textBefore="Nombre del producto:"
            >
                <input
                className="form-control"
                type="text"
                placeholder="Ejemplo: Taza"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required/>
            </MDBInputGroup>
            <MDBInputGroup
                className="mb-3 w-50"
                noBorder
                textBefore="Precio del producto:"
            >
                <input
                className="form-control"
                type="number"
                placeholder="Ejemplo: 20"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required/>
            </MDBInputGroup>
            <MDBInputGroup
                className="mb-3 w-50"
                noBorder
                textBefore="Url Imagen del producto:"
            >
                <input
                className="form-control"
                type="url"
                placeholder="Ejemplo: http://www.imagenes.com/taza"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                required/>
            </MDBInputGroup>
            <MDBBtn type="submit" className="btn-primary">
                + Add Producto
            </MDBBtn>
        </form>
        </MDBContainer>
    );
}

export default AddProductComponent;

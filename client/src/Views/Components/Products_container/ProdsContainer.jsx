import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer, MDBTableBody, MDBTable, MDBTableHead } from "mdb-react-ui-kit";

function ProdsContainer() {
  const [noProd, setNoProd] = useState();
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const fetchProd = async () => {
      setNoProd(true);
      try {
        const response = await axios.get("http://localhost:8000/api/getProd", {
          withCredentials: true,
        });
        if (response.data.length > 0) {
          setProds(response.data);
          setNoProd(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProd();
  }, []);

  return (
    <MDBContainer>
      {noProd ? (
        <>
          <h1>No hay productos agregados.</h1>
        </>
      ) : (
        <MDBTable className="w-50 text-center">
          <MDBTableHead className="bg-primary text-white text-bold">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Thumbnail</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {prods.map((data) => 
            <tr key={data._id} className="text-white">
              <td>{data.title}</td>
              <td>{data.price}</td>
              <td><img
                src={data.thumbnail}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /></td>
            </tr> )}
          </MDBTableBody>
        </MDBTable>
      )}
    </MDBContainer>
  );
}

export default ProdsContainer;

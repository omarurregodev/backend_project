import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar.jsx";
import SpinnerLoading from "./Components/Spinner_loading.jsx";
import { MDBContainer } from 'mdb-react-ui-kit';
export const Home = () => {

  const [username, setUsername] = useState();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:8000/api/user",
          {
            withCredentials: true
          }
        );
        console.log("respuesta", response.name.user);
        setUsername(response.name.user);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <MDBContainer className="p-0 d-flex align-items-center justify-content-center" style={{height:"100vh"}} fluid>
            <SpinnerLoading></SpinnerLoading>
          </MDBContainer>
        </>
        ) : (
        <>
          <MDBContainer className="p-0" fluid>
            <Navbar data={{name: username}}></Navbar>
          </MDBContainer>
        </>
      )}
    </div>
  );
};

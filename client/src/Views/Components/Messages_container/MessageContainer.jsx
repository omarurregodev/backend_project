import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import ChatViewComponent from './ChatViewComponent';
import ChatMsgComponent from './ChatMsgComponent';
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");

function MessageContainer() {

    return (
        <MDBContainer className='p-5 border rounded bg-secondary shadow-5'>
            <h1 className='fs-1 text-white'>Mensajes</h1>
            <ChatViewComponent></ChatViewComponent>
            <br /><br /> <hr />
            <ChatMsgComponent></ChatMsgComponent>
        </MDBContainer>
    );
}

export default MessageContainer;
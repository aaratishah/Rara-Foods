import socketIOClient from 'socket.io-client';
import React, {createContext, useEffect, useState} from 'react';
import {JwtService} from 'services/jwtService';
// Create Context Object
export const SocketContext = createContext(); // this should be imported

// Create a provider for components to consume and subscribe to changes
export const SocketProvider = (props) => {
    const [socket, setSocket] = useState(false);
    const token = JwtService.getAccessToken()
    useEffect(() => {
        if(token){
            const tempSocket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT, {
                transports: ['websocket'],
                query: `token=${token}`,
                upgrade: false,
            });
            setSocket(tempSocket);
        }
    }, [token]);

    return (
      <SocketContext.Provider value={{ socket }}>
        {props.children}
      </SocketContext.Provider>
    );
};

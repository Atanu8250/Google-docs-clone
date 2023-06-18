import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocketConnection = (serverUrl) => {
     const socketRef = useRef(null);

     useEffect(() => {
          if (!socketRef.current) {
               socketRef.current = io(serverUrl);
          }

          return () => {
               if (socketRef.current) {
                    socketRef.current.disconnect();
                    socketRef.current = null;
               }
          };
     }, [serverUrl]);

     return socketRef.current;
};

export default useSocketConnection;

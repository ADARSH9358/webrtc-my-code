import React, { useCallback, useEffect,useState } from 'react'
import ReactPlayer from "react-player";
import { useSocket } from '../context/SocketProvider'
const Abc = () => {
    const socket =useSocket();
    const [remote,setremote] = useState(null);
    const [mystream ,setstream]=useState()
    const handleUserJoin =useCallback(({email,id})=>{
        console.log("new user joined"+email,id);
        // console.log("erase it");
        setremote(id);
        console.log(id);
    },[])

    const handleCall=useCallback(async()=>{
      const stream=await navigator.mediaDevices.getUserMedia({
        audio: true,
        video:true,
      });
      setstream(stream);
      console.log(`this is my stream ${mystream}`)
    },[])

    

    useEffect(()=>{
        socket.on("user:joined", handleUserJoin);
        return ()=>{
            socket.off("user:joined", handleUserJoin);
        }
    },[socket,handleUserJoin]);
  return (
    <div>
      <h1>it is the page of abc</h1>
    <h3>{remote ? ("connected"  ): "not user present"}</h3>
    <div>{
         <button onClick={handleCall}>Call</button> 
    }</div>
    <div>
     { mystream &&
      <>
       <h1>My Stream</h1>
       <ReactPlayer
         playing
         muted
         height="200px"
         width="300px"
         url={mystream}
       />
       </>
     }
   </div>
     </div>
  )
}

export default Abc






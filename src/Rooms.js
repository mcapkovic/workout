import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";


// /users/joe/workouts/RT44V08pwuiKIQswJuNe/history/9LefO67bEi6JNQVmGc0s

function Rooms(props){
    const { auth, firestore, firebase } = React.useContext(FirebaseContext);


  const historyRef = firestore.collection("users/joe/workouts/RT44V08pwuiKIQswJuNe/history");
  const query = historyRef.orderBy("createdAt", "asc").limitToLast(25);

  const [data = []] = useCollectionData(query, { idField: "id" });
  console.log(data);

    return <div>
        <div>data</div>
        <div>chat</div>
        <Chat />
    </div>
}

export default Rooms;
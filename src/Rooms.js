import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function RoomItem(props) {
  const { item, setRoom } = props;
  return <button onClick={() => setRoom(item)}>{item.roomName}</button>;
}

function RoomsManager(props) {
  const { setRoom , rooms} = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;

  const [newRoomName, setNewRoomName] = React.useState("");
  const roomsRef = firestore.collection(`rooms`);

  async function createRoom() {
    await roomsRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      type: "pushUp",
      roomName: newRoomName,
      members: [uid]
    });
    setNewRoomName("");
  }


  return (
    <div>
      <div>
        {rooms &&
          rooms.length > 0 &&
          rooms.map((item) => <RoomItem item={item} setRoom={setRoom} />)}
      </div>
      <input
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
      />
      <button disabled={!newRoomName} onClick={createRoom}>
        create room
      </button>
    </div>
  );
}

function Room(props){
  const {setRoom, room} = props;
  return<div>{room.id}<button onClick={()=> setRoom(null)}>close</button></div>
}

function Rooms(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [room, setRoom] = React.useState(null);
  const { uid, photoURL } = auth.currentUser;

  const roomsRef = firestore.collection(`rooms`);

  const query = roomsRef.where("members", "array-contains", uid);

  const [rooms = []] = useCollectionData(query, { idField: "id" });

  return (
    <div>
      {!room && <RoomsManager rooms={rooms} setRoom={setRoom} />}
      {room && <Room room={room} setRoom={setRoom} />}

      {/* <Chat /> */}
    </div>
  );
}

export default Rooms;

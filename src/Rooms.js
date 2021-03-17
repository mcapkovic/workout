import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { Button, TextBox, Separator } from "./common";
import Room from './Room';

function RoomItem(props) {
  const { item, setRoom, index } = props;
  return (
    <div className="workout-item">
      <div className="workout-item__name">
        <span className="workout-item__name__index">{index + 1}.</span>{" "}
        {item.roomName}
      </div>
      <div className="workout-item__buttons">
        <Button onClick={() => setRoom(item)}>More details</Button>
      </div>
    </div>
  );

  return <button onClick={() => setRoom(item)}>{item.roomName}</button>;
}

function RoomsManager(props) {
  const { setRoom, rooms } = props;
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
      members: [uid],
    });
    setNewRoomName("");
  }

  return (
    <div className="workouts">
      <Separator horizontal />
      <div className="workouts__selection">
        <h2>Rooms</h2>
        {rooms &&
          rooms.length > 0 &&
          rooms.map((item, index) => (
            <RoomItem item={item} setRoom={setRoom} index={index} />
          ))}
      </div>

      <Separator horizontal />
      <h2> Create new Room</h2>

      <div>
        <TextBox
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <Button disabled={!newRoomName} onClick={createRoom}>
          Create room
        </Button>
      </div>
      <Separator horizontal />
    </div>
  );
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

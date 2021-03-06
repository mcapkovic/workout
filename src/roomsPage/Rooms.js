import React from "react";
import { motion } from "framer-motion";
import { FirebaseContext, AppContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { Button, TextBox, Separator } from "../common";
import Room from "./Room";
import { listMotion } from "../common/motion";

function RoomItem(props) {
  const { item, setRoom, index } = props;
  return (
    <div className="workout-item">
      <div className="workout-item__name">{item.roomName}</div>
      <div className="workout-item__name-copy">{item.roomName}</div>

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
      roomName: newRoomName,
      members: [uid],
    });
    setNewRoomName("");
  }

  return (
    <div className="rooms">
      <div className="rooms__selection">
        {rooms && rooms.length > 0 && (
          <>
            <motion.div
              variants={listMotion.listVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.2 }}
            >
              {rooms.map((item, index) => (
                <motion.div key={index} variants={listMotion.listItemVariants}>
                  <RoomItem item={item} setRoom={setRoom} index={index} />
                </motion.div>
              ))}
            </motion.div>
            <Separator horizontal />
          </>
        )}
      </div>

      <h2> Create new Room</h2>

      <div className="rooms__new-user">
        <TextBox
          className="rooms__new-user__input"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <Button disabled={!newRoomName} onClick={createRoom}>
          Create room
        </Button>
      </div>
    </div>
  );
}

function Rooms(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [room, setRoom] = React.useState(null);
  const { uid, photoURL } = auth.currentUser;
  const [appState = {}, setAppState] = React.useContext(AppContext);

  const roomsRef = firestore.collection(`rooms`);
  const query = roomsRef.where("members", "array-contains", uid);
  const [rooms = []] = useCollectionData(query, { idField: "id" });

  React.useEffect(() => {
    if (!room)
      setAppState({
        ...appState,
        appBarData: { hideStart: true, title: "Rooms" },
      });

    if (room)
      setAppState({
        ...appState,
        appBarData: { hideStart: false, title: "Room" },
      });
  }, [room]);

  return (
    <div>
      {!room && <RoomsManager rooms={rooms} setRoom={setRoom} />}
      {room && <Room room={room} setRoom={setRoom} />}

      {/* <Chat /> */}
    </div>
  );
}

export default Rooms;

import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function RoomItem(props) {
  const { item, setRoom } = props;
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

function Row(props) {
  const { createdAt, count, workoutId } = props.item;
  let date = undefined;
  if (createdAt && "seconds" in createdAt)
    date = new Date(createdAt.seconds * 1000);
  const dateString = date ? date.toLocaleDateString() : "";
  const timeString = date ? date.toLocaleTimeString() : "";
  return (
    <tr>
      <th>{workoutId}</th>
      <th>{dateString}</th>
      <th>{timeString}</th>
      <th>{count}</th>
    </tr>
  );
}
function Table(props) {
  const { data } = props;
  return (
    <div style={{ margin: "10px" }}>
      <table>
        <tbody>
          {data.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Room(props) {
  const { setRoom, room } = props;
  const { workoutIds = [] } = room;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  const [workouts, setwWorkouts] = React.useState(null);

  React.useEffect(() => {
    async function getDate() {
      const data = [];

      const queries = workoutIds.map((id) =>
        firestore
          .collectionGroup("workoutsHistory")
          .where("workoutId", "==", id)
      );

      const rawResults = await Promise.all(queries.map((q) => q.get()));

      const results = rawResults.map((querySnapshot2) => {
        const items = [];
        querySnapshot2.forEach((doc) => items.push(doc.data()));
        return items;
      });

      setwWorkouts(results);
    }

    getDate();
  }, []);

  return (
    <div>
      roomID: {room.id}
      <hr />
      workoutIds
      {workoutIds.map((workout) => (
        <div>{workout}</div>
      ))}
      <hr />
      {workouts && workouts.map((workout) => <Table data={workout} />)}
      <br />
      <button onClick={() => setRoom(null)}>close</button>
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

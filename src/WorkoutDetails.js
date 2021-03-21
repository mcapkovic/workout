import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextBox, Separator, BarChart, DeleteButton } from "./common";
import PushUpCounter from "./PushUpCounter";
import {
  DEFAULT_SUB_PAGE,
  WORKOUT_SUB_PAGE,
  DETAILS_SUB_PAGE,
} from "./utils/constants";
import useSingleBarData from "./hooks/useSingleBarData";

function RoomsManager(props) {
  const { workoutId, setIsDeletable } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;
  const [roomId, setRoomId] = React.useState("");

  const myRoomsRef = firestore.collection(`rooms`);
  const query = myRoomsRef.where("workoutIds", "array-contains", workoutId);
  const [myRooms = []] = useCollectionData(query, { idField: "id" });

  const roomRef = roomId && firestore.collection(`rooms`).doc(roomId.trim());

  async function updateRoom() {
    await roomRef.update({
      uid,
      workoutIds: firebase.firestore.FieldValue.arrayUnion(workoutId),
      members: firebase.firestore.FieldValue.arrayUnion(uid),
    });
    setRoomId("");
  }

  React.useEffect(() => {
    if (myRooms.length === 0) setIsDeletable(true);
    if (myRooms.length > 0) setIsDeletable(false);
  }, [myRooms]);

  return (
    <div>
      <div>paste room id to join a room</div>
      <TextBox value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <Button disabled={!roomId} onClick={updateRoom}>
        Join room
      </Button>
      <h2>Joined rooms:</h2>
      <div>
        {myRooms.length > 0 && myRooms.map((room) => <div>{room.id}</div>)}
      </div>
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
      {/* <th>{workoutId}</th> */}
      <th>{dateString}</th>
      <th>{timeString}</th>
      <th>{count}</th>
    </tr>
  );
}

function Table(props) {
  const { data } = props;
  return (
    <table>
      <tbody>
        {data.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}

function BackButton(props) {
  const headerStart = React.useRef(document.querySelector("#header-start"));
  return ReactDOM.createPortal(
    <Button
      className="header-start-button"
      onClick={() => props.setSubPage(DEFAULT_SUB_PAGE)}
    >
      Back
    </Button>,
    headerStart.current
  );
}

function WorkoutDetails(props) {
  const { workout = {}, setSubPage } = props;
  const { auth, firestore } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;
  const [isDeletable, setIsDeletable] = React.useState(false);
  // const workoutsRef = firestore.collection(`users/${uid}/workouts/${workout.id}`);

  async function deleteWorkout() {
    await firestore
      .collection(`users/${uid}/workouts`)
      .doc(workout.id)
      .delete({ uid });
    setSubPage(DEFAULT_SUB_PAGE);
  }
  console.log(workout);

  const historyRef = firestore.collection(
    `workoutsHistory/${workout.id}/workoutEntries`
  );

  // const historyRef = firestore.collection(`users/${uid}/workoutsHistory`);
  const query = historyRef.orderBy("createdAt", "asc").limitToLast(25);

  const [data = []] = useCollectionData(query, { idField: "id" });
  console.log(data);

  const datePeriod = React.useMemo(() => {
    return Array.from({ length: 7 }, (v, i) =>
      moment()
        .subtract(7 - i - 1, "days")
        .format("MMM Do")
    );
  }, []);

  const barData = useSingleBarData(datePeriod, data);
  console.log("barData", barData);

  return (
    <div>
      <BackButton setSubPage={setSubPage} />
      <h1>Info</h1>
      <div>workout name: {workout.name}</div>
      <div>workout id: {workout.id}</div>
      {/* <div>category: {workout.template}</div> */}

      <Separator horizontal />

      <h1>History</h1>
      {/* {data.length > 0 && <Table data={data} />} */}
      <div style={{ height: "300px" }}>
        <BarChart
          data={barData}
          indexBy="date"
          keys={["count"]}
          colors={{ scheme: "pastel2" }}
          margin={{ top: 10, right: 60, bottom: 50, left: 60 }}
        />
      </div>
      <Separator horizontal />

      <h1>Rooms</h1>
      {workout.id !== -1 && (
        <RoomsManager setIsDeletable={setIsDeletable} workoutId={workout.id} />
      )}

      <Separator horizontal />

      <h1>Danger zone</h1>
      <DeleteButton
        buttonText="Delete workout"
        onClick={deleteWorkout}
        disabled={!isDeletable}
      />
      {!isDeletable && (
        <div> delete is disabled because this workout is part of a room</div>
      )}
    </div>
  );
}

export default WorkoutDetails;

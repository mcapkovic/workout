import React from "react";
import ReactDOM from "react-dom";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextBox, Separator } from "./common";
import PushUpCounter from "./PushUpCounter";
import {
  DEFAULT_SUB_PAGE,
  WORKOUT_SUB_PAGE,
  DETAILS_SUB_PAGE,
} from "./utils/constants";

function PushUpPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [workout, setWorkout] = React.useState(null);
  const { uid, photoURL } = auth.currentUser;

  const workoutsRef = firestore.collection(`users/${uid}/workouts`);
  const query = workoutsRef.orderBy("createdAt", "asc").limitToLast(25);
  const [workouts = []] = useCollectionData(query, { idField: "id" });

  const [subPage, setSubPage] = React.useState(DEFAULT_SUB_PAGE);

  return (
    <>
      {(!workout || subPage === DEFAULT_SUB_PAGE) && (
        <WorkoutsManager
          workouts={workouts}
          setWorkout={setWorkout}
          setSubPage={setSubPage}
        />
      )}
      {workout && subPage === WORKOUT_SUB_PAGE && (
        <PushUpCounter
          workout={workout}
          setWorkout={setWorkout}
          setSubPage={setSubPage}
        />
      )}
      {workout && subPage === DETAILS_SUB_PAGE && (
        <WrokoutDetails workout={workout} setSubPage={setSubPage} />
      )}
    </>
  );
}
export default PushUpPage;

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
    <Button className='back-button' onClick={() => props.setSubPage(DEFAULT_SUB_PAGE)}>Back</Button>,
    headerStart.current
  );
}

function WrokoutDetails(props) {
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
  return (
    <div>
      <BackButton setSubPage={setSubPage} />
      <Separator horizontal />

      <h1>Info</h1>
      <div>workout name: {workout.name}</div>
      <div>workout id: {workout.id}</div>
      {/* <div>category: {workout.template}</div> */}

      <Separator horizontal />

      <Button disabled={!isDeletable} onClick={deleteWorkout}>
        Delete workout
      </Button>
      {!isDeletable && (
        <div> delete is disabled because this workout is part of a room</div>
      )}

      <Separator horizontal />

      <h1>History</h1>
      {data.length > 0 && <Table data={data} />}

      <Separator horizontal />

      <h1>Rooms</h1>
      {workout.id !== -1 && (
        <RoomsManager setIsDeletable={setIsDeletable} workoutId={workout.id} />
      )}
    </div>
  );
}

function WorkoutItem(props) {
  const { item = {}, setWorkout, setSubPage, className, index } = props;
  const { id, name } = item;

  return (
    <div className="workout-item">
      <div className="workout-item__name">
        <span className="workout-item__name__index">{index + 1}.</span> {name}
      </div>
      <div className="workout-item__buttons">
        <Button
          onClick={() => {
            setWorkout(item);
            setSubPage(WORKOUT_SUB_PAGE);
          }}
        >
          Start
        </Button>

        <Button
          onClick={() => {
            setWorkout(item);
            setSubPage(DETAILS_SUB_PAGE);
          }}
        >
          More details
        </Button>
      </div>
    </div>
  );
}

function WorkoutsManager(props) {
  const { setWorkout, workouts, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;
  const [newWorkoutName, setNewWorkoutName] = React.useState("");
  const workoutsRef = firestore.collection(`users/${uid}/workouts`);

  async function createWorkout() {
    await workoutsRef.add({
      template: "pushUp",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: newWorkoutName,
      uid,
    });
    setNewWorkoutName("");
  }

  return (
    <div className="workouts">
      <Separator horizontal />
      <div className="workouts__selection">
        <h2>List of workouts</h2>
        {workouts.length > 0 &&
          workouts.map((item, index) => (
            <WorkoutItem
              setWorkout={setWorkout}
              item={item}
              setSubPage={setSubPage}
              index={index}
            />
          ))}
      </div>

      <Separator horizontal />
      <h2> Create new workout</h2>

      <div>
        <TextBox
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
        />
        <Button disabled={!newWorkoutName} onClick={createWorkout}>
          Add
        </Button>
      </div>
      <Separator horizontal />
    </div>
  );
}

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

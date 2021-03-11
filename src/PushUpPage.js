import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DEFAULT_SUB_PAGE = "default-sub-page";
const WORKOUT_SUB_PAGE = "workout-sub-page";
const DETAILS_SUB_PAGE = "details-sub-page";

function PushUpPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [workout, setWorkout] = React.useState(null);
  const { uid, photoURL } = auth.currentUser;

  const workoutsRef = firestore.collection(`users/${uid}/workouts`);
  const query = workoutsRef.orderBy("createdAt", "asc").limitToLast(25);
  const [workouts = []] = useCollectionData(query, { idField: "id" });

  const [subPage, setSubPage] = React.useState(DEFAULT_SUB_PAGE);

  return (
    <div>
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
    </div>
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
    <table>
      <tbody>
        {data.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}

function WrokoutDetails(props) {
  const { workout = {}, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;
  // const workoutsRef = firestore.collection(`users/${uid}/workouts/${workout.id}`);

  async function deleteWorkout() {
    await firestore.collection(`users/${uid}/workouts`).doc(workout.id).delete({uid});
    setSubPage(DEFAULT_SUB_PAGE)
  }
  console.log(workout);

  // const historyRef = firestore.collection("pushUp");
  const historyRef = firestore.collection(`users/${uid}/workoutsHistory`);
  const query = historyRef.orderBy("createdAt", "asc").limitToLast(25);
  const [data = []] = useCollectionData(query, { idField: "id" });
console.log(data)
  return (
    <div>
      <div>name: {workout.name}</div>
      <div>workout id: {workout.id}</div>
      <div>category: {workout.template}</div>

      <br />
      <button onClick={deleteWorkout }>remove workout</button>

      <button onClick={() => setSubPage(DEFAULT_SUB_PAGE)}>cancel</button>


      <hr />

      {data.length > 1 && <Table data={data}/>}

      <hr/>

      {workout.id !== -1 && <RoomsManager workoutId={workout.id} />}

    </div>
  );
}

function WorkoutItem(props) {
  const { item = {}, setWorkout, setSubPage } = props;
  const { id, name } = item;
  console.log("item", props.item);
  return (
    <div style={{ margin: "20px", border: "1px solid white" }}>
      <div>
        {name} <br />
        {id}
      </div>
      <div>
        <button
          onClick={() => {
            setWorkout(item);
            setSubPage(WORKOUT_SUB_PAGE);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            setWorkout(item);
            setSubPage(DETAILS_SUB_PAGE);
          }}
        >
          details
        </button>
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
    <div>
      <div
        style={{
          maxHeight: "600px",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {workouts.length > 0 &&
          workouts.map((item) => (
            <WorkoutItem
              setWorkout={setWorkout}
              item={item}
              setSubPage={setSubPage}
            />
          ))}
      </div>
      <hr />
      <div>
        <input
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
        />
        <button disabled={!newWorkoutName} onClick={createWorkout}>
          create new workout
        </button>
      </div>
    </div>
  );
}

function RoomsManager(props) {
  const { workoutId } = props;
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

  return (
    <div>
      <div>
        {myRooms.length > 0 && myRooms.map((room) => <div>{room.id}</div>)}
      </div>
      Room ID
      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button disabled={!roomId} onClick={updateRoom}>
        join room
      </button>
    </div>
  );
}

function PushUpCounter(props) {
  const { workout, setWorkout, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);

  const { uid, photoURL } = auth.currentUser;

  const workoutId = workout ? workout.id : -1;
  const pushUp2Ref = firestore.collection(`users/${uid}/workoutsHistory`);

  function changeCount(value) {
    let newValue = count + value;
    if (newValue < 0) newValue = 0;
    setCount(newValue);
  }

  async function saveCount2() {
    console.log(count);

    await pushUp2Ref.add({
      count,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      workoutId,
    });
    setCount(0);
    setWorkout(null);
  }

  return (
    <div>
      {workoutId}
      <div style={{ color: "white" }}> {count}</div>

      <button onClick={() => changeCount(-1)}>-1</button>
      <button onClick={() => changeCount(1)}>+1</button>
      <button onClick={() => changeCount(-5)}>-5</button>
      <button onClick={() => changeCount(5)}>+5</button>
      <button onClick={() => changeCount(-10)}>-10</button>
      <button onClick={() => changeCount(10)}>+10</button>
      <br />
      <button disabled={!workout || !count} onClick={saveCount2}>
        save2
      </button>
      <button onClick={() => setSubPage(DEFAULT_SUB_PAGE)}>cancel</button>

    </div>
  );
}

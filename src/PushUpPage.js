import React, { useRef, useState } from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";

function PushUpPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);

  const [workout, setWorkout] = React.useState(null);

  const pushUpRef = firestore.collection("pushUp");
  const { uid, photoURL } = auth.currentUser;

  const workoutId = "1l1oXP6osY0YYGaQd7zu";
  const pushUp2Ref = firestore.collection(
    `users/${uid}/workouts/${workoutId}/history`
  );

  const workoutsRef = firestore.collection(`users/${uid}/workouts`);
  const query = workoutsRef.orderBy("createdAt", "asc").limitToLast(25);
  const [workouts = []] = useCollectionData(query, { idField: "id" });

  const pushUp3Ref = firestore.collection(`users/${uid}/workouts/`);

  function changeCount(value) {
    let newValue = count + value;
    if (newValue < 0) newValue = 0;
    setCount(newValue);
  }

  async function saveCount() {
    console.log(count);

    await pushUpRef.add({
      count,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      collection: "default",
    });
    setCount(0);
  }

  async function saveCount2() {
    console.log(count);

    await pushUp2Ref.add({
      count,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
    setCount(0);
  }

  return (
    <div>
      {!workout && (
        <WorkoutsManager workouts={workouts} setWorkout={setWorkout} />
      )}
      {workout && <PushUpCounter workout={workout} setWorkout={setWorkout} />}
    </div>
  );
}
export default PushUpPage;

function WorkoutItem(props) {
  const { item = {}, setWorkout } = props;
  const { id, name } = item;
  console.log("item", props.item);
  return (
    <div style={{margin: '20px', border: '1px solid white'}}>
      <div>
        {name} <br />
        {id}
      </div>
      <div>
        <button onClick={() => setWorkout(item)}>Add</button>
        <button>details</button>
      </div>
    </div>
  );
}

function WorkoutsManager(props) {
  const { setWorkout, workouts } = props;
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
      <div style={{ maxHeight: "600px", overflow: "auto", display:'flex', flexWrap: 'wrap' }}>
        {workouts.length > 0 &&
          workouts.map((item) => (
            <WorkoutItem setWorkout={setWorkout} item={item} />
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
  const { workout, setWorkout } = props;
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
      <button onClick={() => setWorkout(null)}>cancel</button>

      <hr />

      {workoutId !== -1 && <RoomsManager workoutId={workoutId} />}
    </div>
  );
}

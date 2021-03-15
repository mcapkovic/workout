import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {Button} from './common';

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
      
      <Button>asaf</Button>
      <br />
      <br />
      <Button>fadfada dfa</Button>
      <br />
      <br />
      <Button>fae faefaeaefaefa </Button>
      <br />
      <br />
      <Button>aef awefaw fafawf afawfawfw</Button>

      <br />
      <br />

      <br />

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
      <button onClick={() => setSubPage(DEFAULT_SUB_PAGE)}>go back</button>

      <h1>Info</h1>
      <div>workout name: {workout.name}</div>
      <div>workout id: {workout.id}</div>
      {/* <div>category: {workout.template}</div> */}

      <br />
      <button disabled={!isDeletable} onClick={deleteWorkout}>
        delete workout
      </button>
      {!isDeletable && (
        <div> delete is disabled because this workout is part of a room</div>
      )}

      <hr />

      <h1>History</h1>
      {data.length > 0 && <Table data={data} />}

      <hr />

      <h1>Rooms</h1>
      {workout.id !== -1 && (
        <RoomsManager setIsDeletable={setIsDeletable} workoutId={workout.id} />
      )}
    </div>
  );
}

function WorkoutItem(props) {
  const { item = {}, setWorkout, setSubPage, className } = props;
  const { id, name } = item;

  return (
    <div className="workout-item">
      <div>
        name: {name} <br />
        {/* id:{id} */}
      </div>
      <div>
        <button
          onClick={() => {
            setWorkout(item);
            setSubPage(WORKOUT_SUB_PAGE);
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            setWorkout(item);
            setSubPage(DETAILS_SUB_PAGE);
          }}
        >
          More info
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
    <div className="workouts">
      <div>
        <input
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
        />
        <button disabled={!newWorkoutName} onClick={createWorkout}>
          create new workout
        </button>
      </div>
      {/* <hr /> */}

      <div className="workouts__selection">
        {workouts.length > 0 &&
          workouts.map((item) => (
            <WorkoutItem
              setWorkout={setWorkout}
              item={item}
              setSubPage={setSubPage}
            />
          ))}
      </div>
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
      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button disabled={!roomId} onClick={updateRoom}>
        join room
      </button>
      <h2>Joined rooms:</h2>
      <div>
        {myRooms.length > 0 && myRooms.map((room) => <div>{room.id}</div>)}
      </div>
    </div>
  );
}

function PushUpCounter(props) {
  const { workout, setWorkout, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);

  const { uid, photoURL } = auth.currentUser;

  const workoutId = workout ? workout.id : -1;
  const pushUp2Ref = firestore.collection(
    `workoutsHistory/${workoutId}/workoutEntries`
  );

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
      <div> {count}</div>
      <div>
        <button onClick={() => changeCount(-1)}>-1</button>
        <button onClick={() => changeCount(1)}>+1</button>
      </div>

      <div>
        <button onClick={() => changeCount(-5)}>-5</button>
        <button onClick={() => changeCount(5)}>+5</button>
      </div>
      <div>
        <button onClick={() => changeCount(-10)}>-10</button>
        <button onClick={() => changeCount(10)}>+10</button>
      </div>

      <br />
      <button disabled={!workout || !count} onClick={saveCount2}>
        save
      </button>
      <button onClick={() => setSubPage(DEFAULT_SUB_PAGE)}>cancel</button>
    </div>
  );
}

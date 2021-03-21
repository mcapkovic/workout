import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextBox, Separator } from "./common";
import PushUpCounter from "./PushUpCounter";
import WorkoutDetails from "./WorkoutDetails";
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
        <>
          <Separator horizontal className="header-separator-dynamic" />
          <WorkoutsManager
            workouts={workouts}
            setWorkout={setWorkout}
            setSubPage={setSubPage}
          />
        </>
      )}
      {workout && subPage === WORKOUT_SUB_PAGE && (
        <>
          <Separator horizontal className="header-separator" />
          <PushUpCounter
            workout={workout}
            setWorkout={setWorkout}
            setSubPage={setSubPage}
          />
        </>
      )}
      {workout && subPage === DETAILS_SUB_PAGE && (
        <>
          <Separator horizontal className="header-separator" />
          <WorkoutDetails workout={workout} setSubPage={setSubPage} />
        </>
      )}
    </>
  );
}
export default PushUpPage;

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

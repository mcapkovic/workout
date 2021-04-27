import React from "react";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Separator } from "../common";
import Clicker from "./Clicker";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutsManager from "./WorkoutsManager";
import {
  DEFAULT_SUB_PAGE,
  WORKOUT_SUB_PAGE,
  DETAILS_SUB_PAGE,
  UNITS,
  defaultClickerAdditions,
} from "../utils/constants";
import useTodayHistory from "../hooks/useTodayHistory";

function WorkoutsPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [workout, setWorkout] = React.useState(null);
  const { uid, photoURL } = auth.currentUser;

  const workoutsRef = firestore.collection(`users/${uid}/workouts`);
  const query = workoutsRef.orderBy("createdAt", "asc").limitToLast(25);
  const [workouts = []] = useCollectionData(query, { idField: "id" });

  const [subPage, setSubPage] = React.useState(DEFAULT_SUB_PAGE);

  const dataToday = useTodayHistory({ uid });

  return (
    <>
      {(!workout || subPage === DEFAULT_SUB_PAGE) && (
        <>
          <Separator
            horizontal
            className="header-separator-dynamic header-separator--medium"
          />
          <WorkoutsManager
            workouts={workouts}
            setWorkout={setWorkout}
            setSubPage={setSubPage}
            dataToday={dataToday}
          />
        </>
      )}
      {workout && subPage === WORKOUT_SUB_PAGE && (
        <>
          <Separator horizontal className="header-separator" />
          <Clicker
            workout={workout}
            setWorkout={setWorkout}
            setSubPage={setSubPage}
            unit={UNITS[workout.unit]}
            integerOptions={[1, 5, 10]}
            options={
              defaultClickerAdditions[workout.template] ||
              defaultClickerAdditions.default
            }
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
export default WorkoutsPage;

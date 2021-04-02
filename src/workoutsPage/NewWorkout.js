import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Button,
  TextBox,
  Separator,
  ButtonGroup,
  ButtonGroupItem,
} from "../common";
import PushUpCounter from "./PushUpCounter";
import WorkoutDetails from "./WorkoutDetails";
import {
  DEFAULT_SUB_PAGE,
  WORKOUT_SUB_PAGE,
  DETAILS_SUB_PAGE,
} from "../utils/constants";
import { listMotion } from "../common/motion";
import { strings, PUSH_UP, SQUAT, SIT_UP, PULL_UP } from "../utils/constants";

const workoutButtons = [PUSH_UP, SQUAT, SIT_UP, PULL_UP];

function NewWorkout(props) {
  const { setWorkout, workouts, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;
  const [newWorkoutName, setNewWorkoutName] = React.useState("");
  const workoutsRef = firestore.collection(`users/${uid}/workouts`);

  const [type, setType] = React.useState("");

  async function createWorkout() {
    await workoutsRef.add({
      template: type,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: newWorkoutName,
      uid,
    });
    setNewWorkoutName("");
  }

  return (
    <div className="new-workout">
      <h2> Create new workout</h2>

      <motion.div
        animate={{
          x: type === "" ? 0 : -10,
        }}
      >
        <ButtonGroup>
          <ButtonGroupItem isSelected={type === ""} onClick={() => setType("")}>
            Choose a workout type:
          </ButtonGroupItem>

          {workoutButtons.map((itemType) => (
            <ButtonGroupItem
              key={itemType}
              className="new-workout__group__type"
              isSelected={type === itemType}
              onClick={() => setType(itemType)}
            >
              {strings[itemType]}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
      </motion.div>

      <AnimatePresence>
        {type && (
          <motion.div
            className="new-workout__add"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <TextBox
              className="new-workout__add__input"
              value={newWorkoutName}
              onChange={(e) => setNewWorkoutName(e.target.value)}
              placeholder="Workout name"
            />
            <Button disabled={!newWorkoutName} onClick={createWorkout}>
              Add
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewWorkout;

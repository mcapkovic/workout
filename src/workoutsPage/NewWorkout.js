import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FirebaseContext } from "../context";
import { Button, TextBox, ButtonGroup, ButtonGroupItem } from "../common";
import {
  strings,
  PUSH_UP,
  SQUAT,
  SIT_UP,
  PULL_UP,
  CYCLING,
  VR,
  RUNNING,
  STEPPER,
  typeDefaultUnit,
} from "../utils/constants";

const workoutButtons = [PUSH_UP, SQUAT, SIT_UP, PULL_UP, CYCLING, VR, RUNNING, STEPPER];

function NewWorkout(props) {
  const { setWorkout, workouts, setSubPage } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;
  const [newWorkoutName, setNewWorkoutName] = React.useState("");
  const workoutsRef = firestore.collection(`users/${uid}/workouts`);

  const [type, setType] = React.useState("");
  const defaultUnit = React.useMemo(() => typeDefaultUnit[type], [type]);

  async function createWorkout() {
    await workoutsRef.add({
      template: type,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: newWorkoutName,
      uid,
      unit: defaultUnit,
    });
    setNewWorkoutName("");
  }

  return (
    <div className="new-workout">
      <h2> Create new exercise</h2>

      <motion.div
        animate={{
          x: type === "" ? 0 : -10,
        }}
      >
        <ButtonGroup>
          <ButtonGroupItem isSelected={type === ""} onClick={() => setType("")}>
            Choose an exercise:
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
              placeholder="Exercise name"
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

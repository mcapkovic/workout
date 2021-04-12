import React from "react";
import { motion } from "framer-motion";
import { FirebaseContext } from "../context";
import { Separator } from "../common";
import { listMotion } from "../common/motion";
import NewWorkout from "./NewWorkout";
import WorkoutItem from "./WorkoutItem";

function WorkoutsManager(props) {
  const { setWorkout, workouts, setSubPage } = props;

  return (
    <div className="workouts-manager">
      <div className="workouts-manager__selection">
        <h2>List of exercises</h2>

        {workouts.length > 0 && (
          <motion.div
            variants={listMotion.listVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.2 }}
          >
            {workouts.map((item, index) => (
              <motion.div key={index} variants={listMotion.listItemVariants}>
                <WorkoutItem
                  setWorkout={setWorkout}
                  item={item}
                  setSubPage={setSubPage}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Separator horizontal />
      <NewWorkout />
      <div style={{ height: "1rem" }} />
    </div>
  );
}

export default WorkoutsManager;

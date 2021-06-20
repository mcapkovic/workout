import React from "react";
import { motion } from "framer-motion";
import { Separator } from "../common";
import { listMotion } from "../common/motion";
import NewWorkout from "./NewWorkout";
import WorkoutItem from "./WorkoutItem";

function WorkoutsManager(props) {
  const { setWorkout, workouts, setSubPage, dataToday } = props;

  return (
    <div className="workouts-manager">
      <div className="workouts-manager__selection">
        {workouts.length > 0 && (
          <>
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
                    dataToday={dataToday[item.id]}
                  />
                </motion.div>
              ))}
            </motion.div>
            <Separator horizontal />
          </>
        )}
      </div>

      <NewWorkout />
      <div style={{ height: "1rem" }} />
    </div>
  );
}

export default WorkoutsManager;

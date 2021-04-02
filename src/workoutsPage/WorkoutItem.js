import React from "react";
import { Button } from "../common";
import { WORKOUT_SUB_PAGE, DETAILS_SUB_PAGE } from "../utils/constants";

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

export default WorkoutItem;

import React from "react";
import { groupByDay } from "../utils/common";

function reduceCounts(accumulator, currentValue) {
  return accumulator + currentValue.count;
}

function useLineData(datePeriod, workouts2, membersData) {
  const data = React.useMemo(() => {
    const roomUsers = new Set();

    return workouts2.map((workoutData, index) => {
      const groups = groupByDay(workoutData);

      const data = datePeriod.map((date) => ({
        x: date,
        y: groups[date] ? groups[date].reduce(reduceCounts, 0) : 0,
      }));

      const userID = workoutData[0].uid;
      let { name = "anonym" } =
        membersData.find((user) => user.uid === workoutData[0].uid) || {};

      if (roomUsers.has(name)) {
        name = `${name}_${index}`;
        roomUsers.add(name);
      } else {
        roomUsers.add(name);
      }

      return { uid: userID, data, id: name };
    });
  }, [datePeriod, workouts2, membersData]);

  return data;
}

export default useLineData;

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

      const { uid } = workoutData[0];
      const { type } = workoutData.find((item) => item.type) || {};
      let { name = "anonym" } =
        membersData.find((user) => user.uid === uid) || {};

      if (roomUsers.has(name)) {
        name = `${name}_${index}`;
        roomUsers.add(name);
      } else {
        roomUsers.add(name);
      }

      if (type) name = `${name} (${type})`;

      return { uid, data, id: name };
    });
  }, [datePeriod, workouts2, membersData]);

  return data;
}

export default useLineData;

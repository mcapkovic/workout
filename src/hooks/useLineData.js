import React from "react";
import { groupByDay } from "../utils/common";
import { strings } from "../utils/constants";

function reduceCounts(accumulator, currentValue) {
  return accumulator + currentValue.count;
}

function useLineData(datePeriod, workouts2, membersData) {
  const data = React.useMemo(() => {
    const roomUsers = new Set();
    if(!workouts2 || workouts2.length === 0) return [];

    return workouts2.map((workoutData, index) => {
      const groups = groupByDay(workoutData);

      const data = datePeriod.map((date) => ({
        x: date,
        y: groups[date] ? groups[date].reduce(reduceCounts, 0) : 0,
      }));

      const { uid } = workoutData.length > 0 ? workoutData[0] : "";
      const { type } = workoutData.find((item) => item.type) || {};
      const { name = "anonym" } =
        membersData.find((user) => user.uid === uid) || {};

      let nameWithType = type ? `${name} (${strings[type]})`: name;

      if (roomUsers.has(nameWithType)) {
        roomUsers.add(nameWithType);
        nameWithType= `${nameWithType} (${index})`
      } else {
        roomUsers.add(nameWithType);
      }

      return { uid, data, id: nameWithType, type };
    });
  }, [datePeriod, workouts2, membersData]);

  return data;
}

export default useLineData;

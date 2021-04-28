import React from "react";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";

function useTodayHistory(props) {
  const { uid } = props;
  const { firestore } = React.useContext(FirebaseContext);

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const membersRef = firestore.collectionGroup(`workoutEntries`);
  const query2 = membersRef
    .where("uid", "==", uid)
    .where("createdAt", ">=", dayStart)
    .orderBy("createdAt", "asc")
    .limitToLast(50);

  const [allData = []] = useCollectionData(query2, {
    idField: "id",
  });

  const data = React.useMemo(() => {
    const workouts = {};
    allData.forEach((entry) => {
      const id = entry.workoutId;

      if (id in workouts) {
        workouts[id] = {
          ...workouts[id],
          count: workouts[id].count + entry.count,
        };
      } else {
        workouts[id] = { count: entry.count };
      }
    });
    return workouts;
  }, [allData]);

  return data;
}

export default useTodayHistory;

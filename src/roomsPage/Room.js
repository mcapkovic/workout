import React from "react";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Separator, LineChart, buttonMotion, ButtonPortal } from "../common";
import moment from "moment";
import useLineData from "../hooks/useLineData";
import UsersRow from "./UsersRow";

function Room(props) {
  const { setRoom, room } = props;
  const { workoutIds = [""], members = [""] } = room;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [workouts2, setwWorkouts] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      const queries = workoutIds.map((id) =>
        firestore
          .collection(`workoutsHistory/${id}/workoutEntries`)
          .orderBy("createdAt", "asc")
          .limitToLast(50)
      );

      const rawResults = await Promise.all(queries.map((q) => q.get()));

      const results = rawResults.map((querySnapshot2) => {
        const items = [];
        querySnapshot2.forEach((doc) => items.push(doc.data()));
        return items;
      });

      setwWorkouts(results);
    }

    loadData().catch((e) => null);
  }, []);

  const membersRef = firestore.collectionGroup(`userPublicData`);
  const query2 = membersRef.where("uid", "in", members);
  const [membersData = []] = useCollectionData(query2, { idField: "id" });

  const datePeriod = React.useMemo(() => {
    return Array.from({ length: 7 }, (v, i) =>
      moment()
        .subtract(7 - i - 1, "days")
        .format("MMM Do")
    );
  }, []);

  const data = useLineData(datePeriod, workouts2, membersData);

  return (
    <div className="room">
      <ButtonPortal
        destination="#header-start"
        onClick={() => setRoom(null)}
        {...buttonMotion.right}
      >
        Cancel
      </ButtonPortal>

      <Separator horizontal className="header-separator" />
      <div className="room__header">
        <h2 className="room__header__title">{room.roomName}</h2>
        <span className="room__header__id">id: {room.id}</span>
      </div>
      <UsersRow users={membersData} />
      <Separator horizontal />
      <h2>Workouts history</h2>
      <div className="room__chart">
        <LineChart
          data={data}
          legends={[]}
          margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
        />
      </div>
      <Separator horizontal />
    </div>
  );
}

export default Room;

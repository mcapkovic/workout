import React from "react";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Separator,
  LineChart,
  buttonMotion,
  ButtonPortal,
  ChartFilters,
  ContentPortal,
  NavButton,
} from "../common";
import moment from "moment";
import useLineData from "../hooks/useLineData";
import UsersRow from "./UsersRow";
import { ChevronLeft24Regular } from "@fluentui/react-icons";

function Room(props) {
  const { setRoom, room } = props;
  const { workoutIds = [""], members = [""] } = room;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [workouts2, setwWorkouts] = React.useState({ types: [], data: [] });
  const [typesToDisplay, setTypesToDisplay] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      const queries = workoutIds.map((id) =>
        firestore
          .collection(`workoutsHistory/${id}/workoutEntries`)
          .orderBy("createdAt", "asc")
          .limitToLast(50)
      );

      const rawResults = await Promise.all(queries.map((q) => q.get()));

      const results = [];
      const types = new Set();
      rawResults.forEach((querySnapshot2) => {
        const items = [];

        querySnapshot2.forEach((doc) => items.push(doc.data()));

        const { type } = items.find((item) => item.type) || {};
        if (items.length > 0) results.push(items);
        if (type) types.add(type);
      });
      setTypesToDisplay([...types]);
      setwWorkouts({ data: results, types: [...types] });
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

  const data = useLineData(datePeriod, workouts2.data, membersData);
  const filtredData = React.useMemo(() => {
    return data.filter((item) => typesToDisplay.includes(item.type));
  }, [data, typesToDisplay]);

  return (
    <div className="room">
      <ContentPortal portalTo="#app-bar-start-main">
        <NavButton onClick={() => setRoom(null)}>
          <ChevronLeft24Regular />
        </NavButton>
      </ContentPortal>

      <div className="room__header">
        <h2 className="room__header__title">{room.roomName}</h2>
        <span className="room__header__id">id: {room.id}</span>
      </div>
      <UsersRow users={membersData} />
      <Separator horizontal />
      <h2>Exercise history</h2>

      {workouts2.types.length > 1 && (
        <ChartFilters
          filters={workouts2.types}
          value={typesToDisplay}
          onChange={(newVal) => setTypesToDisplay(newVal)}
        />
      )}

      <div className="room__chart">
        <LineChart
          data={filtredData}
          legends={[]}
          margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
        />
      </div>
      <Separator horizontal />
    </div>
  );
}

export default Room;

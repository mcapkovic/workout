import React from "react";
import ReactDOM from "react-dom";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { Button, TextBox, Separator } from "./common";
import moment from "moment";
import LineChart from "./LineChart";
import useLineData from "./hooks/useLineData";

function BackButton(props) {
  const headerStart = React.useRef(document.querySelector("#header-start"));
  return ReactDOM.createPortal(
    <Button className="back-button" onClick={() => props.setRoom(null)}>
      Back
    </Button>,
    headerStart.current
  );
}

// function Row(props) {
//   const { createdAt, count, workoutId } = props.item;
//   let date = undefined;
//   if (createdAt && "seconds" in createdAt)
//     date = new Date(createdAt.seconds * 1000);
//   const dateString = date ? date.toLocaleDateString() : "";
//   const timeString = date ? date.toLocaleTimeString() : "";
//   return (
//     <tr>
//       <th>{workoutId}</th>
//       <th>{dateString}</th>
//       <th>{timeString}</th>
//       <th>{count}</th>
//     </tr>
//   );
// }
// function Table(props) {
//   const { data } = props;
//   return (
//     <div style={{ margin: "10px" }}>
//       <table>
//         <tbody>
//           {data.map((item) => (
//             <Row key={item.id} item={item} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

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
          .limitToLast(25)
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
  console.log("GROUPED", data);

  return (
    <div className="room">
      <BackButton setRoom={setRoom} />
      <Separator horizontal />
      <div className="room__header">
        <h2 className="room__header__title">{room.roomName}</h2>
        <span className="room__header__id">id: {room.id}</span>
      </div>
      users:
      {membersData.map((member = {}) => (
        <div>{member.name}</div>
      ))}
      {/* {workouts2 && workouts2.length > 0 && (
        <>
          <Separator horizontal />
          <h2>Workouts history</h2>
          {workouts2.map((workout) => (
            <Table data={workout} />
          ))}
        </>
      )} */}
      <Separator horizontal />
      <h2>Workouts history</h2>
      <div style={{ height: "300px" }}>
        <LineChart data={data} />
      </div>
      <Separator horizontal />
    </div>
  );
}

export default Room;
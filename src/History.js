import React, { useRef, useState } from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Row(props) {
  const { createdAt, count, workoutId } = props.item;
  let date = undefined;
  if (createdAt && "seconds" in createdAt)
    date = new Date(createdAt.seconds * 1000);
  const dateString = date ? date.toLocaleDateString() : "";
  const timeString = date ? date.toLocaleTimeString() : "";
  return (
    <tr>
      <th>{workoutId}</th>
      <th>{dateString}</th>
      <th>{timeString}</th>
      <th>{count}</th>
    </tr>
  );
}
function Table(props) {
  const { data } = props;
  return (
    <table>
      <tbody>
        {data.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}

function History(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, photoURL } = auth.currentUser;
  // const historyRef = firestore.collection("pushUp");
  const historyRef = firestore.collection(`users/${uid}/workoutsHistory`);
  const query = historyRef.orderBy("createdAt", "asc").limitToLast(25);

  const [data = []] = useCollectionData(query, { idField: "id" });
  return (
    <div>
      <Table data={data} />
    </div>
  );
}

export default History;

import React, { useRef, useState } from "react";
import { FirebaseContext } from "./context";

function PushUpPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const [count, setCount] = React.useState(0);
  const pushUpRef = firestore.collection("pushUp");

  function changeCount(value) {
      let newValue = count + value;
      if( newValue < 0) newValue = 0;
    setCount(newValue);
  }

  async function saveCount() {
    console.log(count);
    const { uid, photoURL } = auth.currentUser;

    await pushUpRef.add({
        count,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        collection: 'default'
      });
      setCount(0);
  }


  return (
    <div>
      <div style={{ color: "white" }}> {count}</div>

      <button onClick={() => changeCount(-5)}>-5</button>
      <button onClick={() => changeCount(5)}>+5</button>
      <button onClick={saveCount}>save</button>
    </div>
  );
}
export default PushUpPage;

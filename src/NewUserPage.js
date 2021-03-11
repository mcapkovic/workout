import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";

function NewUserPage(props) {
    const { auth, firestore, firebase } = React.useContext(FirebaseContext);
    const { uid, photoURL } = auth.currentUser;

  const [name, setName] = React.useState("");

  const userRef = firestore.collection(`users/${uid}/userPublicData`).doc('general');

  async function submitUserInfo() {
    await userRef.set({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      name,
    }, { merge: true });
    setName("");
  }

  return (
    <div>
      choose your user name:{" "}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button disabled={!name} onClick={submitUserInfo}>submit</button>
    </div>
  );
}

export default NewUserPage;

import React from "react";
import { FirebaseContext } from "../context";
import { Button, TextBox } from "../common";

function NewUserPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;

  const [name, setName] = React.useState("");

  const userRef = firestore
    .collection(`users/${uid}/userPublicData`)
    .doc("general");

  async function submitUserInfo() {
    await userRef.set(
      {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        name,
      },
      { merge: true }
    );
    setName("");
  }

  return (
    <div className="new-user-page">
      <div className="new-user-page__name">
        <label htmlFor="user-name">Choose your user name:</label>
        <TextBox
          id="user-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button disabled={!name} onClick={submitUserInfo}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default NewUserPage;

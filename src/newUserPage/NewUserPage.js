import React from "react";
import { FirebaseContext, AppContext } from "../context";
import { Button, TextBox } from "../common";

function NewUserPage(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid, email = "" } = auth.currentUser;
  const [name, setName] = React.useState(email.split("@")[0]);
  const [appState = {}, setAppState] = React.useContext(AppContext);

  const userRef = firestore
    .collection(`users/${uid}/userPublicData`)
    .doc("general");

  async function submitUserInfo() {
    setName("");
    await userRef.set(
      {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        name,
      },
      { merge: true }
    );
  }

  React.useEffect(() => {
    setAppState({
      ...appState,
      appBarData: { hideStart: true, title: "User name" },
    });
  }, []);

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

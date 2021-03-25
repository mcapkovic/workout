import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, ContentPortal, Separator, DeleteButton } from "./common";
import packageJson from "../package.json";

function SignOut() {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  return (
    auth.currentUser && (
      <Button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    )
  );
}

function RemoveUser(props) {
  const { disabled } = props;
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  function remove() {
    const user = firebase.auth().currentUser;
    user.delete().catch(function (error) {
      console.log(error);
    });
  }

  return (
    auth.currentUser && (
      <DeleteButton
        className="delete-profile"
        onClick={remove}
        buttonText="Remove profile"
        disabled={disabled}
      />
    )
  );
}

function Profile(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const user = auth.currentUser || {};
  const { displayName, email, photoURL, uid } = user;

  const historyRef = firestore.collection(`users/${uid}/workoutsHistory`);
  const query = historyRef.orderBy("createdAt", "asc").limitToLast(25);

  const [data = []] = useCollectionData(query, { idField: "id" });

  const isDemo = uid === "Fmc3wlvn9eMHC4cieSeNCZIdJbv2";
  return (
    <div>
      <Separator horizontal className="header-separator-dynamic" />
      <h2>User details</h2>
      <div>{displayName}</div>
      <div>{email}</div>
      <br />
      <SignOut />
      <Separator horizontal />

      <h1>Danger zone</h1>
      <RemoveUser disabled={isDemo} />
      {isDemo && <p>demo acconut can not be deleted</p>}

      <ContentPortal portalTo="#footer-center">
        {packageJson.version}
      </ContentPortal>
    </div>
  );
}

export default Profile;

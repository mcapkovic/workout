import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";

function SignOut() {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
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
  console.log(data);

  return (
    <div>
      <div>{displayName}</div>
      <div>{email}</div>
      <SignOut />
    </div>
  );
}

export default Profile;

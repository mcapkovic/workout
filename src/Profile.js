import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, ContentPortal, Separator } from "./common";
import packageJson from '../package.json';

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

function Profile(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const user = auth.currentUser || {};
  const { displayName, email, photoURL, uid } = user;

  const historyRef = firestore.collection(`users/${uid}/workoutsHistory`);
  const query = historyRef.orderBy("createdAt", "asc").limitToLast(25);

  const [data = []] = useCollectionData(query, { idField: "id" });

  return (
    <div>
      <Separator horizontal className='header-separator-dynamic' />
      <h2>User details</h2>
      <div>{displayName}</div>
      <div>{email}</div>
      <Separator horizontal />
      <SignOut />
      <ContentPortal portalTo="#footer-center">
       {packageJson.version}
      </ContentPortal>
    </div>
  );
}

export default Profile;

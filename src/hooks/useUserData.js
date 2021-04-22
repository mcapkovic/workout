import React from "react";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../context";

function useUserData() {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const newUserTriggered = React.useRef(false);
  const { uid } = auth.currentUser;
  const history = useHistory();

  const userPubicDataRef = firestore.collection(`users/${uid}/userPublicData`);
  const query2 = userPubicDataRef.where("uid", "==", uid);
  const [userPubicData] = useCollectionData(query2, { idField: "id" });

  React.useEffect(() => {
    if (userPubicData && userPubicData.length === 0) {
      newUserTriggered.current = true;
      history.push("/new-user");
    }

    if (newUserTriggered.current && userPubicData && userPubicData.length > 0) {
      newUserTriggered.current = false;
      history.push("/exercises");
    }
  }, [userPubicData]);

  return userPubicData;
}

export default useUserData;

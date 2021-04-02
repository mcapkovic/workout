import React, { useRef, useState } from "react";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";

// function Chat(props) {
//   const count = React.useContext(FirebaseContext);
//   console.log(count);

//   return <div>hello</div>;
// }

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const { auth } = React.useContext(FirebaseContext);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

function Chat() {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt", "asc").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    // console.log(auth.currentUser)

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(()=>{
    dummy.current.scrollIntoView({ behavior: "smooth" });
  },[messages])

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

export default Chat;

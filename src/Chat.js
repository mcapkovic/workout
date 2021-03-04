import React from "react";
import { FirebaseContext } from "./context";

function Chat(props) {
  const count = React.useContext(FirebaseContext);
  console.log(count);

  return <div>hello</div>;
}

export default Chat;

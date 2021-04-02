import React from "react";
import { motion } from "framer-motion";
import { heightMotion } from "../common";

const animation = {
  initial: {
    opacity: 0,
    // x: -50,
  },
  animate: {
    opacity: 1,
    // x: 0,
  },
  transition: { duration: 0.5 },
};

function User(props) {
  const { className, data = {} } = props;
  const { name = "" } = data;
  return (
    <motion.div {...animation} key={data.uid} className={className + " users-row-user"}>
      <div className="users-row-user__avatar">{name[0]}</div>
      <div className="users-row-user__name">{name}</div>
    </motion.div>
  );
}

function UsersRow(props) {
  const { users = [] } = props;
  return (
    <div>
      {users.length > 0 && (
        <motion.div
          className="users-row"
          variants={heightMotion.default}
          initial="initial"
          animate="animate"
        >
          {users.map((user) => (
            <User className="users-row__user" key={user.uid} data={user} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default UsersRow;

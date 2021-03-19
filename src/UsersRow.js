import React from "react";

function User(props) {
  const { className, data = {} } = props;
  const { name = "" } = data;
  return (
    <div className={className + " users-row-user"}>
      <div className="users-row-user__avatar">{name[0]}</div>
      <div className="users-row-user__name">{name}</div>
    </div>
  );
}

function UsersRow(props) {
  const { users = [] } = props;
  console.log("ddd", users);
  return (
    <div className="users-row">
      {users.map((user, i) => (
        <User className="users-row__user" key={i} data={user} />
      ))}
    </div>
  );
}

export default UsersRow;

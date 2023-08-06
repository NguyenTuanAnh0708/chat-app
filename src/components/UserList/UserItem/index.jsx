import { Avatar } from "@mui/material";
import React from "react";
import "../UserList.scss";
const UserItem = ({ displayName = "test", avatar = "test", decription }) => {
  return (
    <div className="user-info">
      <Avatar alt={displayName} src={avatar} />
      <div className="info">
        <p className="user-info-name">{displayName}</p>
        {decription && <p style={{ opacity: "0.5" }}>{decription}</p>}
      </div>
    </div>
  );
};

export default UserItem;

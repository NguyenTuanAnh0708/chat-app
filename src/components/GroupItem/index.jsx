import React from "react";
import { Avatar } from "@mui/material";
Link;
import "./GroupItem.scss";
import { Link } from "react-router-dom";
const GroupItem = ({ id, imgUrl, name, decription, members }) => {
  return (
    <Link to={`/chat/${id}`}>
      <div className="group-item">
        <Avatar alt={name} src={imgUrl}>
          {name}
        </Avatar>
        <div className="group-info">
          <div className="group-info-wapper">
            <p className="group-info-name">{name}</p>
            <p className="group-info-sended">{members.length}</p>
          </div>
          <p className="group-info-decription">
            {/* You: Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Similique blanditiis temporibus iste ex quae amet magnam corrupti,
          commodi mollitia expedita suscipit consequuntur voluptatibus
          laudantium aperiam? Ducimus fugiat enim impedit totam. */}
            {decription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GroupItem;

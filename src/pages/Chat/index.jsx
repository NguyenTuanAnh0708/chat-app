import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Chat.scss";
import UserItem from "../../components/UserList/UserItem";
import { useParams } from "react-router-dom";
import AppProvider, { AppContext } from "../../Context/AppProvider";
import { AvatarGroup, Avatar, Button } from "@mui/material";
import useFireStore from "../../hooks/useFireStore";
import { PopupInvitationMember } from "../../components/Popup";
import { addCollection } from "../../firebase/service";
import { AuthConText } from "../../Context/AuthProvider";

const Chat = () => {
  const [chatText, setChatText] = useState("");
  const {
    user: { displayName, photoURL },
  } = useContext(AuthConText);
  let { roomId } = useParams();
  const { rooms } = useContext(AppContext);
  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id == roomId);
  }, [rooms]);
  const userConditionInGroup = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, []);
  const userConditionOutGroup = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "not-in",
      compareValue: selectedRoom.members,
    };
  }, []);
  const members = useFireStore("users", userConditionInGroup);
  const membersOutGroup = useFireStore("users", userConditionOutGroup);
  const messagesCondition = useMemo(() => {
    return {
      fieldName: "idRoom",
      operator: "==",
      compareValue: selectedRoom.id,
    };
  }, []);
  console.log(messagesCondition);
  const messagesRoom = useFireStore("messages", messagesCondition);
  console.log({ messagesRoom });
  const handelChatText = (e) => {
    setChatText(e.target.value);
  };
  const handelSend = () => {
    addCollection("messages", {
      displayName: displayName,
      avatar: photoURL,
      message: chatText,
      idRoom: selectedRoom.id,
    });
  };
  return (
    <div className="chat-page">
      <header className="chat-page__header">
        <div className="info-chat-rom">
          <UserItem
            displayName={selectedRoom.name}
            avatar={selectedRoom.imgUrl}
            decription={selectedRoom.decription}
          />
        </div>
        <div style={{ display: "flex", marginRight: "5px" }}>
          <PopupInvitationMember
            membersOutGroup={membersOutGroup}
            prevRoomData={selectedRoom}
          />
          <AvatarGroup max={4}>
            {members.map((member) => (
              <Avatar alt={member.displayName} src={member.photoUrl} />
            ))}
          </AvatarGroup>
        </div>
      </header>
      <div
        className="chat-messages-space"
        style={{ width: "60vw", margin: "10px auto", marginTop: "10px" }}
      >
        {messagesRoom.map((mess) => (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Avatar src={mess.avatar} />
            <label style={{ marginLeft: "5px" }}>{mess.message}</label>
          </div>
        ))}
      </div>
      <div className="chat-action">
        <input type="text" value={chatText} onChange={handelChatText} />
        <Button onClick={handelSend}>send</Button>
      </div>
    </div>
  );
};

export default Chat;

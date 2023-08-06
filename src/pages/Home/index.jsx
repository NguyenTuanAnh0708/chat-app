import React, { useContext, useEffect, useMemo, useState } from "react";
import CircleButton from "../../components/CircleButton";
import {
  Tooltip,
  Drawer,
  Avatar,
  Button,
  TextField,
  InputBase,
  IconButton,
  Paper,
} from "@mui/material";
import "./Home.scss";
import GroupItem from "../../components/GroupItem";
import { PopupAddGroup } from "../../components/Popup";
import UserItem from "../../components/UserList/UserItem";
import UserList from "../../components/UserList";
import { auth, db } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { AuthConText } from "../../Context/AuthProvider";
import useFireStore from "../../hooks/useFireStore";
import { AppContext } from "../../Context/AppProvider";
const Home = () => {
  const {
    user,
    user: { displayName, photoURL },
  } = useContext(AuthConText);
  /**
   * room
   * {
   * name:"abc"
   * decription:"abc"
   * members:[uid1,uid2,...]
   * }
   */
  const { rooms } = useContext(AppContext);
  const [openMenu, setOpenMenu] = useState(false);
  const handelLogOut = () => {
    signOut(auth);
  };
  return (
    <div className="home-wapper">
      <div className="user-action-chat">
        <div className="left flex">
          <CircleButton
            handelClick={() => {
              setOpenMenu(true);
            }}
          >
            <i class="bx bx-menu"></i>
          </CircleButton>
          <Drawer
            open={openMenu}
            anchor={"left"}
            onClose={() => setOpenMenu(false)}
          >
            <div className="sideBar-wapper">
              <div className="wapper-user">
                <UserItem displayName={displayName} avatar={photoURL} />

                <UserList />
              </div>
              <Button
                onClick={handelLogOut}
                variant="contained"
                color="warning"
              >
                Log out
              </Button>
            </div>
          </Drawer>
          <p>Group chat</p>
        </div>
        <div className="right flex">
          <PopupAddGroup />
        </div>
      </div>
      <div className="user-action-seach-group">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: "40px",
            boxShadow: "unset",
            backgroundColor: "#f0f2f6",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <i class="bx bx-search"></i>
          </IconButton>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Seaching group...." />
        </Paper>
      </div>
      <div className="group-wapper">
        {rooms.map((room) => (
          <GroupItem
            id={room.id}
            key={room.id}
            imgUrl={room.imgUrl}
            name={room.name}
            decription={room.decription}
            members={room.members}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

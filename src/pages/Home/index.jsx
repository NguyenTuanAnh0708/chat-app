import React, { useState } from "react";
import CircleButton from "../../components/CircleButton";
import { Tooltip, Drawer, Avatar, Button } from "@mui/material";
import "./Home.scss";
const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);
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
              <div className="user-info">
                <Avatar
                  alt="user-name"
                  src="https://images.unsplash.com/photo-1682685797795-5640f369a70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                />
                <p className="user-info-name">Nguyen Tuan Anh</p>
              </div>
              <Button variant="contained" color="warning">
                Log out
              </Button>
            </div>
          </Drawer>
          <p>Group chat</p>
        </div>
        <div className="right flex">
          <Tooltip title="Create group chat" arrow>
            <CircleButton>
              <i class="bx bx-plus"></i>
            </CircleButton>
          </Tooltip>
        </div>
      </div>
      <div className="seach-group"></div>
      <div className="group-wapper"></div>
    </div>
  );
};

export default Home;

import React, { useContext, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import CircleButton from "../CircleButton";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";
import "./Popup.scss";
import { MuiFileInput } from "mui-file-input";
import { useForm } from "react-hook-form";
import { saveBase64 } from "../../tools";
import { v4 as uuidv4 } from "uuid";

import {
  saveFileFireStorage,
  updateNewDataCollection,
} from "../../firebase/service";
import { addCollection } from "../../firebase/service";
import { AuthConText } from "../../Context/AuthProvider";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import UserItem from "../UserList/UserItem";

const Popup = (props) => {
  const { onClose, open, title, children } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
const PopupAddGroup = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const {
    user: { uid },
  } = useContext(AuthConText);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleFileChange = (newFile) => {
    setFile(newFile);
  };
  const handelCreateGroup = async (data) => {
    const imgUrl = await saveFileFireStorage(file);
    addCollection("rooms", {
      ...data,
      members: [uid],
      imgUrl,
    });

    reset();
    setOpen(false);
  };
  return (
    <>
      <CircleButton handelClick={handleClickOpen}>
        <i className="bx bx-plus"></i>
      </CircleButton>
      <Popup open={open} onClose={handleClose} title="Create new my group">
        <form className="PopupGroup" onSubmit={handleSubmit(handelCreateGroup)}>
          <MuiFileInput value={file} onChange={handleFileChange} fullWidth />
          <TextField
            required
            id="name-group"
            label="Name Group"
            placeholder="Name group........"
            fullWidth
            {...register("name")}
          />
          <TextField
            required
            id="decription"
            label="Decription"
            placeholder="Decription........"
            fullWidth
            {...register("decription")}
          />
          <Button className="mt-3" variant="contained" type="submit">
            Create Group
          </Button>
        </form>
      </Popup>
    </>
  );
};
const PopupInvitationMember = ({ membersOutGroup, prevRoomData }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOptions(newValue);
  };
  const handelAddNewUser = () => {
    const newUid = selectedOptions.map((newMember) => newMember.uid);
    updateNewDataCollection("rooms", prevRoomData.id, {
      members: [...prevRoomData.members, ...newUid],
    });
  };
  return (
    <>
      <CircleButton handelClick={handleClickOpen}>
        <i className="bx bx-plus"></i>
      </CircleButton>
      <Popup open={open} onClose={handleClose} title="Invitation New User">
        <div className="PopupGroup">
          <Autocomplete
            limitTags={3}
            fullWidth
            multiple
            id="multiple-limit-tags"
            options={membersOutGroup}
            getOptionLabel={(option) => {
              return option.displayName;
            }}
            value={selectedOptions}
            onChange={handleAutocompleteChange}
            renderOption={(props, option) => (
              <li {...props}>
                {console.log(option)}
                <UserItem
                  displayName={option.displayName}
                  avatar={option.photoUrl}
                />
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Seach new user"
                placeholder="Seach new user"
              />
            )}
          />
        </div>
        <Button onClick={handelAddNewUser}>Add memebers</Button>
      </Popup>
    </>
  );
};
export { PopupAddGroup, PopupInvitationMember };

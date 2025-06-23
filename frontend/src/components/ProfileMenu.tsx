import { AccountBox } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import InfoIcon from "@mui/icons-material/Info";

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const { doLogout, user } = useAuth();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (where: string) => {
    setAnchorEl(null);
    navigate(where);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color={"inherit"}
      >
        <AccountBox />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled={true}>
          <ListItemIcon>
            <AccountBox fontSize="small" />
          </ListItemIcon>
          <ListItemText>{user?.userName}</ListItemText>
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => handleNavigate("/vehicles")}>
          <ListItemIcon>
            <TimeToLeaveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Registru Mașini</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleNavigate("/information")}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Informații Utile</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={doLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

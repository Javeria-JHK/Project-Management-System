import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaddedIcon from "./PaddedIcon";
import {
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function MenuBar({ open, anchorEl, setAnchorEl, items }) {
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            boxShadow: "none",
            border: "1px solid #ddd",
          },
        },
      }}
    >
      {items.map((item) => (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            item.action();
          }}
        >
          <ListItemText>{item.label}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default MenuBar;

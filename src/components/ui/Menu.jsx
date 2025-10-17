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

function MenuBar({ open, anchorEl, setAnchorEl, items, bgColor }) {
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
            backgroundColor: bgColor,

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
          <ListItemText className="dark:text-gray-200">
            {item.label}
          </ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default MenuBar;

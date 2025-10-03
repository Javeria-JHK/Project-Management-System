import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import MenuBar from "../../components/ui/Menu";

import { useWorkspace } from "../../hooks/useWorkspace";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const workspaceMembers = [
  { id: 1, name: "Alice", email: "alice@email.com", role: "Member" },
  { id: 2, name: "Bob", email: "bob@email.com", role: "Member" },
  { id: 3, name: "Charlie", email: "charlie@email.com", role: "Member" },
  { id: 4, name: "Alpha", email: "alpha@email.com", role: "Admin" },
  { id: 5, name: "Bravo", email: "bravo@email.com", role: "Member" },
  { id: 6, name: "Beta", email: "beta@email.com", role: "Invited" },
];

function Members() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { workspace } = useWorkspace();
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState(workspaceMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [InvitationAnchorEl, setInvitationAnchorEl] = useState(null);
  const InviteOpen = Boolean(InvitationAnchorEl);

  const items = [
    { label: "Remove", action: () => deleteMember(selectedMember.id) },
  ];

  const invitedMenuItems = [
    { label: "Accept", action: () => {} },
    { label: "Reject", action: () => deleteMember(selectedMember.id) },
  ];

  const handleMenuOpen = (event, member) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleInviteMenuOpen = (event) => {
    event.preventDefault();
    setInvitationAnchorEl(event.currentTarget);
  };

  const filteredMembers =
    members.filter((wm) => {
      return (
        wm.name.toLowerCase().includes(query.toLowerCase()) ||
        wm.email.toLowerCase().includes(query.toLowerCase()) ||
        wm.role.toLowerCase().includes(query.toLowerCase())
      );
    }) || workspaceMembers;

  const deleteMember = (id) => {
    setMembers((prev) =>
      prev.filter((p) => {
        return p.id !== id;
      })
    );
  };

  return (
    <div className="px-2 h-full w-full">
      <h2 className="text-2xl font-bold text-black pb-2">
        {" "}
        {workspace}
        {" Members"}
      </h2>
      <div className="flex justify-between  mb-2">
        <SearchBar
          searchQuery={query}
          setSearchQuery={setQuery}
          rounded={true}
          border={false}
        />

        <Button
          width="w-[9%]"
          height={"h-10"}
          bgcolor="gray"
          onClick={handleInviteMenuOpen}
        >
          <AddIcon />
          <p className="pl-2"> Invite</p>
        </Button>
      </div>
      <table className="w-full border border-gray-400 shadow rounded-2xl overflow-hidden px-4">
        <thead className="bg-gray-300 text-gray-700 text-sm font-semibold ">
          <tr className="">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="pl-4 py-2 text-right pr-20">Options</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 divide-y divide-gray-300">
          {workspaceMembers.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-4 text-center text-gray-400 italic"
              >
                No tasks available
              </td>
            </tr>
          ) : (
            filteredMembers.map((wm) => (
              <tr
                key={wm.id}
                className="hover:bg-gray-300 transition bg-gray-100"
              >
                <td className="px-6 py-2 font-medium text-gray-800">
                  <div className="flex justify-start items-center">
                    <p className="w-7 h-7 rounded-full border bg-black/80 text-white font-bold flex justify-center items-center">
                      {wm.name[0]?.toUpperCase()}
                    </p>
                    <span className="cursor-pointer ml-2 h-6 font-semibold">
                      {wm.name}
                    </span>
                  </div>
                </td>
                <td className="font-medium text-gray-600">{wm.email}</td>
                <td className=" font-medium text-gray-800">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      wm.role === "Invited"
                        ? "text-blue-600  bg-blue-100 "
                        : "text-gray-700  bg-gray-200 "
                    }`}
                  >
                    {wm.role}
                  </span>
                </td>
                <td className="pl-4 pr-22 py-2 font-medium text-gray-800 flex justify-end">
                  {" "}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      handleMenuOpen(e, wm);
                    }}
                  >
                    <MoreVertIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
          <tr>
            <th></th>
          </tr>
        </tbody>
      </table>
      <MenuBar
        member={selectedMember}
        items={selectedMember?.role === "Invited" ? invitedMenuItems : items}
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
      <Menu
        anchorEl={InvitationAnchorEl}
        open={InviteOpen}
        onClose={() => {
          setInvitationAnchorEl(null);
        }}
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
            sx: {
              width: 400,
            },
          },
        }}
      >
        <div className="w-full px-4 py-2 rounded-lg">
          <p className="text-md text-gray-700 font-semibold">Invite link</p>
          <p className="text-sm text-gray-700 pb-2">
            Use the link below to invite people to join your workspace.
          </p>
          <div className="bg-gray-200 rounded-lg px-2 py-3 border border-gray-400 mt-2 text-sm">
            <p>http://localhost:5173/signin</p>
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default Members;

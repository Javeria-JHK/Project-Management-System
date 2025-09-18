import { useState } from "react";
import Button from "../../../components/ui/Button";
import { AnimatePresence, motion } from "motion/react";
import SearchBar from "../../../components/ui/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function MemberList({
  projectMembers,
  workspaceMembers,
  onAddMember,
  onRemoveMember,
  onClose,
  open,
}) {
  const [query, setQuery] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showProject, setShowProject] = useState(true);
  const [showWorkspace, setShowWorkspace] = useState(true);

  // Filters
  const filteredProjectMembers = projectMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase())
  );

  const filteredWorkspaceMembers = workspaceMembers.filter(
    (m) =>
      !projectMembers.find((pm) => pm.id === m.id) &&
      (m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.email.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 "
            onClick={() => {
              setDeleteTarget(null);
              onClose();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-1/3 bg-white text-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-100 p-4">
              <h2 className="text-xl font-bold">Project Members</h2>
              <IconButton
                onClick={() => {
                  setDeleteTarget(null);
                  onClose();
                }}
              >
                <CloseIcon sx={{ color: "black" }} />
              </IconButton>
            </div>

            {/* Search */}
            <div className="p-4">
              <SearchBar
                rounded={false}
                border={true}
                setSearchQuery={setQuery}
              />
            </div>

            {/* Collapsibles */}
            <div className="h-[80%] flex flex-col px-4 pb-2 mb-1 gap-4">
              {/* Workspace Members Section */}
              <div
                className={`flex flex-col border border-gray-300 shadow rounded-lg overflow-hidden ${
                  showWorkspace
                    ? workspaceMembers.length > 0
                      ? "flex-1"
                      : "h-auto"
                    : "h-[43px]"
                }`}
              >
                <div
                  className="flex justify-between items-center p-2 pr-4 cursor-pointer bg-gray-100 rounded-lg"
                  onClick={() => setShowWorkspace((w) => !w)}
                >
                  <div className="flex gap-5 items-center">
                    <h3 className="font-semibold">Workspace Members</h3>
                    <p className="text-sm text-gray-600">
                      {filteredWorkspaceMembers.length}
                    </p>
                  </div>

                  <span>
                    {showWorkspace ? (
                      <ExpandLessIcon sx={{ color: "black", fontSize: 24 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: "black", fontSize: 24 }} />
                    )}
                  </span>
                </div>

                {showWorkspace && (
                  <div className="flex-1 overflow-y-auto p-2">
                    {filteredWorkspaceMembers.length > 0 ? (
                      filteredWorkspaceMembers.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <p className="w-8 h-8 rounded-full border bg-gray-300 text-gray-800 font-bold flex justify-center items-center">
                              {m.name[0].toUpperCase()}
                            </p>
                            <div>
                              <p className="text-sm font-medium">{m.name}</p>
                              <p className="text-xs text-gray-500">{m.email}</p>
                            </div>
                          </div>
                          <IconButton
                            size="small"
                            onClick={() => {
                              onAddMember(m);

                              setQuery("");
                            }}
                          >
                            <AddIcon sx={{ color: "black", fontSize: 18 }} />
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No available members
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Project Members Section */}
              <div
                className={`flex flex-col border border-gray-300 shadow rounded-lg overflow-hidden ${
                  showProject
                    ? projectMembers.length > 0
                      ? "flex-1"
                      : "h-auto"
                    : "h-[43px]"
                }`}
              >
                <div
                  className="flex justify-between items-center p-2 cursor-pointer bg-gray-100 rounded-lg"
                  onClick={() => setShowProject((p) => !p)}
                >
                  <div className="flex gap-5 items-center">
                    <h3 className="font-semibold">Already in Project</h3>
                    <p className="text-sm text-gray-600">
                      {filteredProjectMembers.length}
                    </p>
                  </div>

                  <span>
                    {showProject ? (
                      <ExpandLessIcon sx={{ color: "black", fontSize: 24 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: "black", fontSize: 24 }} />
                    )}
                  </span>
                </div>

                {showProject && (
                  <div className="flex-1 overflow-y-auto p-2">
                    {filteredProjectMembers.length > 0 ? (
                      filteredProjectMembers.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <p className="w-8 h-8 rounded-full border bg-black/80 text-white font-bold flex justify-center items-center">
                              {m.name[0].toUpperCase()}
                            </p>
                            <div>
                              <p className="text-sm font-medium">{m.name}</p>
                              <p className="text-xs text-gray-500">{m.email}</p>
                            </div>
                          </div>
                          <IconButton
                            size="small"
                            onClick={() => setDeleteTarget(m)}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No members yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {deleteTarget && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-10 right-6.5 w-[90%] bg-white shadow-xl rounded-xl border p-4 z-50"
              >
                <h3 className="font-bold text-lg mb-2">Remove Member</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to remove{" "}
                  <span className="font-semibold">{deleteTarget.name}</span>{" "}
                  from this Project?
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    bgcolor="lightGray"
                    textColor="gray"
                    onClick={() => setDeleteTarget(null)}
                    width="w-20"
                    height="h-8"
                  >
                    No
                  </Button>
                  <Button
                    width="w-20"
                    height="h-8"
                    onClick={() => {
                      onRemoveMember(deleteTarget.id);
                      setDeleteTarget(null);
                    }}
                    bgcolor="black"
                    textColor="white"
                  >
                    Yes
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MemberList;

import { useState } from "react";
import WorkspaceCard from "./components/WorkspaceCard";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../components/ui/SearchBar";
import { useWorkspace } from "../../hooks/useWorkspace";
import WorkspaceModal from "./components/WorkspaceModal";

function Workspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const { workspace, updateWorkspace } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  let id = 4;

  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: "My Workspace",
      description: "My default workspace",
      members: 1,
    },
    {
      id: 2,
      name: "Wanclouds Inc.",
      description: "Organization workspace for Wanclouds",
      members: 25,
    },
    {
      id: 3,
      name: "DesignHub",
      description: "Design collaboration workspace",
      members: 12,
    },
  ]);

  //  Workspace functiobs
  const addWorkspace = (workspace) => {
    setWorkspaces([...workspaces, { ...workspace, id: workspace.name + id }]);
  };

  const editWorkspace = (id, updatedData) => {
    updateWorkspace(updatedData.name);
    setWorkspaces(
      workspaces.map((ws) => (ws.id === id ? { ...ws, ...updatedData } : ws))
    );
  };

  const deleteWorkspace = (id) => {
    setWorkspaces(workspaces.filter((ws) => ws.id !== id));
  };

  // filetring workspaces based on search by name
  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-2 h-full w-full">
      <h2 className="text-2xl font-bold text-black"> My Workspaces</h2>
      <div className="flex items-center justify-start gap-6">
        <SearchBar setSearchQuery={setSearchQuery} />
        <div
          className="w-50 h-10 rounded-xl border-2 border-gray-800 border-dashed hover:bg-white flex hover:cursor-pointer hover:border-double justify-between items-center px-4"
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
        >
          <AddIcon sx={{ fontSize: 26, color: "black" }} />
          <p className="text-md text-gray-800 font-bold">Add Workspace</p>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap mt-2">
        {filteredWorkspaces.map((ws) => (
          <WorkspaceCard
            key={ws.id}
            name={ws.name}
            description={ws.description}
            members={ws.members}
            isDefault={ws.name === workspace}
            onClick={() => updateWorkspace(ws.name)}
            onEdit={(e) => {
              e.stopPropagation();
              setEditData(ws);
              setModalOpen(true);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              deleteWorkspace(ws.id);
            }}
          />
        ))}
      </div>
      {filteredWorkspaces.length === 0 && (
        <p className="text-gray-800 italic mx-2 mt-4">No workspaces found.</p>
      )}

      {/* Modal for add/edit */}
      <WorkspaceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(data) =>
          editData ? editWorkspace(editData.id, data) : addWorkspace(data)
        }
        initialData={editData}
      />
    </div>
  );
}

export default Workspace;

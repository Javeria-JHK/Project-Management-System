import { useEffect, useState } from "react";
import WorkspaceCard from "./components/WorkspaceCard";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../components/ui/SearchBar";
import { useWorkspace } from "../../hooks/useWorkspace";
import WorkspaceModal from "./components/WorkspaceModal";
import { useStore } from "../../hooks/useStore";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { useParams, useNavigate, Outlet } from "react-router-dom";

function Workspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const { workspaceId, updateWorkspace, workspaces } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { state, dispatch } = useStore();
  const { workspace } = state;
  const { id } = useParams();
  const navigate = useNavigate();

  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const { getWorkspaces, createWorkspace, editWorkspace, deleteWorkspace } =
    useWorkspaces();

  useEffect(() => {
    //make sure workspaces are loaded first
    async function handleWorkspaces() {
      if (workspaces.length === 0) {
        await getWorkspaces();
      }
    }

    // When id exists (from params)
    if (id) {
      const targetWs = workspaces.find((ws) => {
        return ws.id === id;
      });

      if (targetWs) {
        // Set the matching workspace as active
        dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: id });
        console.log("Workspace set active →", id);
      } else {
        console.warn("Workspace not found for ID:", id);
      }
    }

    handleWorkspaces();
  }, [id, workspaces.length]);

  const addWorkspace = async (workspace) => {
    const result = await createWorkspace(workspace.name, workspace.description);
    if (!result.error) {
      setSuccessAlert("Workspace created successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      getWorkspaces();
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
    navigate(`/workspaces`);
  };

  const editWs = async (id, updatedData) => {
    console.log("Updating workspace with id:", id, "to", updatedData);
    const data = {
      name: updatedData.name,
      description: updatedData.description,
      owner_id: state.auth.user?.id,
    };
    const result = await editWorkspace(id, data);
    if (!result.error) {
      setSuccessAlert("Workspace updated successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      getWorkspaces();
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
    navigate(`/workspaces`);
  };

  const deleteWs = async (id) => {
    console.log("passing the id--> " + id);
    const result = await deleteWorkspace(id);
    if (!result.error) {
      setSuccessAlert("Workspace deleted successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      // getWorkspaces();

      // remove from state
      const updatedWorkspaces = workspaces.filter((ws) => ws.id !== id);
      dispatch({ type: "SET_WORKSPACES", payload: updatedWorkspaces });

      // if deleted workspace was active → pick next one
      if (workspace.activeWorkspaceId === id) {
        const nextWorkspace = updatedWorkspaces[0] || null;
        dispatch({
          type: "SET_ACTIVE_WORKSPACE",
          payload: nextWorkspace ? nextWorkspace.id : "Select Workspace",
        });
      }
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
    navigate(`/workspaces`);
  };

  // filetring workspaces based on search by name
  const filteredWorkspaces = (workspaces || []).filter((ws) => {
    const name = ws?.name ?? "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="px-2 h-full w-full relative">
      <h2 className="text-2xl font-bold dark:text-white text-black">
        {" "}
        My Workspaces
      </h2>
      <div className="flex items-center justify-start gap-6 ">
        <div>
          {successAlert && (
            <div className="absolute top-0 right-0 transform -translate-x-1/2 mt-4 px-4 py-2 bg-green-100 text-green-500 text-md rounded-lg border-1 border-green-300">
              <p>{successAlert}</p>{" "}
            </div>
          )}
          {errorAlert && (
            <div className="absolute top-0 right-0 transform -translate-x-1/2 mt-4 px-4 py-2 bg-red-100 text-red-500 text-md rounded-lg border-1 border-red-300">
              <p>{errorAlert}</p>{" "}
            </div>
          )}
        </div>
        <div className="py-2">
          <SearchBar
            setSearchQuery={setSearchQuery}
            rounded={true}
            border={false}
          />
        </div>

        <div
          className="w-50 h-10 rounded-xl border-2 border-gray-800 dark:border-gray-500 border-dashed hover:bg-white dark:hover:bg-[#333] flex hover:cursor-pointer hover:border-double justify-between items-center px-4"
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
        >
          <AddIcon
            className="text-black dark:text-white"
            sx={{ fontSize: 26 }}
          />
          <p className="text-md text-gray-800 dark:text-gray-400 font-bold">
            Add Workspace
          </p>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap mt-4">
        {state.isWorkspaceLoading ? (
          <div className="w-full flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 dark:border-gray-800 border-gray-300 dark:border-t-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        ) : (
          filteredWorkspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              name={ws.name}
              description={ws.description}
              members={ws.members || 1}
              isDefault={ws.id === workspaceId}
              onClick={() => {
                updateWorkspace(ws.id);
                navigate(`/workspaces/${ws.id}`);
              }}
              onEdit={(e) => {
                e.stopPropagation();
                setEditData(ws);
                setModalOpen(true);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                deleteWs(ws.id);
              }}
            />
          ))
        )}
      </div>

      {!workspace.isWorkspaceLoading && filteredWorkspaces.length === 0 && (
        <p className="text-gray-800 dark:text-gray-200 italic mx-2 mt-4">
          No workspaces found.
        </p>
      )}

      {/* Modal for add/edit */}
      <WorkspaceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(data) =>
          editData ? editWs(editData.id, data) : addWorkspace(data)
        }
        initialData={editData}
      />
    </div>
  );
}

export default Workspace;

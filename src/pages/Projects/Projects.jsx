import { useState, useEffect } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import ProjectCard from "./components/ProjectCard";
import SearchBar from "../../components/ui/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import ProjectModal from "./components/ProjectModal";
import { useProjects } from "../../hooks/useProjects";
import { useStore } from "../../hooks/useStore";

//dummy data

// const allProjects = [
//   {
//     id: 1,
//     workspaceId: "My Workspace",
//     name: "Personal Portfolio Website",
//     description: "A modern responsive portfolio built with React and Tailwind.",
//     members: 2,
//     status: "In Progress",
//     tasks: 14,
//   },
//   {
//     id: 2,
//     workspaceId: "Wanclouds Inc.",
//     name: "Cloud Migration Tool",
//     description: "A tool for automating AWS → Azure migration.",
//     members: 10,
//     status: "Completed",
//     tasks: 4,
//   },
//   {
//     id: 3,
//     workspaceId: "DesignHub Agency",
//     name: "E-commerce Redesign",
//     description: "UI/UX redesign for a fashion brand’s online store.",
//     members: 6,
//     status: "In Review",
//     tasks: 9,
//   },
//   {
//     id: 4,
//     workspaceId: "My Workspace",
//     name: "Brand Guidelines",
//     description: "Design system + style guide for client.",
//     members: 4,
//     status: "Completed",
//     tasks: 44,
//   },
// ];

function Projects() {
  const { workspaceId } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const {
    projects,
    getProjects,
    createProject,
    editProject,
    deleteProject,
    setCurrentProject,
  } = useProjects();
  const { state } = useStore();
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const currentWorkSpaceProjects =
    workspaceId === "Select Workspace"
      ? projects
      : projects.filter((p) => p.workspace_id === workspaceId) || projects;

  const filters = [
    { value: "name", label: "By Name" },
    {
      value: "status",
      label: "By Status",
    },
  ];

  useEffect(() => {
    getProjects();
  }, [workspaceId]);

  //projects handler functions

  const WorkspaceName =
    state.workspaces.find((ws) => ws.id === workspaceId)?.name ||
    "No Workspace";

  const addPj = async (project) => {
    const result = await createProject(
      workspaceId,
      project.name,
      project.description
    );

    if (!result.error) {
      setSuccessAlert("Project created successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      getProjects();
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
  };

  const editPj = async (id, updatedData) => {
    const result = await editProject(id, {
      name: updatedData.name,
      description: updatedData.description,
      workspace_id: workspaceId,
      owner_id: state.auth.user?.id,
    });

    if (!result.error) {
      setSuccessAlert("Project updated successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      // getProjects();
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
  };

  const deletePj = async (id) => {
    const result = await deleteProject(id);
    if (!result.error) {
      setSuccessAlert("Project deleted successfully!");
      setTimeout(() => setSuccessAlert(null), 3000);
      // getProjects();
    }
    if (result.error) {
      setErrorAlert(result.error);
      setTimeout(() => setErrorAlert(null), 5000);
    }
  };

  // filetring projects based on search by name, status
  const filteredProjects = currentWorkSpaceProjects.filter((p) => {
    if (searchFilter === "name") {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (searchFilter === "status") {
      return p.status.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="px-2  h-full w-full relative">
      <h2 className="text-2xl font-bold text-black">
        Projects of <span className="text-gray-800">{WorkspaceName}</span>
      </h2>
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
      <div className="flex items-center justify-start gap-6 py-2">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          filters={filters}
          rounded={true}
          border={false}
        />
        <div
          className="w-40 h-10 rounded-xl border-2 border-gray-800 border-dashed hover:bg-white flex hover:cursor-pointer hover:border-double justify-between items-center px-4"
          onClick={() => {
            setEditData(null);

            setModalOpen(true);
          }}
        >
          <AddIcon sx={{ fontSize: 26, color: "black" }} />
          <p className="text-md text-gray-800 font-bold">Add Project</p>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap mt-4">
        {state.isProjectLoading ? (
          <div className="w-full flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              onEdit={() => {
                setEditData(project);
                setModalOpen(true);
              }}
              onDelete={() => {
                deletePj(project.id);
              }}
              onClick={() => {
                console.log(project);
                setCurrentProject(project);
              }}
            />
          ))
        )}
      </div>
      {!state.isProjectLoading && filteredProjects.length === 0 && (
        <p className="text-gray-600 italic">No projects found.</p>
      )}

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSave={(data) => {
          if (editData !== null) {
            editPj(editData.id, data);
          } else {
            addPj(data);
          }
          setEditData(null);
        }}
        initialData={editData}
      />
    </div>
  );
}

export default Projects;

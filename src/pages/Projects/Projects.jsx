import { useState, useEffect } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import ProjectCard from "./components/ProjectCard";
import SearchBar from "../../components/ui/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import ProjectModal from "./components/ProjectModal";

//dummy data

const allProjects = [
  {
    id: 1,
    workspaceId: "My Workspace",
    name: "Personal Portfolio Website",
    description: "A modern responsive portfolio built with React and Tailwind.",
    members: 2,
    status: "In Progress",
    tasks: 14,
  },
  {
    id: 2,
    workspaceId: "Wanclouds Inc.",
    name: "Cloud Migration Tool",
    description: "A tool for automating AWS → Azure migration.",
    members: 10,
    status: "Completed",
    tasks: 4,
  },
  {
    id: 3,
    workspaceId: "DesignHub Agency",
    name: "E-commerce Redesign",
    description: "UI/UX redesign for a fashion brand’s online store.",
    members: 6,
    status: "In Review",
    tasks: 9,
  },
  {
    id: 4,
    workspaceId: "My Workspace",
    name: "Brand Guidelines",
    description: "Design system + style guide for client.",
    members: 4,
    status: "Completed",
    tasks: 44,
  },
];

function Projects() {
  const { workspace } = useWorkspace();
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  let id = 5;

  const filters = ["name", "status"];

  useEffect(() => {
    const filtered = allProjects.filter((p) => p.workspaceId === workspace);
    setProjects(filtered);
  }, [workspace]);

  //projects handler functions

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: project.name + id }]);
  };

  const editProject = (id, updatedData) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // filetring projects based on search by name, status
  const filteredProjects = projects.filter((p) => {
    if (searchFilter === "name") {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (searchFilter === "status") {
      return p.status.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="px-2  h-full w-full ">
      <h2 className="text-2xl font-bold text-black">
        Projects of{" "}
        <span className="text-gray-800">{workspace || "No Workspace"}</span>
      </h2>
      <div className="flex items-center justify-start gap-6 py-2">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          filters={filters}
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

      {filteredProjects.length > 0 ? (
        <div className="flex gap-6 flex-wrap mt-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              onEdit={() => {
                setEditData(project);
                setModalOpen(true);
              }}
              onDelete={() => {
                deleteProject(project.id);
              }}
            />
          ))}
        </div>
      ) : (
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
            editProject(editData.id, data);
          } else {
            addProject(data);
          }
          setEditData(null);
        }}
        initialData={editData}
      />
    </div>
  );
}

export default Projects;

import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import SelectMenu from "../../components/ui/Select";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupIcon from "@mui/icons-material/Group";
import PaddedIcon from "../../components/ui/PaddedIcon";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import * as Plot from "@observablehq/plot";
import PlotFigure from "../../components/PlotFigure";
import TaskLogTable from "./components/TaskLogTable";
import { useStore } from "../../hooks/useStore";
import { PROJECT_ACTIONS } from "../../context/store/actionTypes";
import { useProjects } from "../../hooks/useProjects";
import { useProjectAnalytics } from "../../hooks/useProjectAnalytics";

const aapl = [
  { date: "2025-09-03", task: "4" },
  { date: "2025-09-04", task: "3" },
  { date: "2025-09-05", task: "5" },
  { date: "2025-09-06", task: "6" },
  { date: "2025-09-07", task: "7" },
  { date: "2025-09-08", task: "6" },
  { date: "2025-09-09", task: "8" },
  { date: "2025-09-10", task: "9" },
].map((d) => ({
  date: new Date(d.date), // Parse the string into a Date object
  task: +d.task,
}));

function Analytics() {
  const { workspaceId } = useWorkspace();
  const { getProjectAnalytics, analytics, currentProject } =
    useProjectAnalytics();
  const { dispatch } = useStore();

  const { projects, getProjects, isProjectLoading } = useProjects();
  const [projectId, setProjectId] = useState("Select Project");

  const filteredProjects =
    projects.filter((p) => p.workspace_id === workspaceId) || [];

  const projectItems =
    filteredProjects.map((p) => ({
      id: p.id,
      label: p.name,
      value: p.id,
    })) || [];
  console.log("Available workspaces:", projectItems);

  useEffect(() => {
    setProjectId(currentProject?.id);
    // When workspace changes, fetch projects of that workspace
    async function fetchProjectsForWorkspace() {
      if (!workspaceId) return;

      const data = await getProjects(); // wait for projects
      const workspaceProjects =
        data.filter((p) => p.workspace_id === workspaceId) || [];

      if (workspaceProjects.length > 0) {
        const firstProject = workspaceProjects[0];
        setProjectId(currentProject?.id || firstProject.id);
        dispatch({
          type: PROJECT_ACTIONS.SET_CURRENT_PROJECT,
          payload: firstProject,
        });
      } else {
        dispatch({ type: PROJECT_ACTIONS.SET_CURRENT_PROJECT, payload: "" });
        setProjectId("No Projects");
      }
    }

    fetchProjectsForWorkspace();
  }, [workspaceId]);

  useEffect(() => {
    if (projectId !== "") {
      console.log("Fetching analytics for project:", projectId);
      getProjectAnalytics(projectId);
    }
  }, [projectId]);

  function handleUpdate(pid) {
    setProjectId(pid);
    const project = projects.filter((pj) => {
      return pj.id === pid;
    });

    if (project)
      dispatch({
        type: PROJECT_ACTIONS.SET_CURRENT_PROJECT,
        payload: project[0],
      });
  }

  const projectAnalytics = analytics;

  // Quick Stats
  // const quickStats = [
  //   { label: "Total Tasks", value: 20, icon: AssignmentIcon },
  //   { label: "Completed", value: 8, icon: TaskAltIcon },
  //   {
  //     label: "Active Tasks",
  //     value: 12,
  //     icon: AssignmentIndIcon,
  //   },
  //   {
  //     label: "My Tasks",
  //     value: 2,
  //     icon: PlaylistAddCheckRoundedIcon,
  //   },
  //   { label: "Members", value: 9, icon: GroupIcon, color: "#475569" },
  // ];

  return (
    <div className="w-full h-full px-2 text-gray-800">
      <div className="flex justify-between pr-5 mb-2">
        <h2 className="text-2xl text-black font-bold ">Analytics </h2>
        <div className="flex items-center">
          <p className="text-xs">Project: </p>
          {isProjectLoading ? (
            <div className="w-full flex justify-center items-center p-1 ">
              <div className="w-5 h-5 border-3 border-gray-700 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <SelectMenu
              items={projectItems}
              value={projectId}
              color="text-gray-800"
              header={true}
              height={40}
              onChange={(e) => {
                handleUpdate(e.target.value);
              }}
            />
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <Stat
          label="Total Tasks"
          value={projectAnalytics?.total_tasks ?? 0}
          icon={AssignmentIcon}
        />
        <Stat
          label="Completed"
          value={projectAnalytics?.completed_tasks ?? 0}
          icon={TaskAltIcon}
        />
        <Stat
          label="Active Tasks"
          value={
            (projectAnalytics?.todo_tasks ?? 0) +
            (projectAnalytics?.in_progress_tasks ?? 0)
          }
          icon={AssignmentIndIcon}
        />
        <Stat
          label="My Tasks"
          value={projectAnalytics?.tasks_by_assignee?.[0]?.task_count ?? 0}
          icon={PlaylistAddCheckRoundedIcon}
        />
        <Stat label="Members" value={10} icon={GroupIcon} />
      </div>
      <div className="flex justify-center h-[70%] gap-4">
        <div className=" bg-white w-1/2 px-4 py-4 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4 pr-6">
            <h3 className="font-semibold text-lg">Task Completion Trend</h3>
            <p className="text-xs ">last week</p>
          </div>

          <PlotFigure
            options={{
              y: { grid: true },
              marks: [
                Plot.areaY(aapl, {
                  x: "date",
                  y: "task",
                  fill: "#4C5E70",
                  fillOpacity: 0.1,
                }),
                Plot.line(aapl, { x: "date", y: "task", stroke: "steelBlue" }),
              ],
            }}
          />
        </div>
        <div className="bg-white w-1/2 px-4 pt-4 rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-1">Tasks Activity Log</h3>
          <TaskLogTable analytics={projectAnalytics} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="bg-white shadow rounded-xl px-4 py-6 flex flex-col gap-2 items-start border-l-4 border-[#475569]">
      <div className="flex justify-start gap-2">
        <PaddedIcon Icon={icon} color="black" bgColor={"lightGray"} />
        <p className="text-gray-500 text-lg font-semibold">{label}</p>
      </div>

      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default Analytics;

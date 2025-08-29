import Avatar from "./ui/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "./ui/Badge";
import SearchBar from "./ui/SearchBar";

function Header() {
  return (
    <header className="w-full h-[13%] p-1 flex ">
      <div className=" bg-gray-800 text-white rounded-xl w-full h-full flex items-center justify-between px-6 shadow-sm">
        <div className="flex ">
          <SearchBar />
          {/* <h2 className="text-xl font-bold">Project Management</h2> */}
        </div>

        <div className="flex items-end justify-center">
          <div className="flex items-center justify-center relative w-8 h-8 mr-5 cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-lg">
            <NotificationsIcon sx={{ fontSize: 20, color: "white" }} />
            <div className="absolute bottom-5 left-5 flex items-center justify-center">
              <Badge text={4} color="red" />
            </div>
          </div>

          <Avatar
            alt="User Img"
            src="https://avatar.iran.liara.run/public/75"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

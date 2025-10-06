import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen dark:bg-black bg-white">
      <h1 className="text-2xl py-2 font-bold text-black dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link to={"/"}> Go back to Home</Link>
    </div>
  );
}

export default PageNotFound;

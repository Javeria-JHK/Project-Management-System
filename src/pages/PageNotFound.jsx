import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
      <h1 className="text-2xl font-bold text-black">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link to={"/"}> Go back to Home</Link>
    </div>
  );
}

export default PageNotFound;

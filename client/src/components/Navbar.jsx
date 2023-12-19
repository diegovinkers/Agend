import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = UseAuth();
  return (
    <nav className="bg-zinc-700 my-1 flex justify-between py-4 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-500 mx-10 px-4 py-1 rounded-md"
              >
                Add task
              </Link>
            </li>            <li>
              <Link
                to="/tasks"
                className="bg-indigo-500 mx-10 px-4 py-1 rounded-md"
              >
                Tasks
              </Link>
            </li>
            <li>
                <Link
                    onClick={() => {logout();}}
                    className="bg-indigo-500 px-4 py-1 rounded-md"
                    >
                    Logout
                </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-md">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-md"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/registerprofessional"
                className="bg-indigo-500 px-4 py-1 rounded-md"
              >
                Register as a professional
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const ProfileCard = ({ user, numberOfProblems, smloading, handleSignOut }) => {
  return (
    <div>
      <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md px-10 py-7 font-defonts">
        <div class="flex flex-col items-center ">
          <h5 class="mb-1 text-xl font-medium text-gray-900 ">
            {user?.displayName}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Problems Solved :{" "}
            {smloading ? (
              <ReactLoading
                type="cylon"
                color="#303F9F"
                height={"50%"}
                width={"50%"}
              />
            ) : (
              <span>{ numberOfProblems }</span>
            )}
          </span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <Link
              to="/"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continue Solving
            </Link>
            <button
              onClick={handleSignOut}
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

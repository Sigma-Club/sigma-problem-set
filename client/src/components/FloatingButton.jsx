import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/outline";

const FloatingButton = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {user ? (
        <button
          type="button"
          onClick={handleSignOut}
          className="bg-primary-bg p-2 rounded-full text-head focus:outline-none fixed bottom-5 right-5 z-40"
        >
          <LogoutIcon className="h-7 w-7 p-1" aria-hidden="true" />
        </button>
      ) : (
        <Link
          to="/login"
        >
         <button
          type="button"
          className="bg-primary-bg p-2 rounded-full text-head focus:outline-none  fixed bottom-5 right-5 z-40"
        >
          <UserCircleIcon className="h-7 w-7 p-1" aria-hidden="true" />
        </button>
        </Link>
      )}
    </div>
  );
};

export default FloatingButton;

// const Navbar = () => {
//   const { user, logOut } = UserAuth();

//   const handleSignOut = async () => {
//     try {
//       await logOut()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className='flex justify-between bg-gray-200 w-full p-4'>
//       {user?.displayName ? (
//         <button onClick={handleSignOut}>Logout</button>
//       ) : (
//         <Link to='/login'>Sign in</Link>
//       )}
//     </div>
//   );
// };

// export default Navbar;

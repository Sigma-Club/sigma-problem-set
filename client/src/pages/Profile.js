import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { UserAuth } from "../context/AuthContext";
import {  doc, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

const Profile = () => {
  const { logOut, user } = UserAuth();
  const [smloading, setSmLoading] = useState();
  const [numberOfProblems, setNumberOfProblems] = useState();
  function getSolvedProblems() {
    setSmLoading(true);
    const docRef = doc(db, "users-progress", user.uid);
    getDoc(docRef).then((doc) => {
      //console.log(doc.data());
      if (doc.data() == undefined || doc.data == null) {
        setNumberOfProblems(0);
      } else {
        var obj = doc.data().solved_problems;
        var cnt = 0;
        for(const ckey in obj){
          if(obj[ckey] == true) cnt++;
        }
        setNumberOfProblems(cnt);
      }
    });

    setSmLoading(false);
  }

  useEffect(async () => {
    //fetch user's solved problems from firebase
    getSolvedProblems();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      {/* <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
        Logout
      </button> */}
      <div className="table-container">
        <div className="font-defont text-3xl sm:text-4xl md:text-5xl text-head font-bold text-left flex items-center">
          Sigma Pr
          <span className="flex items-center">
            <img
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/moai_1f5ff.png"
              className="w-8 h-7 md:w-10 md:h-10 sm:w-9 sm:h-9"
            />
          </span>
          blem Set
        </div>
        <ProfileCard
          user={user}
          numberOfProblems={numberOfProblems}
          smloading={smloading}
          handleSignOut = {handleSignOut}
        />
      </div>
    </div>
  );
};

export default Profile;

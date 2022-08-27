import Header from "../components/Header";
import ProblemSet from "../components/ProblemSet";
// import ToolTip from "../components/Tooltip";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Problems = () => {
  const { user } = UserAuth();
  const [solved, setsolved] = useState([]);

  const onDataChange = (key, value) => {
    setsolved({
      ...solved,
      [key]: value,
    });
  };

  return (
    <div>
      <Header />
      {/* <ToolTip /> */}
      <div className="table-container">
        <div className="font-defont text-3xl sm:text-4xl md:text-5xl text-head font-bold text-left flex items-center">
          Sigma Pr
          {!user ? (
            <span className="flex items-center">
              <img
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/moai_1f5ff.png"
                className="w-8 h-7 md:w-10 md:h-10 sm:w-9 sm:h-9"
              />
            </span>
          ) : (
            <Link to="/profile">
              <span className="flex items-center">
                <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/moai_1f5ff.png"
                  className="w-8 h-7 md:w-10 md:h-10 sm:w-9 sm:h-9"
                />
              </span>
            </Link>
          )}
          blem Set
        </div>
        {/* <button onClick={createProgress}>Create Progress</button> */}
        <ProblemSet solved={solved} onDataChange={onDataChange} setsolved = {setsolved} />
      </div>
    </div>
  );
};

export default Problems;

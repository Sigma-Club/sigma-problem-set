import Header from "../components/Header";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleButton } from "react-google-button";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Header />
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
        <div className="flex justify-center items-center w-80 h-80 font-defonts">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Login;

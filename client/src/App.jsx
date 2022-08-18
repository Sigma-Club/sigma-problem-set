import "./App.css";
import Login from "./pages/Login";
import Problems from "./pages/Problems";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import FloatingButton from "./components/FloatingButton";
import Profile from "./pages/Profile";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App ">
      <AuthContextProvider>
      <FloatingButton />
        <Routes>
          <Route path="/" element={<Problems />} />
          <Route path="login" element={<Login />} />
          <Route
            path='/profile'
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

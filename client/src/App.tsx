import "./App.css";

import { Login } from "./pages/login";

import { useState } from "react";
import { Admin } from "./pages/Admin.tsx";
import { Client } from "./pages/client.tsx";

function App() {
  const [status, setstatus] = useState<boolean>(true);
  const [position, setposition] = useState<string>("client");

  const logout = () => {
    setstatus(false);
  };

  return (
    <>
      {status && position === "admin" ? (
        <Admin logout={logout} />
      ) : status && position === "client" ? (
        <Client />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;

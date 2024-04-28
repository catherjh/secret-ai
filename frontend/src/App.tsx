import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import { Voting } from "./Voting";

const App: React.FC<{}> = () => {
  const [users, setUsers] = React.useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      const newId = (Math.random() + 1).toString(36).substring(7);
      localStorage.setItem("userId", newId);
    }
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col w-100 h-100">
      {userId === null ? (
        <div>Loading...</div>
      ) : (
        <div className="w-3/4">
          <Chat setUsers={setUsers} userId={userId} />
          <Voting users={users} userId={userId}/>
        </div>
      )}
    </div>
  );
};

export default App;

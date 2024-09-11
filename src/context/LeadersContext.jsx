import { createContext, useState } from "react";

export const LeadersContext = createContext();

export function LeadersProvider({ children }) {
  const [leaders, setLeaders] = useState([]);
  const [isLeader, setIsLeader] = useState(false);

  return (
    <LeadersContext.Provider value={{ leaders, setLeaders, isLeader, setIsLeader }}>{children}</LeadersContext.Provider>
  );
}

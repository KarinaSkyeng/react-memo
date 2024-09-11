import { useContext } from "react";
import { LeadersContext } from "../context/LeadersContext";

export function useLeaders() {
  return useContext(LeadersContext);
}

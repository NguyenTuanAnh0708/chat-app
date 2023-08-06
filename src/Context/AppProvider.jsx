import { createContext, useContext, useMemo } from "react";
import { AuthConText } from "./AuthProvider";
import useFireStore from "../hooks/useFireStore";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const {
    user: { uid },
  } = useContext(AuthConText);
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFireStore("rooms", roomsCondition);
  return (
    <AppContext.Provider value={{ rooms: rooms }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;

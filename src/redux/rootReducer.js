// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import users from "@src/views/apps/user/store";
import navigationSlice from "./navigationSlice";

const rootReducer = {
  // auth,

  users,
  navbar,
  layout,
  navigationSlice,
};

export default rootReducer;

// import { history } from "../../../history";
// import { module_ids } from "../../../components/@general/data";
// import { sitesLoading, GetSites, errSites } from "../sites";
// import { regionsLoading, GetRegions, errRegions } from "../regions";
// import errorHandler from "../../../components/@apis/helpers/errorHandler";

import { createBrowserHistory } from "history";
import { SC } from "../views/components/wasfatyComp/Api/serverCall";

const history = createBrowserHistory();

export const getUser = () => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    SC.postCall({ url: "token" }).then(
      (response) => {
        if (response.status === 200 && response.data) {
          localStorage.setItem(
            "userData",
            JSON.stringify(res.data.data.user[0])
          );
        }
      },
      (err) => {
        if (err) {
          history.push("/login");
        }
      }
    );
  };
};

export const login = (data) => {
  return async (dispatch) => {
    SC.postCallWithoutAuth({ url: "login", data }).then(
      (response) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshToken)
        );
      },
      (err) => {
        if (err) {
          history.push("/login");
        }
      }
    );
  };
};

export const logout = ({ email }) => {
  return async (dispatch) => {
    localStorage.clear();

    // if (email) SC.getCall({ url: "logout", params: filters });
    history.push("/login");
  };
};

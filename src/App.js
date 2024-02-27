import { Suspense, useEffect, useState, useContext } from "react";
import "./global.css";
// ** Router Import
import Router from "./router/Router";

// ** Routes & Default Routes
import { getRoutes } from "./router/routes";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
import { getUserData } from "@utils";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { OnlineStatusProvider } from "./utility/context/OnlineContext";
import { SC } from "./views/wasfaty/Api/serverCall";
import { useIntl } from "react-intl";
import { IntlService, NavigationService } from "./views/wasfaty/services";
import Spinner from "./@core/components/spinner/Fallback-spinner";
import { IntlContext } from "./utility/context/IntelContext";

import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
`;

const App = () => {
  const [allRoutes, setAllRoutes] = useState([]);
  const intl = useIntl();
  const [init, setInit] = useState(false);
  const intlContext = useContext(IntlContext);
  const navigation = useNavigate();

  const isDevelopment = process.env.REACT_APP_DEVELOPMENT;

  // ** Hooks
  const { layout } = useLayout();

  useEffect(() => {
    NavigationService.setNavigation(navigation);
  }, [navigation]);

  useEffect(() => {
    IntlService.setIntl(intl);
  }, [intl]);

  useEffect(() => {
    initAll();
  }, []);

  const initAll = async () => {
    setInit(true);
  };

  useEffect(() => {
    let onRoutes = async () => {
      let routes = await getRoutes(layout);
      setAllRoutes([...routes]);
    };

    if (getUserData()?._id) {
      SC.getCall({ url: "token" })
        .then((res) => {
          try {
            if (res?.data && res?.data?.data?.user[0]) {
              localStorage.setItem(
                "userData",
                JSON.stringify(res?.data?.data?.user[0])
              );
            }
          } catch (error) {}

          onRoutes();
        })
        .catch(() => {
          onRoutes();
        });
    } else {
      onRoutes();
    }
  }, [layout]);

  if (!init) return <Spinner />;
  return (
    <>
      <GlobalStyles />
      <OnlineStatusProvider>
        <Suspense fallback={null}>
          <Router allRoutes={[...allRoutes]} />
          {/* <ToastContainer /> */}
        </Suspense>
      </OnlineStatusProvider>
    </>
  );
};

export default App;

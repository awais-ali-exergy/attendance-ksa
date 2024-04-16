// ** React Imports
import ReactDOM from "react-dom";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

// ** Redux Imports
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./global.css";
// ** Intl, CASL & ThemeColors Context
import ability from "./configs/acl/ability";
import { AbilityContext } from "./utility/context/Can";
import { ThemeContext } from "./utility/context/ThemeColors";

// ** ThemeConfig
import themeConfig from "./configs/themeConfig";

// ** Toast
import { Toaster } from "react-hot-toast";

// ** i18n
import "./configs/i18n";
// ** import flatpickr
import "./@core/scss/react/libs/flatpickr/flatpickr.scss";

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";
// Flat picker
import "./@core/scss/react/libs/flatpickr/flatpickr.scss";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
// intelProvider
import { IntlProviderWrapper } from "../src/utility/context/IntelContext";
// ** Service Worker
import * as serviceWorker from "./serviceWorker";
import { IntlProvider } from "react-intl";
import { unProtectedRoutes } from "./UnprotectedRoutes";
import { createBrowserHistory } from "history";

//Bugsnag
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

Bugsnag.start({
  apiKey: "ec485e6d140e279db5ccf83ce55bd599",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const originalSetItem = localStorage.setItem;

// localStorage.setItem = function (key, value) {
//   const event = new Event("localStorageInsert");

//   event.value = value; // Optional..
//   event.key = key; // Optional..

//   if (key === "userData") {
//     document.dispatchEvent(event);
//   }

//   originalSetItem.apply(this, arguments);
// };

// when token saved uncoment this

const history = createBrowserHistory();
const token = localStorage.getItem("accessToken");
const routes = history.location.pathname.split("/");
const unAuthorizedRoutes = unProtectedRoutes.filter((upRoutes) =>
  routes.includes(upRoutes)
)?.length;

if (!token) {
  // store.dispatch(handleLogout());
  if (!unAuthorizedRoutes) {
    // history.push("/login");
  }
}
// setTimeout(() => {
//   Bugsnag.notify(new Error("Test error react  "));
// }, 2000);

ReactDOM.render(
  <ErrorBoundary>
    <HashRouter basename="/">
      <Provider store={store}>
        <IntlProviderWrapper>
          <Suspense fallback={<Spinner />}>
            <AbilityContext.Provider value={ability}>
              <ThemeContext>
                <LazyApp />
                <Toaster
                  position={themeConfig.layout.toastPosition}
                  toastOptions={{ className: "react-hot-toast" }}
                />
              </ThemeContext>
            </AbilityContext.Provider>
          </Suspense>
        </IntlProviderWrapper>
      </Provider>
    </HashRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

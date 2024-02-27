import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import classnames from "classnames";
import { IntlService } from "../../../../views/wasfaty/services";
// import ESurveyService from "../../../../views/wasfaty/services/ESurveyService";
import { getBreadcrumbs } from "../../../../views/wasfaty/services/GetBreadcrumbs";
import startCase from "lodash/startCase";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  let breadcrumbs = getBreadcrumbs(pathname);
  // ESurveyService.esurveySideMenu.forEach((sideMenu) => {
  //   if (
  //     sideMenu?.children?.length &&
  //     sideMenu.children.filter(
  //       (item) => item.id === breadcrumbs[0]?.route.replace("/", "")
  //     )?.length > 0
  //   ) {
  //     breadcrumbs = breadcrumbs.slice(0, 1);
  //     breadcrumbs[0].clickable = false;
  //   }
  // });
  return (
    <Breadcrumb className="nav-breadcrumbs">
      {breadcrumbs
        .filter((item) => item.pathname !== "/")
        .map(({ name, route, clickable }, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <span className="breadcrumb-separator"></span>}
            {/* <BreadcrumbItem>
              <Link
                to={route}
                className={classnames({
                  "active-route": location.pathname === route,
                })}
                onClick={(event) => {
                  !clickable && event.preventDefault();
                }}
              >
                {"User"}
              </Link>
            </BreadcrumbItem> */}
          </React.Fragment>
        ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

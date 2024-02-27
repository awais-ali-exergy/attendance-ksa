import { startCase, forEach } from "lodash";
export const getBreadcrumbs = (pathname) => {
  const urlPath = pathname.split("/");
  const [, ...usablePath] = urlPath;
  if (usablePath?.length && usablePath[usablePath.length - 1] === "") {
    usablePath.splice(-1);
  }
  let breadCrumbs = [];
  let fullTrailPath = "/";

  forEach(usablePath, (path, i) => {
    fullTrailPath =
      fullTrailPath + `${path + (i !== usablePath.length - 1 ? "/" : "")}`;
    breadCrumbs.push({
      name: path,
      route:
        fullTrailPath[fullTrailPath.length - 1] === "/"
          ? fullTrailPath.slice(0, fullTrailPath.length - 1)
          : fullTrailPath,
      clickable: true,
    });
  });

  // In case of edit path remove the id before edit
  if (pathname.includes("Edit")) {
    breadCrumbs.splice(breadCrumbs.length - 2, 1);
    breadCrumbs[breadCrumbs.length - 1].name = "Edit";
  }
  // In case of Details path remove the id before Details
  if (pathname.includes("Details")) {
    breadCrumbs.splice(breadCrumbs.length - 2, 1);
    breadCrumbs[breadCrumbs.length - 1].name = "Details";
  }

  return breadCrumbs;
};

const root = "src/";
const form = "./Form";
const fs = require("fs");
const { startCase, snakeCase } = require("lodash");
const readline = require("readline");
const path = require("path");
// fs.readFileSync("./Form/ModalTemplate");

// to replace

// %Template%
// %TemplateSlug%
// %TemplateName%

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter the module Name: ", (moduleName) => {
  rl.question("Enter the slug Name (eg: Private-Hospital): ", (slugName) => {
    //Modal
    fs.readFile(form + "/ModalTemplate.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      let result = data
        .replace(/%Template%/g, moduleName)
        .replace(/%TemplateSlug%/g, slugName);

      fs.writeFile(
        "../src/views/wasfaty/Models/" + moduleName + "Model.js",
        result,
        "utf8",
        function (err) {
          if (err) return console.log(err);
          console.log("Model created successfully!");
        }
      );
    });

    //Service
    fs.readFile(form + "/ServiceTemplate.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      let result = data
        .replace(/%Template%/g, moduleName)
        .replace(/%TemplateSlug%/g, slugName);

      fs.writeFile(
        "../src/views/wasfaty/services/" + moduleName + "Service.js",
        result,
        "utf8",
        function (err) {
          if (err) return console.log(err);
          console.log("Service created successfully!");
        }
      );
    });
    fs.appendFile(
      "../src/views/wasfaty/services/index.js",
      `export { default as ${moduleName}Service } from "./${moduleName}Service";`,
      (err) => {
        if (err) {
          console.error("Error appending data to Service Index:", err);
        } else {
          console.log("Data appended to Service Index successfully!");
        }
      }
    );

    //Nav links
    fs.readFile(
      "../src/navigation/vertical/pages.js",
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        const lines = data.split("\n");
        const index = lines.findIndex((line) =>
          line.startsWith("  // %template%")
        );

        lines.splice(
          index + 1,
          0,
          `{
          id: "${snakeCase(slugName)}",
          slug: "${slugName}",
          title: "${startCase(moduleName) + " Form"}",
          icon: () => PrivateHoispitalIcon,
          navLink: "${"/" + slugName}",
        },`
        );
        const newData = lines.join("\n");
        try {
          fs.writeFileSync("../src/navigation/vertical/pages.js", newData);
          console.log("Nav links created succefully");
        } catch (e) {
          console.log("==> Nav links not created", e);
        }
      }
    );

    //add
    try {
      if (!fs.existsSync(`${"../src/views/pages/Add/" + moduleName}`)) {
        fs.mkdirSync(`${"../src/views/pages/Add/" + moduleName}`);
      }
      path.join(`${"../src/views/pages/Add/" + moduleName}`, "index.js");

      fs.readFile(form + "/Add/index.txt", "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        let result = data
          .replace(/%Template%/g, moduleName)
          .replace(/%TemplateSlug%/g, slugName);
        fs.writeFileSync(
          path.join(`${"../src/views/pages/Add/" + moduleName}`, "index.js"),
          result
        );
      });
      fs.copyFileSync(
        "./Form/Add/style.scss",
        path.join(`${"../src/views/pages/Add/" + moduleName}`, "style.scss")
      );

      console.log("Add Created");
    } catch {
      console.log("Add Not Created");
    }

    //list
    try {
      fs.readFile(form + "/List/list.txt", "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        let result = data
          .replace(/%Template%/g, moduleName)
          .replace(/%TemplateSlug%/g, slugName)
          .replace(/%TemplateName%/g, startCase(moduleName));
        fs.writeFileSync(
          "../src/views/pages/List/" + moduleName + ".js",
          result
        );
      });

      console.log("List Created");
    } catch {
      console.log("List Not Created");
    }

    //Show
    try {
      fs.readFile(form + "/Show/show.txt", "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        let result = data
          .replace(/%Template%/g, moduleName)
          .replace(/%TemplateSlug%/g, slugName)
          .replace(/%TemplateName%/g, startCase(moduleName));
        fs.writeFileSync(
          "../src/views/pages/Show/" + moduleName + ".js",
          result
        );
      });

      console.log("Show Created");
    } catch {
      console.log("Show Not Created");
    }

    //MAking the routes
    // %templateImport%

    //AddRoutes
    fs.readFile(
      "../src/router/routes/AddRoutes.js",
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        const lines = data.split("\n");
        const indexOfRoute = lines.findIndex((line) =>
          line.startsWith("  // %template%")
        );
        const indexOfImport = lines.findIndex((line) =>
          line.startsWith("// %templateImport%")
        );
        lines.splice(
          indexOfImport + 1,
          0,
          `const ${moduleName} = lazy(() =>
      import("../../views/pages/Add/${moduleName}")
    );`
        );
        lines.splice(
          indexOfRoute + 1,
          0,
          `{
        element: <${moduleName} />,
        path: "/${slugName}/Add",
        route: "${slugName}",
        slug: "${slugName}",
        title: "${startCase(moduleName)} Form",
        isForm: true,
      },
      {
        element: <${moduleName} key={"tasks-route"} />,
        path: "/${slugName}/Add/:task_id",
        route: "${slugName}",
        slug: "${slugName}",
        title: "${startCase(moduleName)} Form",
        isForm: true,
      },
 
      `
        );
        const newData = lines.join("\n");
        try {
          fs.writeFileSync("../src/router/routes/AddRoutes.js", newData);
          console.log("Add links created succefully");
        } catch (e) {
          console.log("==> Add links not created", e);
        }
      }
    );

    //DetailsRouter
    fs.readFile(
      "../src/router/routes/DetailsRouter.js",
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        const lines = data.split("\n");
        const indexOfRoute = lines.findIndex((line) =>
          line.startsWith("  // %template%")
        );
        const indexOfImport = lines.findIndex((line) =>
          line.startsWith("// %templateImport%")
        );
        lines.splice(
          indexOfImport + 1,
          0,
          `const ${moduleName} = lazy(() =>
      import("../../views/pages/Show/${moduleName}")
    );`
        );
        lines.splice(
          indexOfRoute + 1,
          0,
          `{
        element: <${moduleName} />,
        path: "/${slugName}/Details/:id",
        route: "${slugName}",
        slug: "${slugName}",
        title: "${startCase(moduleName)} Form",
      },
       {
      element: <${moduleName} key={"tasks-route"} />,
      path: "/${slugName}/Task/:task_id",
      route: "${slugName}",
      slug: "${slugName}",
      title: "${startCase(moduleName)} Form",
      },`
        );
        const newData = lines.join("\n");
        try {
          fs.writeFileSync("../src/router/routes/DetailsRouter.js", newData);
          console.log("Show links created succefully");
        } catch (e) {
          console.log("==> Show links not created", e);
        }
      }
    );

    //ListRoutes
    fs.readFile(
      "../src/router/routes/ListRoutes.js",
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        const lines = data.split("\n");
        const indexOfRoute = lines.findIndex((line) =>
          line.startsWith("  // %template%")
        );
        const indexOfImport = lines.findIndex((line) =>
          line.startsWith("// %templateImport%")
        );
        lines.splice(
          indexOfImport + 1,
          0,
          `const ${moduleName} = lazy(() =>
      import("../../views/pages/List/${moduleName}")
    );`
        );
        lines.splice(
          indexOfRoute + 1,
          0,
          `{
        element: <${moduleName} />,
        path: "/${slugName}",
        route: "${slugName}",
        slug: "${slugName}",
        title: "${startCase(moduleName)} Form",
      },
       {
    element: <ObligationGraph />,
    path: "/${slugName}/Dashboard",
    route:"${slugName}",
    slug:"${slugName}",
    title: "${startCase(moduleName)} Form",
  },
      `
        );
        const newData = lines.join("\n");
        try {
          fs.writeFileSync("../src/router/routes/ListRoutes.js", newData);
          console.log("List links created succefully");
        } catch (e) {
          console.log("==> List links not created", e);
        }
      }
    );
    rl.close();
  });
});

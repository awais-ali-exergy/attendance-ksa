const fs = require("fs");
const { startCase, snakeCase } = require("lodash");
const path = require("path");

const moduleName = "DentalLab"; // Replace with the module name that was used in the original script
const slugName = "Dental-Lab"; // Replace with the slug name that was used in the original script

// Remove the generated files
fs.unlinkSync(`../src/views/wasfaty/Models/${moduleName}Model.js`);
fs.unlinkSync(`../src/views/wasfaty/services/${moduleName}Service.js`);
fs.unlinkSync(`../src/views/pages/List/${moduleName}.js`);
fs.unlinkSync(`../src/views/pages/Show/${moduleName}.js`);
fs.rmdirSync(`../src/views/pages/Add/${moduleName}`, { recursive: true });

// Remove the changes made to other files
const pagesFilePath = "../src/navigation/vertical/pages.js";
const pagesFileContent = fs.readFileSync(pagesFilePath, "utf8");
const pagesLines = pagesFileContent.split("\n");
const index = pagesLines.findIndex((line) =>
  line.includes(snakeCase(slugName))
);
if (index !== -1) {
  pagesLines.splice(index, 1);
  fs.writeFileSync(pagesFilePath, pagesLines.join("\n"));
}

const serviceIndexFilePath = "../src/views/wasfaty/services/index.js";
const serviceIndexFileContent = fs.readFileSync(serviceIndexFilePath, "utf8");
const serviceIndexLines = serviceIndexFileContent.split("\n");
const serviceIndexLine = `export { default as ${moduleName}Service } from "./${moduleName}Service";`;
const serviceIndexLineIndex = serviceIndexLines.findIndex(
  (line) => line === serviceIndexLine
);
if (serviceIndexLineIndex !== -1) {
  serviceIndexLines.splice(serviceIndexLineIndex, 1);
  fs.writeFileSync(serviceIndexFilePath, serviceIndexLines.join("\n"));
}

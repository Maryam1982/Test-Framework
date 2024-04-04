const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const render = require("./render");

const forbiddenDirs = ["node_mdodules"];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  //Find all files with *.test.js
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);
    //Save reference to these files for later execution
    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stat = await fs.promises.lstat(filePath);
      if (stat.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stat.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(
          ...childFiles.map((f) => {
            return path.join(file, f);
          })
        );
      }
    }
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.grey(`----${file.shortName}`));
      const beforeEaches = [];
      global.render = render;
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = async (desc, fn) => {
        beforeEaches.forEach((fn) => fn());
        try {
          await fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, "\n\t\t");
          console.log(chalk.red(`\tX - ${desc}`));
          console.log("\t", chalk.red(message));
        }
      };
      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.red(err));
      }
    }
  }
}

module.exports = Runner;

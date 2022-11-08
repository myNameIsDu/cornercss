import semver from "semver";
import inquirer from "inquirer";
import "zx/globals";
await $`pnpm gulp release`;
const pkg = await fs.readJson("./package.json");

let { type } = await inquirer.prompt([
  {
    type: "list",
    message: chalk.green("what kids of bump do you want to use"),
    choices: ["patch", "minor", "major"],
    name: "type",
  },
]);
const newVersion = semver.inc(pkg.version, type);

await fs.writeJson(
  "./package.json",
  { ...pkg, version: newVersion },
  { spaces: 2 }
);

await fs.copy("./package.json", "./assets/package.json");
cd("./assets");
await $`npm publish`;
cd("../");
await $`git add .`;
await $`git commit -m "release ${newVersion}"`;

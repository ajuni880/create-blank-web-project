const currentDir = process.cwd();
const [/*node path*/, /*filepath*/, projectName] = process.argv;
const path = require('path');
const fs = require('fs').promises;

if (!projectName) {
  console.log("Please provide a name for your project");
  return;
}

const projectPath = path.resolve(currentDir, projectName);
const templatesPath = path.resolve(__dirname, 'templates');

async function run() {
  try {
    await fs.mkdir(projectPath);
    await copyFiles();
    showFeedback();
  } catch (e) {
    console.log(e);
  }
}

async function copyFiles() {
  const templates = await fs.readdir(templatesPath);
  for await (let filename of templates) {
    const content = await fs.readFile(path.resolve(templatesPath, filename));
    await fs.writeFile(path.resolve(projectPath, filename), content);
  }
}

function showFeedback() {
  console.log(`Project created successfully!\n> cd ${projectName}`);
}

module.exports = run;
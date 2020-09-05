const currentDir = process.cwd();
const [/*node path*/, /*filepath*/, projectName] = process.argv;
const path = require('path');
const CopyFiles = require('./copy-files');

let projectPath;
let templatesPath;

async function run() {
  if (!projectName) {
    console.log("Please provide a name for your project");
    return;
  }

  projectPath = path.resolve(currentDir, projectName);
  templatesPath = path.resolve(__dirname, 'templates');

  try {
    await new CopyFiles({ templatesPath, projectPath }).copy();
    showFeedback();
  } catch (e) {
    console.log(e.message);
  }
}

function showFeedback() {
  console.log(`Project created successfully!\n> cd ${projectName}`);
}

module.exports = run;
const fs = require('fs').promises;
const path = require('path');

class CopyFiles {

  constructor({ projectPath, templatesPath }) {
    this.files =  null;
    this.projectPath = projectPath;
    this.templatesPath = templatesPath;
  }

  async mkdir() {
    await fs.mkdir(this.projectPath);
  }

  async copy() {
    await this.mkdir();
    this.files = await fs.readdir(this.templatesPath);
    const contents = await this.readFiles(this.files);
    await this.writeFiles(contents);
  }

  readFiles(files) {
    const readPromises = files.map(file => fs.readFile(path.resolve(this.templatesPath, file)));
    return Promise.all(readPromises);
  }

  writeFiles(filesContent) {
    const writePromises = filesContent.map((content, i) =>
      fs.writeFile(path.resolve(this.projectPath, this.files[i]), content));
    return Promise.all(writePromises);
  }
}

module.exports = CopyFiles;
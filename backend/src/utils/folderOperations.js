const fs = require('fs');
const path = require('path');

async function getFolderNames(rootFolderPath) {
  try {
    const items = await fs.readdirSync(rootFolderPath);
    const folderNames = items.filter((item) => {
      const itemPath = path.join(rootFolderPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return folderNames;
  } catch (error) {
    throw error;
  }
}

async function generateReportForFolder(folderPath) {
  try {
    const files = await fs.readdirSync(folderPath);

    const report = {
      totalFiles: files.length,
      filesByType: {},
      metadata: [],
    };
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileStats = await fs.statSync(filePath);
      const fileType = fileStats.isDirectory() ? 'Folder' : path.extname(file);

      if (!report.filesByType[fileType]) {
        report.filesByType[fileType] = 1;
      } else {
        report.filesByType[fileType]++;
      }

      report.metadata.push({
        fileName: file,
        fileSize: fileStats.size,
        fileType,
        createdAt: fileStats.birthtime,
        updatedAt: fileStats.mtime,
      });
    }

    return report;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getFolderNames,
  generateReportForFolder,
};

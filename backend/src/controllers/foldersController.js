const path = require('path');
const fs = require('fs');
const {
  getFolderNames,
  generateReportForFolder,
} = require('../utils/folderOperations');

const rootFolderPath = '/Users/mac/tests';

exports.folders = async (req, res) => {
  try {
    const items = await fs.readdirSync(rootFolderPath);
    const folderNames = await getFolderNames(rootFolderPath);
    res.json(folderNames);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.report = async (req, res) => {
  try {
    const folderName = req.params.folderName;
    const folderPath = path.join(rootFolderPath, folderName);

    const report = await generateReportForFolder(folderPath);
    report.folderName = folderName;

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

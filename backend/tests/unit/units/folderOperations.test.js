const fs = require('fs');
const path = require('path');
const {
  getFolderNames,
  generateReportForFolder,
} = require('../../../src/utils/folderOperations');

jest.mock('fs');

describe('folderOperations', () => {
  const rootFolderPath = '/Users/mac/tests';
  const folderPath = '/Users/mac/tests/Folder 1';

  beforeEach(() => {
    fs.readdirSync.mockImplementation((folderPath) => {
      return ['file1.txt', 'file2.txt', 'Folder 2'];
    });

    fs.statSync.mockImplementation((filePath) => {
      return {
        isDirectory: () => path.extname(filePath) === '',
        size: 1024,
        birthtime: new Date('2021-01-01T00:00:00Z'),
        mtime: new Date('2021-01-01T00:00:00Z'),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFolderNames', () => {
    it('should return a list of folder names', async () => {
      fs.readdirSync.mockImplementation((folderPath) => {
        return ['Folder 1', 'Folder 2'];
      });
      const folderNames = await getFolderNames(rootFolderPath);

      expect(folderNames).toEqual(['Folder 1', 'Folder 2']);
      expect(fs.readdirSync).toHaveBeenCalledTimes(1);
      expect(fs.readdirSync).toHaveBeenCalledWith(rootFolderPath);
      expect(fs.statSync).toHaveBeenCalledTimes(2);
      expect(fs.statSync).toHaveBeenCalledWith(`${rootFolderPath}/Folder 1`);
      expect(fs.statSync).toHaveBeenCalledWith(`${rootFolderPath}/Folder 2`);
    });

    it('should throw an error if an error occurs', async () => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error('Test Error');
      });

      await expect(getFolderNames(rootFolderPath)).rejects.toThrow(
        'Test Error'
      );
      expect(fs.readdirSync).toHaveBeenCalledTimes(1);
      expect(fs.readdirSync).toHaveBeenCalledWith(rootFolderPath);
    });
  });

  describe('generateReportForFolder', () => {
    it('should return a report for the specified folder', async () => {
      const report = await generateReportForFolder(folderPath);

      expect(report.totalFiles).toBe(3);
      expect(report.filesByType).toEqual({
        '.txt': 2,
        Folder: 1,
      });
      expect(report.metadata).toEqual([
        {
          fileName: 'file1.txt',
          fileSize: 1024,
          fileType: '.txt',
          createdAt: new Date('2021-01-01T00:00:00Z'),
          updatedAt: new Date('2021-01-01T00:00:00Z'),
        },
        {
          fileName: 'file2.txt',
          fileSize: 1024,
          fileType: '.txt',
          createdAt: new Date('2021-01-01T00:00:00Z'),
          updatedAt: new Date('2021-01-01T00:00:00Z'),
        },
        {
          fileName: 'Folder 2',
          fileSize: 1024,
          fileType: 'Folder',
          createdAt: new Date('2021-01-01T00:00:00Z'),
          updatedAt: new Date('2021-01-01T00:00:00Z'),
        },
      ]);
      expect(fs.readdirSync).toHaveBeenCalledTimes(1);
      expect(fs.readdirSync).toHaveBeenCalledWith(folderPath);
      expect(fs.statSync).toHaveBeenCalledTimes(3);
      expect(fs.statSync).toHaveBeenCalledWith(`${folderPath}/file1.txt`);
      expect(fs.statSync).toHaveBeenCalledWith(`${folderPath}/file2.txt`);
      expect(fs.statSync).toHaveBeenCalledWith(`${folderPath}/Folder 2`);
    });

    it('should throw an error if an error occurs', async () => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error('Test Error');
      });

      await expect(generateReportForFolder(folderPath)).rejects.toThrow(
        'Test Error'
      );
      expect(fs.readdirSync).toHaveBeenCalledTimes(1);
      expect(fs.readdirSync).toHaveBeenCalledWith(folderPath);
    });
  });
});

const request = require('supertest');
const app = require('../../../src/app');
const {
  getFolderNames,
  generateReportForFolder,
} = require('../../../src/utils/folderOperations');

jest.mock('../../../src/utils/folderOperations');

describe('foldersController', () => {
  const rootFolderPath = '/Users/mac/tests';

  beforeEach(() => {
    getFolderNames.mockImplementation(() => {
      return Promise.resolve(['Folder 1', 'Folder 2']);
    });

    generateReportForFolder.mockImplementation(() => {
      return Promise.resolve({
        totalFiles: 10,
        totalSize: 1024,
        largestFile: 'file.txt',
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('folders', () => {
    it('should return a list of folder names', async () => {
      const response = await request(app).get('/folders');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(['Folder 1', 'Folder 2']);
      expect(getFolderNames).toHaveBeenCalledTimes(1);
      expect(getFolderNames).toHaveBeenCalledWith(rootFolderPath);
    });

    it('should return an error if an error occurs', async () => {
      getFolderNames.mockImplementation(() => {
        throw new Error('Test Error');
      });

      const response = await request(app).get('/folders');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
      expect(getFolderNames).toHaveBeenCalledTimes(1);
      expect(getFolderNames).toHaveBeenCalledWith(rootFolderPath);
    });
  });

  describe('report', () => {
    it('should return a report for the specified folder', async () => {
      const folderName = 'Folder 1';
      const response = await request(app).get(`/report/${folderName}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        totalFiles: 10,
        totalSize: 1024,
        largestFile: 'file.txt',
        folderName: folderName,
      });
      expect(generateReportForFolder).toHaveBeenCalledTimes(1);
      expect(generateReportForFolder).toHaveBeenCalledWith(
        `${rootFolderPath}/${folderName}`
      );
    });

    it('should return an error if an error occurs', async () => {
      generateReportForFolder.mockImplementation(() => {
        throw new Error('Test Error');
      });

      const folderName = 'Folder 1';
      const response = await request(app).get(`/report/${folderName}`);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
      expect(generateReportForFolder).toHaveBeenCalledTimes(1);
      expect(generateReportForFolder).toHaveBeenCalledWith(
        `${rootFolderPath}/${folderName}`
      );
    });
  });
});

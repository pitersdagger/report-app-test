import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Report from './Report';

jest.mock('axios');

describe('Report', () => {
  const folderName = 'Folder 1';
  const report = {
    folderName: folderName,
    totalFiles: 10,
    filesByType: {
      js: 5,
      css: 3,
      html: 2,
    },
    metadata: [
      {
        fileName: 'File Test 1.txt',
        fileSize: 123456,
        fileType: '.js',
        createdAt: '2022-07-27T09:13:08.291Z',
        updatedAt: '2022-07-27T09:13:08.291Z',
      },
    ],
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: report });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the report for the specified folder', async () => {
    render(<Report folderName={folderName} />);

    await waitFor(() => {
      expect(screen.getByText(folderName)).toBeInTheDocument();
      expect(
        screen.getByText(`Total Files: ${report.totalFiles}`)
      ).toBeInTheDocument();
      expect(screen.getByText('js: 5')).toBeInTheDocument();
      expect(screen.getByText('css: 3')).toBeInTheDocument();
      expect(screen.getByText('html: 2')).toBeInTheDocument();
      expect(screen.getByText('File Test 1.txt')).toBeInTheDocument();
    });
  });

  it('should not render anything if folderName is not provided', async () => {
    const { container } = render(<Report />);

    expect(container.firstChild).toBeNull();
    expect(axios.get).not.toHaveBeenCalled();
  });
});

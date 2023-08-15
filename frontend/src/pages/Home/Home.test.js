import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import Folders from '../../components/Folders/Folders';
import Report from '../../components/Report/Report';

jest.mock('../../components/Folders/Folders');
jest.mock('../../components/Report/Report');

describe('Home', () => {
  const setCurrentFolder = jest.fn();

  beforeEach(() => {
    Folders.mockImplementation(({ onFolderClick }) => {
      return (
        <div>
          <button onClick={() => onFolderClick('Folder 1')}>Folder 1</button>
          <button onClick={() => onFolderClick('Folder 2')}>Folder 2</button>
        </div>
      );
    });

    Report.mockImplementation(({ folderName }) => {
      return <div>Report for {folderName}</div>;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Folders component by default', () => {
    render(<Home />);

    expect(Folders).toHaveBeenCalledTimes(1);
    expect(Report).not.toHaveBeenCalled();

    const folder1Button = screen.getByText('Folder 1');
    expect(folder1Button).toBeInTheDocument();

    const folder2Button = screen.getByText('Folder 2');
    expect(folder2Button).toBeInTheDocument();
  });

  it('should render Report component when a folder is onFolderClick', async () => {
    render(<Home />);

    const folder1Button = screen.getByText('Folder 1');
    fireEvent.click(folder1Button);

    expect(Folders).toHaveBeenCalledTimes(1);
    expect(Report).toHaveBeenCalledTimes(1);
  });
});

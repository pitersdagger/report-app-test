import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Folders from '../Folders/Folders';

jest.mock('axios');

describe('Folders', () => {
  const folders = ['Folder 1', 'Folder 2', 'Folder 3'];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: folders });
  });

  it('should render a list of folders', async () => {
    render(<Folders onFolderClick={() => {}} />);

    const folderItems = await screen.findAllByRole('listitem');
    expect(folderItems).toHaveLength(folders.length);

    folderItems.forEach((item, index) => {
      expect(item).toHaveTextContent(folders[index]);
    });
  });

  it('should call onFolderClick when a folder is clicked', async () => {
    const handleFolderClick = jest.fn();
    render(<Folders onFolderClick={handleFolderClick} />);

    const folderItem = await screen.findByText(folders[0]);
    userEvent.click(folderItem);

    expect(handleFolderClick).toHaveBeenCalledTimes(1);
    expect(handleFolderClick).toHaveBeenCalledWith(folders[0]);
  });
});

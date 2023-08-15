import React, { useState } from 'react';
import Folders from '../../components/Folders/Folders';
import Report from '../../components/Report/Report';
import Container from 'react-bootstrap/Container';

function Home() {
  const [currentFolder, setCurrentFolder] = useState(null);
  return (
    <Container>
      {currentFolder ? (
        <Report folderName={currentFolder} />
      ) : (
        <Folders onFolderClick={setCurrentFolder} />
      )}
    </Container>
  );
}

export default Home;

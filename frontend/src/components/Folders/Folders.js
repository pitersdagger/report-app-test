import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Anchor from 'react-bootstrap/Anchor';

function Folders({ onFolderClick }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/folders')
      .then((response) => {
        setFolders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching folders:', error);
      });
  }, []);

  return (
    <div>
      <h2>Folders:</h2>
      <ListGroup as="ul">
        {folders.map((folder) => (
          <ListGroup.Item as="li" key={folder}>
            <Anchor onClick={() => onFolderClick(folder)}>{folder}</Anchor>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Folders;

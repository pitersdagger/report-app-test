import React from 'react';
import { format } from 'date-fns';
import { filesize } from 'filesize';
import { Table, Card } from 'react-bootstrap';

const formatDate = (date) => format(new Date(date), 'MMM dd yyyy');

function Metadata({ metadata }) {
  return (
    <Card className="mt-5">
      <Card.Body>
        <Card.Title>Metadata</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th>File Type</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {metadata.map((file) => (
              <tr key={file.fileName}>
                <td>{file.fileName}</td>
                <td>{filesize(file.fileSize)}</td>
                <td>{file.fileType}</td>
                <td>{formatDate(file.createdAt)}</td>
                <td>{formatDate(file.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Metadata;

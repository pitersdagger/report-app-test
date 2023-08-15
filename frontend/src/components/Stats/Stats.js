import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function Stats({ stats }) {
  return (
    <Card data-testid="statsCard">
      <Card.Body>
        <Card.Title>Files Stats by Type</Card.Title>
        <ListGroup variant="flush">
          {Object.entries(stats).map(([type, count]) => (
            <ListGroupItem key={type}>
              {type ? type : 'unknown'}: {count}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Stats;

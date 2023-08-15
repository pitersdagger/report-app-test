import React from 'react';
import { render, screen } from '@testing-library/react';
import Stats from './Stats';

describe('Stats', () => {
  const stats = {
    Folder: 2,
    '.js': 4,
    '.css': 10,
  };

  it('should render a card with stats', () => {
    const { container } = render(<Stats stats={stats} />);

    const card = screen.getByTestId('statsCard');
    expect(card).toBeInTheDocument();

    const cardTitle = screen.getByText('Files Stats by Type');
    expect(cardTitle).toBeInTheDocument();

    const statItems = container.getElementsByClassName('list-group-item');
    expect(statItems.length).toBe(3);

    Object.entries(stats).forEach(([type, count]) => {
      const labelElement = screen.getByText(`${type}: ${count}`);
      expect(labelElement).toBeInTheDocument();
    });
  });
});

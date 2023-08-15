import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Metadata from '../Metadata/Metadata';
import Stats from '../Stats/Stats';

function Report({ folderName }) {
  const [report, setReport] = useState();

  useEffect(() => {
    if (!folderName) return;

    axios
      .get(`http://localhost:3000/report/${folderName}`)
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
      });
  }, [folderName]);

  if (!report) return null;

  return (
    <div>
      <h2>{report.folderName}</h2>
      <p>Total Files: {report.totalFiles}</p>
      <Stats stats={report.filesByType} />
      <Metadata metadata={report.metadata} className="mt-4" />
    </div>
  );
}

export default Report;

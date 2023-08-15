const express = require('express');
const cors = require('cors');
const { folders, report } = require('./controllers/foldersController');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/folders', folders);

app.get('/report/:folderName', report);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

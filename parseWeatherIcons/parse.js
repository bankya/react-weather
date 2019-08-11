const csv = require('csv-parser');
const fs = require('fs');

let obj = {};

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row['Day Icon']);
    let key = '' + row.ID + '-';
    obj[key + 'day'] = row['Day Icon'];
    obj[key + 'night'] = row['Night Icon'];
    console.log(obj);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  console.log(obj);
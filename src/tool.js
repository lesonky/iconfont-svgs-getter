const getUrlContent = (url) => {
  const https = require('http');
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject('Error: ' + err.message);
      });
  });
};

module.exports = {
  getUrlContent,
};

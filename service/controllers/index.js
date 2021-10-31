var models = require('../server/models');

module.exports = {
  messages: {
    get: function (req, res) {
      res.writeHead(200, header);
      models.messages.get((result) => {
        res.write(result);
        res.end();
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(201, header);
      models.messages.post(req.body, () => res.end());
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.writeHead(200, header);
      res.end(models.users.get());
    },
    post: function (req, res) {
      res.writeHead(201, header);
      console.log('===USER POST ===>', req.body);
      models.users.post(req.body, () => res.end());
    }
  }
};


const infoController = {
  getInfo: async (req, res) => {
    try {
      const info = {
        title: "WebDev HQ API",
        version: "0.0.1",
        author: "Tobias Hopp",
        license: "MIT",
        website: "https://webdev-hq.com",
        contact: "admin@webdev-hq.com",
      };
      res.status(200).json(info);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

module.exports = infoController;

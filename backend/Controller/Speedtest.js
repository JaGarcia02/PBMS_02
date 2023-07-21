const FastSpeedtest = require("fast-speedtest-api");

const monitorSpeed = (req, res) => {
  let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
    verbose: false, // default: false
    timeout: 5000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  });

  speedtest
    .getSpeed()
    .then((s) => {
      res.status(200).json({ speed: s });
    })
    .catch((e) => {
      return res.status(500).json({ message: e.message });
    });
};

module.exports = {
  monitorSpeed,
};

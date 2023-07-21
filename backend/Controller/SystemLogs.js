const { system_logs } = require("../models");

const addsystemlogs = async (req, res) => {
  const { User, Action, Description } = req.body;
  try {
    const systemlogs = await system_logs.create({ User, Action, Description });

    return res.status(200).json(systemlogs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getsystemlogs = async (req, res) => {
  const { employee_ID } = req.params;
  try {
    const systemlogs = await system_logs.findAll({
      where: {
        User: employee_ID,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(systemlogs);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = { addsystemlogs, getsystemlogs };

const db = require("../models");
const { users_data, admin_notification } = require("../models");
const bcrypt = require("bcryptjs");
const {
  SendResetPassword,
  request_forgot,
  SendEmail,
  change_password,
  EmailNotifications,
} = require("../Nodemailer/handlebars");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const moment = require("moment");
const { hr_employees } = require("../models");
const { admin_users, user_notification } = require("../models");

//CREATE USER
const create_user = async (req, res) => {
  const {
    username,
    password,
    role,
    division,
    department,
    section,
    employee_id,
    email,
    company,
    branch,
    LastName,
    firstName,
    MiddleName,
    user_category,
    change_password,
  } = req.body;

  try {
    const userExist = await users_data.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email },
          { employee_id: employee_id },
        ],
      },
    });

    //USER IF EXIST
    if (userExist) {
      return res.status(409).json({ message: "User already exist!" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hashSync(password, salt);

    const newUser = await users_data.create({
      username,
      password: hashedPw,
      role,
      department,
      division,
      section,
      employee_id,
      email,
      company,
      branch,
      LastName,
      firstName,
      user_category,
      MiddleName,
      acctStatus: "Active",
      Suspension: 0,
      counterLogin: 0,
      change_password,
    });

    const updatePbmsStatus = await hr_employees.update(
      { Employee_hasPbms: 1 },
      { where: { Employee_ID: employee_id } }
    );

    if (newUser.role == 2) {
      const adminEmail = await admin_users.findAll();
      EmailNotifications(
        adminEmail.map((data) => data.email).toString(),
        department
      );

      await admin_notification.create({
        notif_desc: `Added new ${department} Admin!`,
        notif_user: 1,
        notif_status: 0,
        notif_link: "/users",
      });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//LOGIN USER
const login_user = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await users_data.findOne({ where: { username } });
    if (!result)
      return res.status(400).json({ message: "User doesn't exist!" }); // CHECK IF USER IS EXISTING
    if (result.acctStatus == "Inactive")
      return res.status(403).json({ message: "Account is inactive!" }); // CHECK IF ACCOUNT IS SUSPENDED
    if (result.Suspension == 1)
      return res.status(403).json({ message: "You are suspended!" }); // CHECKED IF ACCOUNT IS SUSPENDED
    if (result.counterLogin >= 5)
      return res.status(403).json({ message: "You're account was locked!" }); //CHECK IF ACCOUNT WAS LOCKED

    //IF PASSWORD WAS CORRECT
    const isPasswordCorrect = bcrypt.compareSync(password, result.password);

    if (!isPasswordCorrect) {
      if (result.employee_id.includes("IT")) {
        return res.status(403).json({
          message: `Wrong password!`,
        });
      } else {
        await users_data.update(
          { counterLogin: result.counterLogin + 1 },
          { where: { ID: result.ID } }
        );
        return res.status(403).json({
          message: `Wrong password! ${5 - result.counterLogin} try's left`,
        });
      }
    } else {
      const dateNow = new Date();
      const timeNow = new Date().getTime();
      var dateStringWithTime = moment(dateNow).format("MM/DD/YYYY hh:mm a");

      await users_data.update(
        {
          counterLogin: 0,
          lastLogin: dateStringWithTime,
          online_status: "Online",
        },

        { where: { ID: result.ID } }
      );

      const token = generateToken(
        result.ID,
        result.username,
        result.email,
        result.role,
        result.department,
        result.LastName + " " + result.firstName,
        result.employee_id,
        result.createdAt,
        result.section,
        result.change_password,
        result.expired_at
      );

      return res
        .status(200)
        .cookie("user_access_token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json(token);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//LOGOUT
const logout_user = async (req, res) => {
  const { id } = req.params;

  await users_data.update(
    { online_status: "Offline" },
    { where: { employee_id: id } }
  );

  res
    .clearCookie("user_access_token", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User Logged logout successfully");
};
//SET THE ONLINE STATUS TO OFFLINE IF USER WAS INACTIVE
const update_onlineStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await users_data.update(
      { online_status: "Offline" },
      { where: { employee_id: id } }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET ALL USERS
const getAllUsers = async (req, res) => {
  const searchValue = req.query.q;
  const sortValue = req.params.SortItem;
  try {
    if (!searchValue) {
      const result = await users_data.findAll({
        where: { employee_id: { [Op.notLike]: "%IT%" } },
        attributes: { exclude: ["password"] },
        order: [[sortValue, "ASC"]],
      });
      return res.status(200).json(result);
    } else {
      const searchResult = await users_data.findAll({
        where: {
          [Op.or]: [
            { LastName: { [Op.substring]: searchValue } },
            { firstName: { [Op.substring]: searchValue } },
            { employee_id: { [Op.substring]: searchValue } },
          ],
          employee_id: { [Op.notLike]: "%IT" },
        },
        order: [[sortValue, "ASC"]],
        attributes: { exclude: ["password"] },
      });

      return res.status(200).json(searchResult);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DELETE USER ONLY FOR GLOBAL ADMIN SETTING AND DEFAULT USERS ONLY
const deleteDefault = async (req, res) => {
  const empID = req.params.empID;
  try {
    const deleted = await users_data.destroy({
      where: { employee_id: empID },
      force: true,
    }); // MAY GOD HAVE MERCY ON OUR SOUL

    const res_users = await users_data.findAll();

    return res.status(200).json(res_users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//RESET FROM SUSPENSION
const resetAccount = async (req, res) => {
  const { ID } = req.body;
  try {
    const getUser = await users_data.findOne({ where: { ID: ID } });
    const employee_id = getUser.employee_id;
    const dept = getUser.department;

    const newPassword = dept + "-" + employee_id;

    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(newPassword, salt);

    await users_data.update(
      { counterLogin: 0, password: hashedPw },
      { where: { ID: ID } }
    );

    const responseToClient = await users_data.findAll({
      where: { employee_id: { [Op.notLike]: "%IT%" } },
      attributes: { exclude: ["password"] },
    });

    SendResetPassword(getUser.username, newPassword, getUser.email);

    return res.status(200).json(responseToClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//SUSPENSION ACCOUNT
const SuspendAccount = async (req, res) => {
  const { ID } = req.body;

  try {
    await users_data.update({ Suspension: 1 }, { where: { ID: ID } });
    const responseToClient = await users_data.findAll({
      where: { employee_id: { [Op.notLike]: "%IT%" } },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(responseToClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//UNSUSPEND AN ACCOUNT
const UnsuspendAccount = async (req, res) => {
  const { ID } = req.body;

  try {
    await users_data.update({ Suspension: 0 }, { where: { ID: ID } });
    const responseToClient = await users_data.findAll({
      where: { employee_id: { [Op.notLike]: "%IT%" } },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(responseToClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//REACTIVATION OF ACCOUNT
const ActivateAccount = async (req, res) => {
  const { ID } = req.body;

  try {
    await users_data.update({ acctStatus: "Active" }, { where: { ID: ID } });
    const responseToClient = await users_data.findAll({
      where: { employee_id: { [Op.notLike]: "%IT%" } },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(responseToClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DEACTIVATION OF ACCOUNT
const DeactivateAccount = async (req, res) => {
  const { ID } = req.body;

  try {
    await users_data.update({ acctStatus: "Inactive" }, { where: { ID: ID } });

    const responseToClient = await users_data.findAll({
      where: { employee_id: { [Op.notLike]: "%IT%" } },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(responseToClient);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//EDIT USER NAME, DEPARTMENT, POSITION
const EditAccount = async (req, res) => {
  const {
    ID,
    firstName,
    LastName,
    MiddleName,
    department,
    position,
    user_category,
    sections,
  } = req.body;

  try {
    await users_data.update(
      {
        role: position,
        department: department,
        firstName: firstName,
        MiddleName: MiddleName,
        LastName: LastName,
        user_category: user_category,
        section: sections,
      },
      { where: { ID: ID } }
    );
    const responseToClient = await users_data.findAll({
      where: { employee_id: { [Op.notLike]: "%IT%" } },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(responseToClient);
  } catch (error) {
    res.status(500).json({ message: "User Already exist!" });
  }
};

/* FOR FUTURE PURPOSES WHEN IMPORTING FROM EXCEL TO DATABASE*/
const insertUsers = (req, res) => {
  const { data } = req.body;

  const insertRows =
    "INSERT INTO express_table (`name`, `age`, `feedback`) VALUES ?";

  db.query(
    insertRows,
    [data.map((items) => [items.name, items.age, items.feedback])],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.status(200).json(results);
    }
  );
};

//VALIDATION OF TOKEN
const validateToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized no TOKEN" });
    // throw new Error("Not Authorized no TOKEN");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const tokenData = await users_data.findByPk({ where: { ID: decoded.ID } });

    if (!tokenData) {
      return res.status(401).json({ message: "Not Authorized no TOKEN" });
      // throw new Error("Not Authorized no TOKEN");
    }

    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
    // throw new Error("Not Authorized");
  }
};

//REQUEST FOR RESET OF EMAIL
const request_reset = async (req, res) => {
  const { email } = req.body;

  try {
    const requestor = await users_data.findOne({ where: { email: email } });

    if (!requestor) {
      return res.status(404).json({ message: "Account doesn't exist" });
    }

    const token = jwt.sign(
      {
        ID: requestor.ID,
        username: requestor.username,
        email: requestor.email,
        role: requestor.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    request_forgot(requestor.email, requestor.ID, token);

    return res.status(200).json({
      message:
        "The Recovery link has been sent to your account, Please open your email.",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//CHANGE OF PASSWORD ACCOUNT
const change_password_forgot = async (req, res) => {
  const { newPassword, token, expired_at } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPw = bcrypt.hashSync(newPassword, salt);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    var date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth() + 6));
    await users_data.update(
      {
        password: hashedPw,
        change_password: 0,
        expired_at: moment(newDate).format("MM/DD/YYYY"),
      },
      { where: { ID: decoded.ID } }
    );

    return res.status(200).json({ message: "Password Successfully Changed" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//CHANGE PASSWORD BY USER
const change_password_loggedIn = async (req, res) => {
  const { ID, newPassword, username, role, country, city, email } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashednewPw = bcrypt.hashSync(newPassword, salt);

    await users_data.update({ password: hashednewPw }, { where: { ID: ID } });

    const token = jwt.sign(
      {
        ID: ID,
        username: username,
        email: email,
        role: role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );

    change_password(email, token, username, country, city);
    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//CHECK OF USER TOKEN
const getToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ message: "Not Authorized no TOKEN" });
    // throw new Error("Not Authorized no TOKEN");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const tokenData = await users_data.findByPk(decoded.ID);

    if (
      !tokenData ||
      tokenData.Suspension == 1 ||
      tokenData.acctStatus == "Inactive"
    ) {
      res.status(401).json({ message: "Not Authorized" });
    } else {
      res.status(200).json(decoded);
    }
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });

    //throw new Error("Not Authorized");
  }
};

const get_notifications = async (req, res) => {
  const { role, dept } = req.params;
  try {
    const notif = await user_notification.findAll({
      where: {
        [Op.and]: [
          { user_notif_roles: { [Op.gte]: role } },
          { user_notif_dept: dept },
        ],
      },
    });

    return res.status(200).json(notif);
  } catch (error) {
    return res.status(500).json({ message: error + "Internal server error" });
  }
};

//GENERATION OF JWT TOKEN
const generateToken = (
  ID,
  username,
  email,
  role,
  dept,
  name,
  employeeId,
  created,
  section,
  changePassword,
  expired_at
) => {
  return jwt.sign(
    {
      ID,
      username,
      email,
      role,
      dept,
      name,
      employeeId,
      created,
      section,
      changePassword,
      expired_at,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "10h",
    }
  );
};

module.exports = {
  getAllUsers,
  insertUsers,
  SuspendAccount,
  resetAccount,
  UnsuspendAccount,
  ActivateAccount,
  DeactivateAccount,
  EditAccount,
  request_reset,
  change_password_forgot,
  create_user,
  login_user,
  logout_user,
  validateToken,
  change_password_loggedIn,
  getToken,
  deleteDefault,
  update_onlineStatus,
  get_notifications,
};

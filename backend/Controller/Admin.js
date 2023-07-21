const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  SendEmail,
  SendResetPassword,
  change_password,
  admin_forgotPassword,
} = require("../Nodemailer/handlebars");
const { admin_users } = require("../models");
const { admin_branding } = require("../models");
const { admin_officers } = require("../models");
const { admin_setting, admin_notification } = require("../models");
const fs = require("fs");
const { QueryTypes } = require("sequelize");
const db = require("../models/index");
const { Op } = require("sequelize");

const {
  admin_openJobs,
  user_notification,
  admin_authorization,
  admin_section,
  hr_employees,
} = require("../models");

//REGISTER ADMIN
const createAdmin = async (req, res) => {
  const { username, password, email, role, name } = req.body;
  try {
    const adminExist = await admin_users.findOne({
      where: { [Op.or]: [{ Admin_username: username }, { email: email }] },
    });

    if (adminExist) {
      // use this error to all 400+ status
      return res.status(409).json({ message: "User Already Exist!" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hashSync(password, salt);

    const newAdmin = await admin_users.create({
      Admin_name: name,
      Admin_username: username,
      Admin_password: hashedPw,
      role: role,
      email: email,
    });
    const viewNewAdmin = await admin_users.findAll({
      where: { role: 1 },
      order: [["id", "DESC"]],
    });

    if (newAdmin) {
      return res.status(201).json(viewNewAdmin);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//LOGIN FUNCTION ADMIN
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin_data = await admin_users.findOne({
      where: { Admin_username: username },
    });
    if (!admin_data)
      return res.status(404).json({ message: "ACCOUNT DOESN'T EXIST!" });

    const isPasswordMatch = bcrypt.compareSync(
      password,
      admin_data.Admin_password
    );

    if (!isPasswordMatch) {
      return res.status(403).json({ message: "Password doesn't match!" });
    } else {
      const token = generateToken(
        admin_data.ID,
        admin_data.Admin_username,
        admin_data.email,
        admin_data.role,
        admin_data.Admin_name
      );

      res
        .status(200)
        .cookie("admin_access_token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json(token);
    }
  } catch (error) {
    // res.status(500);
    // throw new Error("Something went wrong with the server");
    return res.status(500).json(error);
  }
};

//VALIDATE TOKEN
const getToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized no TOKEN" });

    // ======================================================================================= 400+ status
    // res.status(401); //.json({ message: "Not Authorized no TOKEN" });
    // throw new Error("Not Authorized no TOKEN");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json(decoded);
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized!" });
    // ======================================================================================= 400+ status

    // res.status(401); //.json({ message: "Not Authorized" });
    // throw new Error("Not Authorized");
  }
};

//LOGOUT FUNCTION
const logout = (req, res) => {
  res
    .clearCookie("admin_access_token", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User Logged logout successfully");
};

//CHECK IF THERE'S A USER IN USERS TABLE
const checkAdmin = async (req, res) => {
  try {
    const getCount = await admin_users.count();

    return res.status(200).json(getCount);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//EXTRA LOGIN FOR SUPER USER
const extra_login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const extraLogin = await admin_users.findOne({
      where: { Admin_username: username },
    });

    if (!extraLogin) {
      // use this error to all 400+ status
      return res.status(404).json({ message: "User doesn't exist!" });

      // ==============================================================================================
      // res.status(404);
      // throw new Error("User doesn't exist");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      extraLogin.Admin_password
    );

    if (isPasswordCorrect) {
      return res.status(200).json({ message: "Access Granted" });
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//BRANDING SETTING
const setBranding = async (req, res) => {
  try {
    const { Business_Name, Business_Address, TIN } = req.body;

    fs.rename(
      `./local_Brandings/${req.file.filename}`,
      `./local_Brandings/${req.file.filename}.png`,
      (err) => console.log(err)
    );

    const data = await admin_branding.findAll();

    if (data.length == 0) {
      await admin_branding.create({
        Business_Name,
        Business_Address,
        TIN,
        Logo: `/local_Brandings/${req.file.filename}.png`,
      });
    } else {
      await admin_branding.update(
        {
          Business_Address,
          TIN,
          Logo: `/local_Brandings/${req.file.filename}.png`,
        },
        { where: { ID: data[0].ID } }
      );
    }

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json(error);
    // console.log(err);
  }
};

//GET THE BRANDING SETTING

const getBRanding = async (req, res) => {
  try {
    const data = await admin_branding.findAll();
    if (data.length === 0) {
      return res.status(200).json(null);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

//SETTING OF THE OFFICER

const setOfficers = async (req, res) => {
  try {
    const { Name, Position, Address, Contact_num } = req.body;

    const data = await admin_officers.create({
      Name,
      Position,
      Address,
      Contact_num,
    });

    const dataRes = await admin_officers.findAll();

    return res.status(200).json(dataRes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateKeyOfficers = async (req, res) => {
  try {
    const { Name, Position, Address, Contact_num } = req.body;
    const { id } = req.params;
    await admin_officers.update(
      {
        Name: Name,
        Position: Position,
        Address: Address,
        Contact_num: Contact_num,
      },
      { where: { id: id } }
    );
    const dataRes = await admin_officers.findAll();
    return res.status(200).json(dataRes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET THE OFFICER
const getOfficers = async (req, res) => {
  try {
    const data = await admin_officers.findAll();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//SOFT DELETE OF OFFICER
const removeOfficer = async (req, res) => {
  const id = req.params.ID;
  try {
    await admin_officers.destroy({ where: { id: id } });
    const data = await admin_officers.findAll();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// SET THE GLOBAL SETTING FOR THE SYSTEM
const set_admin_settings = async (req, res) => {
  const { timezone, dateTimeFormat, region, language, currency } = req.body;
  try {
    const admin_checker = await admin_setting.findAll();

    if (admin_checker.length === 0) {
      const addSettings = await admin_setting.create({
        Timezone: timezone,
        DateTimeFormat: dateTimeFormat,
        Region: region,
        Language: language,
        Currency: currency,
      });

      return res.status(200).json({ message: "Added Successfully" });
    } else if (timezone && dateTimeFormat) {
      const update_timeSetting = await admin_setting.update(
        {
          DateTimeFormat: dateTimeFormat,
          Timezone: timezone,
        },
        { where: { ID: admin_checker[0].ID } }
      );

      return res.status(200).json(update_timeSetting);
    } else if (region) {
      const update_region = await admin_setting.update(
        { Region: region },
        { where: { ID: admin_checker[0].ID } }
      );

      return res.status(200).json(update_region);
    } else if (language) {
      const update_language = await admin_setting.update(
        {
          Language: language,
        },
        { where: { ID: admin_checker[0].ID } }
      );

      return res.status(200).json(update_language);
    } else {
      const update_current = await admin_setting.update(
        { Currency: currency },
        { where: { ID: admin_checker[0].ID } }
      );

      return res.status(200).json(update_current);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET THE ADMIN SETTING FOR GLOBAL ADMIN
const get_admin_settings = async (req, res) => {
  try {
    const getSettings = await admin_setting.findAll();

    return res.status(200).json(getSettings);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//FORGOT PASSWORD ADMIN
const forgot_password_admin = async (req, res) => {
  const { email } = req.body;
  try {
    const requestor = await admin_users.findOne({ where: { email } });

    if (!requestor) {
      return res.status(404).json({ message: "Email is invalid!" });
    }

    const TokenToBeSend = generateToken(
      requestor.ID,
      requestor.Admin_username,
      requestor.email,
      requestor.role,
      requestor.Admin_name
    );

    admin_forgotPassword(requestor.email, TokenToBeSend);

    return res.status(200).json(requestor);
  } catch (error) {
    return res.status(500).json(error);
    // console.log(error);
  }
};

//SOFT DELETE OF GLOBAL
const remove_global = async (req, res) => {
  const { ID } = req.params;

  try {
    const remove = await admin_users.destroy({ where: { ID: ID } });
    const viewAllUpdatedAdmin = await admin_users.findAll({
      order: [["id", "DESC"]],
    });
    return res.status(200).json(viewAllUpdatedAdmin);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//ACCOUNT RECOVERY
const account_recovery = async (req, res) => {
  const { token, password } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized no TOKEN" });

    // res.status(401); //.json({ message: "Not Authorized no TOKEN" });
    // throw new Error("Not Authorized no TOKEN");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded) {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPw = await bcrypt.hashSync(password, salt);

      const updatePassword = await admin_users.update(
        { Admin_password: hashedPw },
        { where: { ID: decoded.id } }
      );
      return res.status(200).json(updatePassword);
    }
  } catch (error) {
    console.log(error);
  }
};

//GET ALL ADMIN
const get_admin = async (req, res) => {
  try {
    const admin_all = await admin_users.findAll({
      where: { role: { [Op.ne]: 0 } },
      order: [["id", "DESC"]],
    });

    return res.status(200).json(admin_all);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getEmployeeInfo = async (req, res) => {
  const { Employee_ID } = req.body;
  try {
    const employeeData = await hr_employees.findOne({
      where: { Employee_ID },
    });

    return res.status(200).json(employeeData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET THE SECTIONS ADMIN
const get_sections = async (req, res) => {
  try {
    const get_sections = await admin_section.findAll({
      where: {
        admin_sectionStatus: 1,
        // admin_sectionName: { [Op.ne]: "all" },
      },
      order: [["admin_sectionDepartment", "ASC"]],
    });

    return res.status(200).json(get_sections);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const adminSectionStatus = async (req, res) => {
  const { admin_sectionName, admin_sectionStatus } = req.body;
  try {
    const addSectionStatus = await admin_section.create({
      admin_sectionName,
      admin_sectionStatus,
    });
    return res.status(200).json(addSectionStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteSection = async (req, res) => {
  const { admin_sectionName } = req.params;
  try {
    const removeSection = await admin_section.update(
      { admin_sectionStatus: 0 },
      { where: { admin_sectionName } }
    );

    const get_sections = await admin_section.findAll({
      where: { admin_sectionStatus: 1 },
    });
    return res.status(200).json(get_sections);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateSection = async (req, res) => {
  const { admin_sectionName } = req.params;
  const { admin_sectionDepartment } = req.body;

  try {
    const getData = await admin_section.findAll();
    const checkIfExist = getData.some(
      (data) => data.admin_sectionName == admin_sectionName
    );
    if (checkIfExist) {
      const updateSection = await admin_section.update(
        {
          admin_sectionStatus: 1,
          admin_sectionDepartment,
        },
        { where: { admin_sectionName } }
      );

      const get_sections = await admin_section.findAll({
        where: { admin_sectionStatus: 1 },
      });
      return res.status(200).json(get_sections);
    } else {
      const addSectionStatus = await admin_section.create({
        admin_sectionName,
        admin_sectionStatus: 1,
        admin_sectionDepartment,
      });
      const get_sections = await admin_section.findAll({
        where: { admin_sectionStatus: 1 },
      });
      return res.status(200).json(get_sections);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET THE AUTHORIZATION AND ROLE
const get_auth = async (req, res) => {
  try {
    const authorization_data = await admin_authorization.findAll();

    return res.status(200).json(authorization_data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create_Auth = async (req, res) => {
  try {
    const getCount = await admin_authorization.count();
    if (getCount == 0) {
      await admin_authorization.bulkCreate([
        {
          admin_authNumberRole: "2",
          admin_authDescription: "Admin",
          admin_view: "1",
          admin_add: "1",
          admin_edit: "1",
          admin_print: "1",
          admin_delete: "1",
          admin_void: "1",
        },
        {
          admin_authNumberRole: "3",
          admin_authDescription: "Executive",
          admin_view: "1",
          admin_add: "1",
          admin_edit: "1",
          admin_print: "1",
          admin_delete: "1",
          admin_void: "1",
        },
        {
          admin_authNumberRole: "4",
          admin_authDescription: "Manager",
          admin_view: "1",
          admin_add: "1",
          admin_edit: "1",
          admin_print: "1",
          admin_delete: "1",
          admin_void: "1",
        },
        {
          admin_authNumberRole: "5",
          admin_authDescription: "Supervisor",
          admin_view: "1",
          admin_add: "1",
          admin_edit: "1",
          admin_print: "1",
          admin_delete: "1",
          admin_void: "1",
        },
        {
          admin_authNumberRole: "6",
          admin_authDescription: "Rank & File",
          admin_view: "1",
          admin_add: "1",
          admin_edit: "1",
          admin_print: "1",
          admin_delete: "1",
          admin_void: "1",
        },
      ]);
    } else {
      return;
    }

    const getAll = await admin_authorization.findAll();

    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateAuth = async (req, res) => {
  const {
    admin_authNumberRole,
    admin_add,
    admin_edit,
    admin_print,
    admin_view,
    admin_delete,
    admin_void,
  } = req.body;
  try {
    await admin_authorization.update(
      {
        admin_add,
        admin_edit,
        admin_print,
        admin_view,
        admin_delete,
        admin_void,
      },
      {
        where: {
          admin_authNumberRole,
        },
      }
    );

    const getAll = await admin_authorization.findAll();

    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ======================================================= ADMIN REQUEST ======================================================
const createPositionPRF = async (req, res) => {
  const {
    request_position,
    request_count,
    request_department,
    request_date,
    request_positionLevel,
    request_salary,
    request_jobDescription,
    request_qualification,
    request_specifiactionWorkExperience,
  } = req.body;
  try {
    await admin_openJobs.create({
      request_position,
      request_count,
      request_department,
      request_date,
      request_positionLevel,
      request_salary,
      request_jobDescription,
      request_qualification,
      request_specifiactionWorkExperience,
      request_status: request_department == "HR" ? 1 : 0,
    });

    await user_notification.create({
      user_notif_desc: `New PRA was created on ${request_department}!`,
      user_notif_roles: 3,
      user_notif_dept: "HR",
      user_notif_link: "/hr-default",
    });

    const syncData = await admin_openJobs.findAll({
      order: [["ID", "DESC"]],
    });
    return res.status(200).json(syncData);
  } catch (error) {
    return res.status(500);
  }
};
const deletePositionPRF = async (req, res) => {
  const { ID } = req.params;

  try {
    await admin_openJobs.destroy({
      where: { ID: ID },
    });

    const newData = await admin_openJobs.findAll({
      order: [["ID", "DESC"]],
    });

    return res.status(200).json(newData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updatePositionPRF = async (req, res) => {
  const { ID } = req.params;
  const {
    request_position,
    request_count,
    request_department,
    request_date,
    request_positionLevel,
    request_salary,
    request_jobDescription,
    request_qualification,
    request_specifiactionWorkExperience,
  } = req.body;
  try {
    await admin_openJobs.update(
      {
        request_position: request_position,
        request_count: request_count,
        request_department: request_department,
        request_date: request_date,
        request_positionLevel: request_positionLevel,
        request_salary: request_salary,
        request_jobDescription: request_jobDescription,
        request_qualification: request_qualification,
        request_specifiactionWorkExperience:
          request_specifiactionWorkExperience,
      },
      { where: { ID: ID } }
    );

    const viewUpdatedPRFdata = await admin_openJobs.findAll({
      order: [["ID", "DESC"]],
    });
    return res.status(200).json(viewUpdatedPRFdata);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewAllPRFrequest = async (req, res) => {
  try {
    const PRFrequestList = await admin_openJobs.findAll();
    return res.status(200).json(PRFrequestList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewOnePRFrequest = async (req, res) => {
  const { ID } = req.params;
  try {
    const viewRequestPRF = await admin_openJobs.findOne({
      where: { ID: ID },
    });
    return res.status(200).json(viewRequestPRF);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const approvePrf = async (req, res) => {
  const { ID } = req.body;
  try {
    await admin_openJobs.update(
      {
        request_status: 1,
      },
      { where: { ID } }
    );

    const allData = await admin_openJobs.findAll();

    return res.status(200).json(allData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ======================================================= ADMIN REQUEST ======================================================

//NOTIFICATIONS ADMIN - NAVBAR ADMIN
const get_notifications = async (req, res) => {
  try {
    const get_notif = await admin_notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(get_notif);
  } catch (error) {
    // res.status(500); //.json({ message: "Not Authorized" });
    // throw new Error(error);
    return res.status(500).json(error);
  }
};

const updateClick = async (req, res) => {
  const { ID } = req.body;
  try {
    await admin_notification.update({ notif_status: 1 }, { where: { ID } });

    const newCount = await admin_notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(newCount);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//TOKEN REGENERATION
const generateToken = (id, username, email, role, Admin_name) => {
  return jwt.sign(
    { id, username, email, role, Admin_name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "10h",
    }
  );
};

module.exports = {
  account_recovery,
  createAdmin,
  loginAdmin,
  getToken,
  logout,
  checkAdmin,
  extra_login,
  setBranding,
  getBRanding,
  setOfficers,
  getOfficers,
  removeOfficer,
  set_admin_settings,
  get_admin_settings,
  forgot_password_admin,
  getEmployeeInfo,
  remove_global,
  get_admin,
  get_sections,
  adminSectionStatus,
  deleteSection,
  updateSection,
  get_auth,
  create_Auth,
  updateAuth,
  createPositionPRF,
  deletePositionPRF,
  updatePositionPRF,
  viewAllPRFrequest,
  viewOnePRFrequest,
  get_notifications,
  updateClick,
  updateKeyOfficers,
  approvePrf,
};

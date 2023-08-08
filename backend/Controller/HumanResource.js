const {
  hr_employees,
  hr_sssDeduction,
  hr_philhealthDeductions,
  hr_pagibigDeductions,
  hr_contractType,
  hr_applicants,
  hr_timekeeping,
  hr_schedule,
  hr_employeeStatus,
  hr_dtr,
  hr_cutoffCategory,
} = require("../models");
const fs = require("fs");
const { Op, where, QueryTypes } = require("sequelize");
const db = require("../models/index");
const uniqid = require("uniqid");

//APPLICATION FORM
const applyApplicants = async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    Suffix,
    Gender,
    email,
    contactNum,
    birthDate,
    address,
    region,
    province,
    city,
    barangay,
    position,
    createdAt,
    aboutUs,
    coverletter,
    expiry_date,
  } = req.body;

  fs.rename(
    `./local_Resumes/${req.files.resume[0].filename}`,
    `./local_Resumes/${req.files.resume[0].filename}.pdf`,
    (err) => console.log(err)
  );

  fs.rename(
    `./local_Resumes/${req.files.picture[0].filename}`,
    `./local_Resumes/${req.files.picture[0].filename}.png`,
    (err) => console.log(err)
  );
  try {
    const submit_applicants = await hr_applicants.create({
      applicant_firstName: firstname,
      applicant_middleName: middlename,
      applicant_lastName: lastname,
      applicant_Suffix: Suffix,
      applicant_gender: Gender,
      applicant_email: email,
      applicant_contactNum: contactNum,
      applicant_birthDate: birthDate,
      applicant_address: address,
      applicant_region: region,
      applicant_province: province,
      applicant_city: city,
      applicant_barangay: barangay,
      applicant_position: position,
      applicant_aboutUs: aboutUs,
      createdAt: createdAt,
      applicant_coverletter: coverletter,
      applicant_Pictures: `/local_Resumes/${req.files.picture[0].filename}.png`,
      applicant_resume: `/local_Resumes/${req.files.resume[0].filename}.pdf`,
      applicant_status: 0,
      applicant_expiry: expiry_date,
    });
    return res.status(200).json(submit_applicants);
  } catch (error) {
    // console.log(error);
    return res.status(500).json(error);
  }
};

//APPLICANTS PAGES VIEW
const getApplicants = async (req, res) => {
  const searchValue = req.query.q;
  const category = req.params.category;
  try {
    if (category.trim() !== "all") {
      const applicants = await hr_applicants.findAll({
        where: {
          applicant_status: category,
          [Op.or]: [
            { applicant_lastName: { [Op.substring]: searchValue } },
            { applicant_firstName: { [Op.substring]: searchValue } },
            { applicant_position: { [Op.substring]: searchValue } },
            { applicant_middleName: { [Op.substring]: searchValue } },
            { applicant_email: { [Op.substring]: searchValue } },
            { applicant_birthDate: { [Op.substring]: searchValue } },
            { applicant_aboutUs: { [Op.substring]: searchValue } },
            { applicant_address: { [Op.substring]: searchValue } },
            { applicant_contactNum: { [Op.substring]: searchValue } },
          ],
        },
      });

      return res.status(200).json(applicants);
    } else {
      const applicants = await hr_applicants.findAll({
        where: {
          [Op.or]: [
            { applicant_lastName: { [Op.substring]: searchValue } },
            { applicant_firstName: { [Op.substring]: searchValue } },
            { applicant_position: { [Op.substring]: searchValue } },
            { applicant_middleName: { [Op.substring]: searchValue } },
            { applicant_email: { [Op.substring]: searchValue } },
            { applicant_birthDate: { [Op.substring]: searchValue } },
            { applicant_aboutUs: { [Op.substring]: searchValue } },
            { applicant_address: { [Op.substring]: searchValue } },
            { applicant_contactNum: { [Op.substring]: searchValue } },
          ],
        },
      });

      return res.status(200).json(applicants);
    }
  } catch (error) {
    // res.status(500);
    // console.log(error);
    return res.status(500).json(error);
  }
};

const getCountApplicant = async (req, res) => {
  try {
    const totalUsers = await hr_employees.count();

    res.status(200).json(totalUsers);
  } catch (error) {
    // res.status(500);
    // throw new Error("Server Error");
    return res.status(500).json(error);
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const dataDelete = await db.sequelize.query(
      "UPDATE hr_applicants SET destroyTime = NOW() WHERE applicant_expiry <= NOW() AND destroyTime IS NULL",

      { type: QueryTypes.UPDATE }
    );

    return res.status(200).json(dataDelete);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const hireApplicant = async (req, res) => {
  const {
    Employee_Suffix,
    Employee_Gender,
    Employee_LastName,
    Employee_FirstName,
    Employee_MiddleName,
    Employee_Picture,
    Employee_Company,
    Employee_CompBranch,
    Employee_email,
    Employee_BirthDate,
    Employee_address,
    Employee_region,
    Employee_city,
    Employee_province,
    Employee_barangay,
    Employee_Status,
    Employee_Designation,
    Employee_ContactNum,
    Employee_hasPbms,
    applicant_ID,
    Employee_Position,
    Employee_Department,
    Employee_JobDesc,
    Employee_TypeContract,
    Employee_Schedule,
    Employee_DateStart,
    Employee_DateHired,
  } = req.body;

  try {
    const pre_hired = await hr_employees.create({
      Employee_LastName,
      Employee_FirstName,
      Employee_MiddleName,
      Employee_Company,
      Employee_CompBranch,
      Employee_ContactNum,
      Employee_email,
      Employee_Picture,
      Employee_BirthDate,
      Employee_address,
      Employee_region,
      Employee_city,
      Employee_province,
      Employee_barangay,
      Employee_Status,
      Employee_Gender,
      Employee_Suffix,
      Employee_hasPbms,
      Employee_Position,
      Employee_Department,
      Employee_JobDesc,
      Employee_TypeContract,
      Employee_Designation,
      Employee_Schedule,
      Employee_DateStart,
      Employee_DateHired,
    });

    await hr_employees.update(
      { Employee_ID: "IN2023" + pre_hired.ID.toString().padStart(5, "0") },
      { where: { ID: pre_hired.ID } }
    );

    const update_applicant_status = await hr_applicants.update(
      { applicant_status: 8 },
      {
        where: { ID: applicant_ID },
      }
    );

    return res.status(200).json(pre_hired);
  } catch (error) {
    return res.status(500).json(error);
    // console.log(err);
  }
};

//Get APPLICANTS BY ID
const getApplicantById = async (req, res) => {
  const { ID } = req.params;
  try {
    const viewPlacedEmployee = await hr_employees.findOne({
      where: { ID: ID },
    });
    return res.status(200).json(viewPlacedEmployee);
  } catch (error) {
    return res.status(500).json(error);
    // console.log(error);
  }
};

//GET ALL THE ACTIVE LIST BECAUSE FOR GLOBAL ADMIN
const getActiveEmployeeList_withoutPbms = async (req, res) => {
  try {
    const activeEmployee = await hr_employees.findAll({
      where: { Employee_hasPbms: 0 },
    });

    return res.status(200).json(activeEmployee);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//UPDATING APPLICANT STATUS
const updateApplicant = async (req, res) => {
  const { ID, applicant_status, applicant_PoolReason } = req.body;
  try {
    const updateStatus = await hr_applicants.update(
      {
        applicant_status: applicant_status,
        applicant_PoolReason,
      },
      { where: { ID: ID } }
    );

    return res.status(200).json(updateStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//UPDATING REQUIREMENTS ON APPLICANT FORM
const updateRequirements = async (req, res) => {
  const {
    ID,
    applicant_SSS,
    applicant_Diploma,
    applicant_TOR,
    applicant_gender,
    applicant_Suffix,
    applicant_BirthCert,
    applicant_NBI,
    applicant_PhilHealth,
    applicant_PagIbig,
    applicant_TIN,
    applicant_Medical,
    applicant_BarangayClearance,
    applicant_PoliceClearance,
    applicant_MarriageCertificate,
    applicant_Pictures,
    applicant_AppointmentDates,
    applicant_BirthcertDependent,
    applicant_COE,
    applicant_DriversLicense,
    applicant_NC2Certificate,
    applicant_SOA,
    applicant_Trainings,
    applicant_Vaccine,
    applicant_HMA,
    createdAt,
    applicant_onebyone,
    applicant_twobytwo,
  } = req.body;

  try {
    await hr_applicants.update(
      {
        applicant_SSS,
        applicant_Diploma,
        applicant_TOR,
        applicant_BirthCert,
        applicant_NBI,
        applicant_gender,
        applicant_Suffix,
        applicant_gender,
        applicant_PhilHealth,
        applicant_PagIbig,
        applicant_TIN,
        applicant_MedicalResult: applicant_Medical,
        applicant_BarangayClearance,
        applicant_PoliceClearance,
        applicant_MarriageCertificate,
        applicant_Pictures,
        applicant_AppointmentDates,
        applicant_BirthcertDependent,
        applicant_COE,
        applicant_DriversLicense,
        applicant_NC2Certificate,
        applicant_SOA,
        applicant_Trainings,
        applicant_Vaccine,
        applicant_HMA,
        createdAt,
        applicant_onebyone,
        applicant_twobytwo,
      },
      { where: { ID } }
    );

    const applicant_data = await hr_applicants.findOne({ where: { ID } });

    return res.status(200).json(applicant_data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET ALL ACTIVE EMPLOYEE LIST PRE-EMPLOYED
const getAll_Active_EmployeeList = async (req, res) => {
  const search = req.query.q;
  try {
    const active_employees = await hr_employees.findAll({
      where: {
        [Op.or]: [
          { Employee_LastName: { [Op.substring]: search } },
          { Employee_FirstName: { [Op.substring]: search } },
          { Employee_Position: { [Op.substring]: search } },
          { Employee_MiddleName: { [Op.substring]: search } },
          { Employee_email: { [Op.substring]: search } },
        ],
      },
    });

    return res.status(200).json(active_employees);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//EMPLOYMENT OF NEW EMPLOYEE
const employed_new_employee = async (req, res) => {
  const {
    Employee_BarangayClearance,
    Employee_BirthCert,
    Employee_CompBranch,
    Employee_Company,
    Employee_ContactNum,
    Employee_BirthDate,
    Employee_Department,
    Employee_Diploma,
    Employee_FirstName,
    Employee_ID,
    Employee_BioID,
    Employee_JobDesc,
    Employee_LastName,
    Employee_MarriageCertificate,
    Employee_MedicalCertificate,
    Employee_MiddleName,
    Employee_NBI,
    Employee_Pag_Ibig,
    Employee_PhilHealth,
    Employee_EducationBackground,
    Employee_PoliceClearance,
    Employee_Position,
    Employee_Resume,
    Employee_SSS,
    Employee_Status,
    Employee_TIN,
    Employee_TOR,
    Employee_TypeContract,
    Employee_address,
    Employee_email,
    Employee_DriversLicense,
    Employee_Salary,
    Employee_CompanyEmail,
    Employee_Picture,
    Employee_Gender,
    Employee_Suffix,
    Employee_MobileNumber,
    Employee_Landline,
    Employee_Birthplace,
    Employee_CivilStatus,
    Employee_Religion,
    Employee_Height,
    Employee_Weight,
    Employee_Nationality,
    Employee_PRC,
    Employee_FamilyBackground,
    Employee_ItemsAccountability,
    Employee_Designation,
    Employee_WorkExperience,
    ID,
  } = req.body;

  if (req.file) {
    fs.rename(
      `./local_Resumes/${req.file.filename}`,
      `./local_Resumes/${req.file.filename}.png`,
      (err) => console.log(err)
    );
  }
  try {
    await hr_employees.update(
      {
        Employee_BarangayClearance,
        Employee_BirthCert,
        Employee_CompBranch,
        Employee_BirthDate,
        Employee_Company,
        Employee_ContactNum,
        Employee_Department,
        Employee_Diploma,
        Employee_FirstName,
        Employee_ID,
        Employee_JobDesc,
        Employee_LastName,
        Employee_MarriageCertificate,
        Employee_MedicalCertificate,
        Employee_MiddleName,
        Employee_NBI,
        Employee_Pag_Ibig,
        Employee_PhilHealth,
        Employee_Picture,
        Employee_PoliceClearance,
        Employee_Position,
        Employee_Resume,
        Employee_SSS,
        Employee_Status,
        Employee_TIN,
        Employee_TOR,
        Employee_TypeContract,
        Employee_address,
        Employee_email,
        Employee_BioID,
        Employee_Salary,
        Employee_CompanyEmail,
        Employee_Suffix,
        Employee_Gender,
        Employee_MobileNumber,
        Employee_Landline,
        Employee_Birthplace,
        Employee_CivilStatus,
        Employee_Religion,
        Employee_Height,
        Employee_Weight,
        Employee_Nationality,
        Employee_PRC,
        Employee_DriversLicense,
        Employee_EducationBackground,
        Employee_FamilyBackground,
        Employee_WorkExperience,
        Employee_ItemsAccountability,
        Employee_Designation,
        Employee_Picture: req.file
          ? `/local_Resumes/${req.file.filename}.png`
          : Employee_Picture,
      },
      { where: { ID } }
    );

    const newData = await hr_employees.findAll();

    return res.status(200).json(newData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DEDUCTIONS FUNCTIONS

const get_sss = async (req, res) => {
  try {
    const sss = await hr_sssDeduction.findAll();

    return res.status(200).json(sss);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const get_pagibig = async (req, res) => {
  try {
    const pagibig = await hr_pagibigDeductions.findAll();

    return res.status(200).json(pagibig);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const get_philhealth = async (req, res) => {
  try {
    const philHealth = await hr_philhealthDeductions.findAll();

    return res.status(200).json(philHealth);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const upload_SSS_deductions = async (req, res) => {
  const { SSS_data } = req.body;
  try {
    await hr_sssDeduction.destroy({ truncate: true });

    const upload_excel = await hr_sssDeduction.bulkCreate(SSS_data);

    return res.status(200).json(upload_excel);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const uploadPhillhealth = async (req, res) => {
  const { phillH } = req.body;
  try {
    const value = parseFloat(phillH) / 100;
    await hr_philhealthDeductions.destroy({ truncate: true });
    const upload_excel = await hr_philhealthDeductions.create({
      hr_PhilHealth: value,
    });
    return res.status(200).json(upload_excel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadPagIbig = async (req, res) => {
  const { pagibig } = req.body;
  try {
    await hr_pagibigDeductions.destroy({ truncate: true });
    const upload_excel = await hr_pagibigDeductions.create({
      pagibig_value: pagibig,
    });
    return res.status(200).json(upload_excel);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Add Employment Type
const addContratCategory = async (req, res) => {
  const { employmentType } = req.body;
  try {
    await hr_contractType.create({ employment_category: employmentType });
    const update_category = await hr_contractType.findAll();
    return res.status(200).json(update_category);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get Employment Type
const getContractCategory = async (req, res) => {
  try {
    const category_data = await hr_contractType.findAll();
    return res.status(200).json(category_data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete Employment Type
const deleteContractCategory = async (req, res) => {
  const { ID } = req.params;
  try {
    await hr_contractType.destroy({
      where: { ID: ID },
    });
    const updateTable = await hr_contractType.findAll({});

    return res.status(200).json(updateTable);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update Employment Type
const updateContractCategory = async (req, res) => {
  const { ID } = req.params;
  const { employment_category } = req.body;
  try {
    await hr_contractType.update(
      {
        employment_category: employment_category,
      },
      { where: { ID: ID } }
    );

    const updateTable = await hr_contractType.findAll({});
    return res.status(200).json(updateTable);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ********************* Employee Schedule ********************* //

// Create Function
const createSchedule = async (req, res) => {
  const {
    schedule_type,
    schedule_workdayFrom,
    schedule_workdayTo,
    schedule_timeFrom,
    schedule_timeTo,
    schedule_restdayFrom,
    schedule_restdayTo,
    schedule_restday,
  } = req.body;
  try {
    await hr_schedule.create({
      schedule_type: schedule_type,
      schedule_workdayFrom: schedule_workdayFrom,
      schedule_workdayTo: schedule_workdayTo,
      schedule_timeFrom: schedule_timeFrom,
      schedule_timeTo: schedule_timeTo,
      schedule_restdayFrom: schedule_restdayFrom,
      schedule_restdayTo: schedule_restdayTo,
      schedule_restday: schedule_restday,
    });
    const updated_schedule = await hr_schedule.findAll({});
    return res.status(200).json(updated_schedule);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update Function
const updateSchedule = async (req, res) => {
  const {
    schedule_type,
    schedule_workdayFrom,
    schedule_workdayTo,
    schedule_timeFrom,
    schedule_timeTo,
    schedule_restdayFrom,
    schedule_restdayTo,
    schedule_restday,
  } = req.body;
  const { ID } = req.params;
  try {
    await hr_schedule.update(
      {
        schedule_type: schedule_type,
        schedule_workdayFrom: schedule_workdayFrom,
        schedule_workdayTo: schedule_workdayTo,
        schedule_timeFrom: schedule_timeFrom,
        schedule_timeTo: schedule_timeTo,
        schedule_restdayFrom: schedule_restdayFrom,
        schedule_restdayTo: schedule_restdayTo,
        schedule_restday: schedule_restday,
      },
      { where: { ID: ID } }
    );
    const updated_schedule = await hr_schedule.findAll({});
    return res.status(200).json(updated_schedule);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete Function
const deleteSchedule = async (req, res) => {
  const { ID } = req.params;
  try {
    await hr_schedule.destroy({
      where: { ID: ID },
    });
    const updated_schedule = await hr_schedule.findAll({});
    return res.status(200).json(updated_schedule);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get Function
const getSchedule = async (req, res) => {
  try {
    const view_schedule = await hr_schedule.findAll();
    return res.status(200).json(view_schedule);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get By ID
const getByIdSchedule = async (req, res) => {
  const { ID } = req.params;
  try {
    const view_scheduleData = await hr_schedule.findOne({ where: { ID: ID } });
    return res.status(200).json(view_scheduleData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ********************* Employee status ********************* //

// Create Status
const createEmployeeStatus = async (req, res) => {
  const { employee_status } = req.body;
  try {
    await hr_employeeStatus.create({ employee_status: employee_status });
    const created_status = await hr_employeeStatus.findAll({});
    return res.status(200).json(created_status);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update Status
const updateEmployeeStatus = async (req, res) => {
  const { ID } = req.params;
  const { employee_status } = req.body;
  try {
    await hr_employeeStatus.update(
      { employee_status: employee_status },
      { where: { ID: ID } }
    );
    const updated_status = await hr_employeeStatus.findAll({});
    return res.status(200).json(updated_status);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// View All Employee Status
const viewAllEmployeeStatus = async (req, res) => {
  try {
    const status_data = await hr_employeeStatus.findAll({});
    return res.status(200).json(status_data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// View Status By ID
const viewByIdEmployeeStatus = async (req, res) => {
  const { ID } = req.params;
  try {
    const view_dataById = await hr_employeeStatus.findOne({
      where: { ID: ID },
    });
    return res.status(200).json(view_dataById);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete Status
const deleteEmployeeStatus = async (req, res) => {
  try {
    const { ID } = req.params;
    await hr_employeeStatus.destroy({
      where: { ID: ID },
    });
    const data_updated = await hr_employeeStatus.findAll();
    return res.status(200).json(data_updated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ********************* TIMEKEEPING ********************* //
const save_summary = async (req, res) => {
  // cutoff creation
  const { timeKeepingData } = req.body;
  try {
    await hr_timekeeping.bulkCreate(timeKeepingData);
    const createdCutOff = await hr_timekeeping.findAll({});
    return res.status(200).json(createdCutOff);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const save_timerecord = async (req, res) => {
  try {
    const { dtr } = req.body;
    await hr_dtr.bulkCreate(dtr);
    const data_timerecord = await hr_dtr.findAll({});
    return res.status(200).json(data_timerecord);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTimeKeepingrecord = async (req, res) => {
  try {
    const dtr = await hr_dtr.findAll();
    const summary = await hr_timekeeping.findAll();

    const obj = { data: { summary: summary, dtr: dtr } };

    return res.status(200).json(obj);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const view_cutoff_category = async (req, res) => {
  try {
    const created_cutOff = await hr_cutoffCategory.findAll({});
    return res.status(200).json(created_cutOff);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create_cutoff = async (req, res) => {
  try {
    const { cutOff } = req.body;
    await hr_cutoffCategory.create({ cutOff: cutOff });
    const created_cutOff = await hr_cutoffCategory.findAll({});
    return res.status(200).json(created_cutOff);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const delete_cuttOff = async (req, res) => {
  try {
    const { ID } = req.params;
    await hr_cutoffCategory.destroy({ where: { ID: ID } });
    const get_cutOff = await hr_cutoffCategory.findAll({});
    return res.status(200).json(get_cutOff);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  applyApplicants,
  getApplicants,
  hireApplicant,
  getCountApplicant,
  getActiveEmployeeList_withoutPbms,
  updateApplicant,
  deleteApplicant,
  updateRequirements,
  getAll_Active_EmployeeList,
  employed_new_employee,
  getApplicantById,
  upload_SSS_deductions,
  uploadPhillhealth,
  uploadPagIbig,
  get_sss,
  get_pagibig,
  get_philhealth,
  addContratCategory,
  getContractCategory,
  deleteContractCategory,
  updateContractCategory,
  save_summary,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getByIdSchedule,
  createEmployeeStatus,
  updateEmployeeStatus,
  viewAllEmployeeStatus,
  viewByIdEmployeeStatus,
  deleteEmployeeStatus,
  getTimeKeepingrecord,
  create_cutoff,
  delete_cuttOff,
  view_cutoff_category,
  save_timerecord,
};

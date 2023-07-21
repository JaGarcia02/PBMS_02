const { where } = require("sequelize");
const {
  system_forms,
  admin_forms,
  admin_notification,
  user_notification,
} = require("../models");
const fs = require("fs");

//UPLOAD A FORM VIA ADMIN
const upload_form = async (req, res) => {
  const { formName, formDept, role, dateReq, form_department } = req.body;

  if (req.file) {
    fs.rename(
      `./local_Forms/${req.file.filename}`,
      `./local_Forms/${req.file.filename}.docx`,
      (err) => console.log(err)
    );
  }

  try {
    if (role <= 1) {
      await admin_forms.create({
        admin_FormName: formName,
        admin_Dept: formDept,
        admin_FormPath: `/local_Forms/${req.file.filename}.docx`,
        admin_FormStatus: 1,
        admin_DateRequested: dateReq,
      });
    } else {
      await admin_forms.create({
        admin_FormName: formName,
        admin_Dept: formDept,
        admin_FormPath: req.file
          ? `/local_Forms/${req.file.filename}.docx`
          : "",
        admin_FormStatus: 0,
        admin_DateRequested: dateReq,
      });

      await admin_notification.create({
        notif_desc: `New Form from ${formDept}, ${formName}`,
        notif_user: 1,
        notif_status: 0,
        notif_link: "/admin-settings",
      });
    }

    const createdForms = await admin_forms.findAll();

    return res.status(200).json(createdForms);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//APPROVE FORMS
const approve_form = async (req, res) => {
  const { ID } = req.body;

  try {
    await admin_forms.update(
      {
        admin_FormStatus: 1,
      },
      {
        where: { ID },
      }
    );

    const findAllForms = await admin_forms.findAll();

    return res.status(200).json(findAllForms);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET THE FORM
const get_form = async (req, res) => {
  const { sort } = req.params;
  try {
    const get_allForms = await admin_forms.findAll({ order: [sort] });

    return res.status(200).json(get_allForms);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DELETE FORMS
const delete_form = async (req, res) => {
  const { ID } = req.params;

  try {
    await admin_forms.destroy({ where: { ID } });

    const deletedForm = await admin_forms.findAll();

    return res.status(200).json(deletedForm);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//==========================================SYSTEM FORMS ==================================

const add_requestor = async (req, res) => {
  const { requestor, refNum, dateofRequest, formType, form_department } =
    req.body;
  try {
    const add_form = await system_forms.create({
      Requestor: requestor,
      Reference_number: refNum,
      createdAt: dateofRequest,
      type_of_form: formType,
      form_department: form_department,
    });

    return res.status(200).json(add_form);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET ALL THE REQUESTING
const get_request = async (req, res) => {
  try {
    const data = await system_forms.findAll({ order: ["ID"] });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//VALIDATION AND CANCEL OF FORM
const valid_cancel_request = async (req, res) => {
  const { action, Employee_ID, ID, Dept } = req.body;
  try {
    if (action == 1) {
      await system_forms.update(
        { validated_by: Employee_ID },
        { where: { ID } }
      );

      await user_notification.create({
        user_notif_desc: "Form is Validated",
        user_notif_roles: 3,
        user_notif_dept: Dept,
        user_notif_link: "/Validate",
      });
    }

    if (action == 2) {
      await system_forms.update(
        { canceled_by: Employee_ID },
        { where: { ID } }
      );

      await user_notification.create({
        user_notif_desc: "Form is Canceled",
        user_notif_roles: 3,
        user_notif_dept: Dept,
        user_notif_link: "/Validate",
      });
    }

    if (action == 3) {
      await system_forms.update(
        { finished_by: Employee_ID },
        { where: { ID: ID } }
      );

      await user_notification.create({
        user_notif_desc: "Form is Processed",
        user_notif_roles: 3,
        user_notif_dept: Dept,
        user_notif_link: "/Validate",
      });
    }

    return res.status(200).json({ message: "Done" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  add_requestor,
  get_request,
  upload_form,
  get_form,
  delete_form,
  valid_cancel_request,
  approve_form,
};

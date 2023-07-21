const path = require("path");
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
const { link } = require("fs");

const transporter = nodemailer.createTransport({
  host: "mail.pesoresources.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const SendEmail = (username, password, email, name) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "no-reply@pesoresources.com",
    to: email,
    subject: "PRDC Enterprise System - User Credential",
    template: "email",
    context: {
      textName: name,
      title: username,
      text: password,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const SendResetPassword = (username, password, email) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/resetview"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/resetview"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "no-reply@pesoresources.com",
    to: email,
    subject: "Reset of your PBMS Account",
    template: "resetpassword",
    context: {
      title: username,
      text: password,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const request_forgot = (email, id, token) => {
  const handlebarOptionsForgot = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/ForgotPassword"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/ForgotPassword"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptionsForgot));

  var mailOptions = {
    from: "no-reply@pesoresources.com",
    to: email,
    subject: "Request for Change password",
    template: "ForgotPassword",
    context: {
      link: `http://localhost:5173/change-password/${token}`,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const change_password = (email, token, name, country, city) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/ChangePass"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/ChangePass"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "no-reply@pesoresources.com",
    to: email,
    subject: "Your password has been changed",
    template: "ChangePass",
    context: {
      link: `http://localhost:5173/change-password/${token}`,
      name,
      country,
      city,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const admin_forgotPassword = (email, token) => {
  var mailOptions = {
    from: "no-reply@pesoresources.com",
    to: email,
    subject: "Admin Recovery",
    html: `<span>Please click the recovery link for administrator</span><br /> <b>http://localhost:5173/account-recovery/${token}</b>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const EmailNotifications = (email, department) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/EmailNotification"),
      defaultLayout: false,
    },

    viewPath: path.resolve("./Nodemailer/EmailNotification"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "no-reply@pesoresources.com",
    to: email,
    subject: `New ${department} Admin`,
    template: "EmailNotification",
    context: {
      link: process.env.NODEMAILER_LINK,
      department: department,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  admin_forgotPassword,
  change_password,
  SendEmail,
  SendResetPassword,
  request_forgot,
  EmailNotifications,
};

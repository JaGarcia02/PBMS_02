/*const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pbms_2",
});

db.connect((err) => {
  if (!err) {
    console.log("Connected");
    db.query(
      "CREATE TABLE IF NOT EXISTS `admin` (`ID` INT(10) NOT NULL AUTO_INCREMENT , `Admin_username` VARCHAR(255) NOT NULL , `Admin_Password` VARCHAR(255) NOT NULL , `Admin_Role` INT(10) NOT NULL , `permission` VARCHAR(255) NULL , `user_category` VARCHAR(255) NULL , `access_right` VARCHAR(255) NULL , `position` VARCHAR(255) NULL , `division` VARCHAR(255) NOT NULL , `section` VARCHAR(255) NOT NULL , `employee_id` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `name` VARCHAR(255) NOT NULL , `acctStatus` VARCHAR(255) NOT NULL , `Suspension` INT NOT NULL , `counterLogin` INT NOT NULL , `lastLogin` VARCHAR(255) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;"
    );
  } else {
    console.log(err.message);
  }
});

module.exports = db;*/

module.exports = (sequelize, DataTypes) => {
  const hr_employees = sequelize.define(
    "hr_employees",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Employee_ID: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_BioID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Employee_Schedule: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_DateStart: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_CompanyEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_MiddleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_Company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_CompBranch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_ContactNum: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Employee_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_barangay: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_SSS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_PhilHealth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Pag_Ibig: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_Department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Employee_hasPbms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Employee_TIN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_NBI: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_BirthCert: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_TOR: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Diploma: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_MarriageCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_BarangayClearance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_PoliceClearance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_MedicalCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Resume: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_JobDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_TypeContract: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Employee_BirthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Employee_BirthcertDependent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_COE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_DriversLicense: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_SOA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_NC2Certificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Trainings: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Vaccine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_PRC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_HMA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_onebyone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_twobytwo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Employee_Suffix: { type: DataTypes.STRING, allowNull: true },
      Employee_MobileNumber: { type: DataTypes.STRING, allowNull: true },
      Employee_Landline: { type: DataTypes.STRING, allowNull: true },
      Employee_Birthplace: { type: DataTypes.STRING, allowNull: true },
      Employee_CivilStatus: { type: DataTypes.STRING, allowNull: true },
      Employee_Religion: { type: DataTypes.STRING, allowNull: true },
      Employee_Height: { type: DataTypes.STRING, allowNull: true },
      Employee_Weight: { type: DataTypes.STRING, allowNull: true },
      Employee_Nationality: { type: DataTypes.STRING, allowNull: true },
      Employee_EducationBackground: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      Employee_ItemsAccountability: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      Employee_FamilyBackground: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      Employee_WorkExperience: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      Employee_Designation: { type: DataTypes.STRING, allowNull: true },
      Employee_Gender: { type: DataTypes.STRING, allowNull: true },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return hr_employees;
};

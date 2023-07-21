module.exports = (sequelize, DataTypes) => {
  const hr_applicants = sequelize.define(
    "hr_applicants",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      applicant_lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_middleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_Suffix: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      applicant_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_barangay: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_coverletter: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      applicant_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_contactNum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_aboutUs: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      applicant_resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_SSS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_Diploma: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_TOR: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_BirthCert: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_NBI: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_PhilHealth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_PagIbig: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_TIN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      applicant_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      applicant_MarriageCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_BarangayClearance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_PoliceClearance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_MedicalResult: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_Pictures: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_AppointmentDates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_PoolReason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_BirthcertDependent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_COE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_DriversLicense: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_SOA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_NC2Certificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_Trainings: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_Vaccine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_HMA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_onebyone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicant_twobytwo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_applicants;
};

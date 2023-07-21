import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import jwt from "jwt-decode";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { API_URL, API_URL_ADMIN } from "../utils/Url";

const Form = () => {
  //   const [submitData, setSubmitData] = useState(false);
  //   const { user } = useSelector((state) => state.user);

  //   const decoded = user ? jwt(user) : "";

  //   const submit_form = () => {
  //     axios
  //       .post("http://localhost:3001/api/request/add-request", {
  //         requestor: decoded.name,
  //         refNum: uniqid().toString().toUpperCase(),
  //       })
  //       .then((res) => setSubmitData(true))
  //       .catch((err) => console.log(err));
  //   };

  const [formData, setFormData] = useState([]);
  const [user, setUser] = useState("Andree");

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "get-forms")
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  const generateDocument = (url) => {
    loadFile(url, function (error, content) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.setData({
        Ref: "0912",
        Senior_vice: user ? user : "",
        asd: "asd",
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }); //Output the document using Data-URI
      saveAs(out, "output.docx");
    });
  };

  return (
    <div className="">
      {formData.map((data) => (
        <button onClick={() => generateDocument(API_URL + data.admin_FormPath)}>
          {data.admin_FormName}
        </button>
      ))}
    </div>
  );
};

export default Form;

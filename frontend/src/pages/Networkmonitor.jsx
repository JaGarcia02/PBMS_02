import React, { useState } from "react";
//import { ReactInternetSpeedMeter } from "react-internet-meter";
//import "react-internet-meter/dist/index.css";
import NetworkSpeed from "network-speed";
import { useEffect } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import axios from "axios";

const Networkmonitor = () => {
  const [excelData, setExcelData] = useState([]);
  /*const [wifiSpeed, setwifiSpeed] = useState(null);

  function checkInternetSpeed() {
    const DOWNLOAD_SIZE = 609 * 101 * 32;
    var download = new Image();
    var startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src =
      "https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png" +
      cacheBuster;
    download.id = cacheBuster;
    download.onload = () => {
      var endTime = new Date().getTime();
      showResults(endTime, startTime, DOWNLOAD_SIZE);
    };
  }

  function showResults(endTime, startTime, downloadSize) {
    var duration = (endTime - startTime) / 1000; // ms -> s
    var bitsLoaded = downloadSize * 8;
    var speedBps = bitsLoaded / duration;
    var speedKbps = speedBps / 1024;
    var speedMbps = speedKbps / 1024;
    console.log("youuu " + speedMbps);
    if (speedMbps < 15) {
      console.log("Poor network connection.");
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkInternetSpeed();
    }, 7000);
    return () => clearInterval(interval);
  }, []);*/

  /*const excelHandler = (e) => {
    let fileObj = e.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            excelData.push({
              name: row[0],
              age: row[1],
              feedback: row[2],
            });
          }
        });
      }
    });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/api/users/setItems", { data: excelData })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };*/
  return (
    <div>
      <input type="file" />
      <button>Submit</button>
    </div>
  );
};

export default Networkmonitor;

import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import "./Statistics.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function GiveupStatistics() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/statistics/giveup`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const chartdata = {
    labels: ["중도포기", "완주(예정)자"],
    datasets: [
      {
        label: "명",
        data: [data.giveup, data.nogiveup],
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(201, 203, 207, 0.4)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(201, 203, 207, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="roundChartjsArea">
        <p className="chartTitle">
          중도포기율 :{" "}
          {Math.round((data.giveup / (data.giveup + data.nogiveup)) * 10000) /
            100}
          %
        </p>
        <div className="roundChartArea">
          <Doughnut data={chartdata} />
        </div>
      </div>
    </>
  );
}

export default GiveupStatistics;

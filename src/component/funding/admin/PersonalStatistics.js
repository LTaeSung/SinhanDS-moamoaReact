import React, { useEffect, useState } from "react";
import BootPath from "../../../BootPath";
import { useContext } from "react";
import axios from "axios";
import "./Statistics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PersonalStatistics() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(` ${bootpath}/statistics/personal`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const chartdata = {
    labels: ["챌린지 참여 횟수", "챌린지 참여 금액", "챌린지 정산 금액"],
    datasets: [
      {
        label: "max",
        data: [
          data.maxFundCount,
          Math.round(data.maxTotalpay) / 1000,
          Math.round(data.maxTotalSettlement) / 1000,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "min",
        data: [
          data.minFundCount,
          Math.round(data.minTotalpay) / 1000,
          Math.round(data.minTotalSettlement) / 1000,
        ],
        backgroundColor: "rgba(201, 203, 207, 0.5)",
      },
      {
        label: "avg",
        data: [
          data.avgFundCount,
          Math.round(data.avgTotalpay) / 1000,
          Math.round(data.avgTotalSettlement) / 1000,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="chartjsArea">
        <p className="chartTitle">
          사용자 별 최대, 평균, 최소 <small>(금액 단위 : 천)</small>
        </p>
        <div className="chartArea">
          <Bar data={chartdata} />
        </div>
      </div>
    </>
  );
}

export default PersonalStatistics;

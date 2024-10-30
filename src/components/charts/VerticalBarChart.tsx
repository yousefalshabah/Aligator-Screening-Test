import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import styled from "styled-components";
import postsOverTimeData from "../../data/PostsOverTime.json";
import { generateColorPalette } from "../../utils/colors";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Card = styled.div`
  width: calc(50% - 55px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
  padding-bottom: 15px;
  font-size: 1.5em;
  color: #333;
`;

const HorizontalBarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const data = postsOverTimeData.data.reduce((acc: any[], entry) => {
      const date = moment(entry.date).format("MMM DD");
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing[entry.source] = entry.numMentions;
      } else {
        acc.push({ date, [entry.source]: entry.numMentions });
      }
      return acc;
    }, []);

    const colors = generateColorPalette(
      [...new Set(postsOverTimeData?.data?.map((item) => item.source))].length
    );

    const chartData = {
      labels: data.map((d) => d.date),
      datasets: [
        ...new Set(postsOverTimeData?.data?.map((item) => item.source)),
      ].map((source, index) => ({
        label: source,
        data: data.map((d) => d[source] || 0),
        backgroundColor: colors[index],
        stack: "Stack 0",
      })),
    };

    const chart = new Chart(chartRef.current!, {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "x",
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            align: "start",
            labels: {
              padding: 40,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              title: (tooltipItems) => {
                const dataIndex = tooltipItems[0].dataIndex;
                const date = data[dataIndex].date;
                return `Date: ${moment(date).format("DD MMM")}`;
              },
              labelPointStyle: () => ({
                pointStyle: "circle",
                rotation: 0,
              }),
            },
            usePointStyle: true,
          },
        },
        scales: {
          x: {
            position: "bottom",
            type: "category",
            labels: data.map((d) => moment(d.date).date()),
          },
          xTop: {
            position: "top",
            type: "category",
            grid: {
              display: false,
            },
            labels: data.map((d, index, arr) => {
              const currentMonth = moment(d.date).month();
              const prevMonth =
                index > 0 ? moment(arr[index - 1].date).month() : -1;
              return currentMonth !== prevMonth
                ? moment(d.date).format("MMM")
                : "";
            }),
            ticks: {
              align: "end",
              crossAlign: "near",
              padding: 0,
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <Card>
      <ChartContainer>
        <Title>Euro 24 Sponsors - Posts Over Time</Title>
        <canvas ref={chartRef} />
      </ChartContainer>
    </Card>
  );
};

export default HorizontalBarChart;

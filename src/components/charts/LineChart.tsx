import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";
import engagementData from "../../data/Engagement.json";
import reachData from "../../data/EstimatedReach.json";
import shareOfVoiceData from "../../data/ShareOfVoice.json";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const Card = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const ChartContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
  padding-bottom: 15px;
  font-size: 1.5em;
  color: #333;
`;

const LineChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const data = engagementData.data.map((entry, index) => ({
      source: entry.source,
      engagementCount: entry.engagementCount,
      estimatedReach: reachData.data[index]?.estimatedReach || 0,
      numMentions: shareOfVoiceData.data[index]?.numMentions || 0,
    }));

    const chartData = {
      labels: data.map((d) => d.source),
      datasets: [
        {
          label: "Engagement",
          data: data.map((d) => d.engagementCount),
          borderColor: "#FF6384",
          pointBackgroundColor: "#FF6384",
          fill: false,
        },
        {
          label: "Estimated Reach",
          data: data.map((d) => d.estimatedReach),
          borderColor: "#36A2EB",
          pointBackgroundColor: "#36A2EB",
          fill: false,
        },
        {
          label: "Share of Voice",
          data: data.map((d) => d.numMentions),
          borderColor: "#FFCE56",
          pointBackgroundColor: "#FFCE56",
          fill: false,
        },
      ],
    };

    const chart = new Chart(chartRef.current!, {
      type: "line",
      data: chartData,
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            align: "start",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 20,
            },
          },
          tooltip: {
            usePointStyle: true,
            callbacks: {
              labelPointStyle: () => ({
                pointStyle: "circle",
                rotation: 0,
              }),
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <Card>
      <ChartContainer>
        <Title>Engagement, Estimated Reach, and Share of Voice</Title>
        <canvas ref={chartRef} />
      </ChartContainer>
    </Card>
  );
};

export default LineChartComponent;

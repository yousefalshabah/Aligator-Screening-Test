import { useEffect, useRef } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

Chart.register(PieController, ArcElement, Tooltip, Legend);

const Card = styled.div`
  width: calc(33.3333% - 20px);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const ChartContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h3`
  margin: 0;
  padding-bottom: 15px;
  font-size: 1.5em;
  color: #333;
`;

type PlatformData = {
  source: string;
  sourceColor: string;
  value: number;
  percent?: string;
};

const PieChartComponent = ({ dataToUse, title }: any) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const calculateMentionPercentages = (
    data: PlatformData[]
  ): PlatformData[] => {
    const totalMentions = data.reduce(
      (sum, platform) => sum + platform.value,
      0
    );

    return data.map((platform) => ({
      ...platform,
      percent: ((platform.value / totalMentions) * 100).toFixed(2),
    }));
  };

  useEffect(() => {
    const chart = new Chart(chartRef.current!, {
      type: "doughnut",
      data: {
        labels: dataToUse.data.map((item: any) => item.source),
        datasets: [
          {
            data: calculateMentionPercentages(dataToUse?.data).map(
              (item: any) => item.percent
            ),
            backgroundColor: dataToUse.data.map(
              (item: any) => item.sourceColor
            ),
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            usePointStyle: true,
            callbacks: {
              labelPointStyle: () => ({
                pointStyle: "circle",
                rotation: 0,
              }),
              label: (tooltipItem) => `${tooltipItem.raw}%`,
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
        <Title>Platforms - {title}</Title>
        <canvas ref={chartRef} />
      </ChartContainer>
    </Card>
  );
};

export default PieChartComponent;

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
import styled from "styled-components";
import rankingData from "../../data/Ranking.json";
import { generateColorPalette } from "../../utils/colors";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type PlatformData = {
  source: string;
  keyword: string;
  numMentions: number;
  percentMentions?: string;
};
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

const VerticalBarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const calculateMentionPercentagesByKeyword = (
    data: PlatformData[]
  ): PlatformData[] => {
    return Object.values(
      data.reduce((acc, platform) => {
        acc[platform.keyword] = acc[platform.keyword] || {
          total: 0,
          items: [],
        };
        acc[platform.keyword].total += platform.numMentions;
        acc[platform.keyword].items.push(platform);
        return acc;
      }, {} as Record<string, { total: number; items: PlatformData[] }>)
    ).flatMap(({ total, items }) =>
      items.map((platform) => ({
        ...platform,
        percentMentions:
          total > 0
            ? ((platform.numMentions / total) * 100).toFixed(2)
            : "0.00",
      }))
    );
  };

  useEffect(() => {
    const topics = [...new Set(rankingData?.data?.map((item) => item.keyword))];

    const data = topics.map((topic) => {
      const row: any = { topic };
      calculateMentionPercentagesByKeyword(rankingData.data).forEach((item) => {
        if (item.keyword === topic) {
          row[item.source] = item.percentMentions;
        }
      });
      return row;
    });

    const colors = generateColorPalette(
      [...new Set(rankingData?.data?.map((item) => item.source))].length
    );

    const chartData = {
      labels: topics,
      datasets: [...new Set(rankingData?.data?.map((item) => item.source))].map(
        (source, index, arr) => ({
          label: source,
          data: data.map((d) => d[source] || 0),
          backgroundColor: colors[index],
          borderWidth: 0,
          ...(index === 0
            ? { borderRadius: { topLeft: 10, bottomLeft: 10 } }
            : index === arr.length - 1
            ? { borderRadius: { topRight: 10, bottomRight: 10 } }
            : {}),
          borderSkipped: false,
          barThickness: 10,
        })
      ),
    };

    const chart = new Chart(chartRef.current!, {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",
        layout: {
          padding: {
            left: 20,
            right: 20,
          },
        },
        scales: {
          x: {
            offset: true,
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            stacked: true,
            ticks: {
              padding: 30,
              align: "inner",
            },
          },
        },
        responsive: true,
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
              label: (tooltipItem) => ` ${tooltipItem.raw}%`,
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
        <Title>Key Topics - Ranking</Title>
        <canvas ref={chartRef} />
      </ChartContainer>
    </Card>
  );
};

export default VerticalBarChart;

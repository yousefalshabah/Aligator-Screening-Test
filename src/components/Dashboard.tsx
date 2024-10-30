import React from "react";
import PieChartComponent from "./charts/PieChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import VerticalBarChart from "./charts/VerticalBarChart";
import LineChartComponent from "./charts/LineChart";
import shareOfVoiceData from "../data/ShareOfVoice.json";
import engagementData from "../data/Engagement.json";
import reachData from "../data/EstimatedReach.json";

import styled from "styled-components";

const DashboardContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1400px;
  margin: 0 auto;
  gap: 40px;

  @media (max-width: 1400px) {
    width: 1200px;
  }

  @media (max-width: 1200px) {
    width: 1000px;
  }

  @media (max-width: 992px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const DashboardRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const Dashboard: React.FC = () => {
  const replaceThirdKeyWithNewKey = ({ startDate, endDate, data }) => ({
    startDate,
    endDate,
    data: data.map(({ source, sourceColor, ...rest }) => ({
      source,
      sourceColor,
      value: Object.values(rest)[0],
    })),
  });
  return (
    <DashboardContainer>
      <h1>Reporting Dashboard</h1>

      <DashboardRow>
        <PieChartComponent
          dataToUse={replaceThirdKeyWithNewKey(shareOfVoiceData)}
          title="Share of Voice"
        />
        <PieChartComponent
          dataToUse={replaceThirdKeyWithNewKey(engagementData)}
          title="Engagement"
        />
        <PieChartComponent
          dataToUse={replaceThirdKeyWithNewKey(reachData)}
          title="Estimated Reach"
        />
      </DashboardRow>
      <DashboardRow>
        <HorizontalBarChart />
        <VerticalBarChart />
      </DashboardRow>
      <LineChartComponent />
    </DashboardContainer>
  );
};

export default Dashboard;

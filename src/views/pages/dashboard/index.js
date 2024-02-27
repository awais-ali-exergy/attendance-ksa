// ** React Imports
import { useContext } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Demo Components
import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import OrdersBarChart from "@src/views/ui-elements/cards/statistics/OrdersBarChart";
import ProfitLineChart from "@src/views/ui-elements/cards/statistics/ProfitLineChart";
import Earnings from "@src/views/ui-elements/cards/analytics/Earnings";
import RevenueReport from "@src/views/ui-elements/cards/analytics/RevenueReport";
import PolarAreaChart from "@src/views/ui-elements/cards/statistics/ChartjsPolarAreaChart";
// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";

const myPrimaryData = {
  title: "Primary",
  statistics: "2,76k",
  series: [
    {
      name: "2020",
      data: [15, 85, 65, 45, 65],
    },
  ],
};
const myDropSizeData = {
  title: "Drop Size",
  statistics: "2,76k",
  series: [
    {
      name: "2020",
      data: [45, 25, 65, 45, 95],
    },
  ],
};
const mySKUData = {
  title: "SKU/INVOICE",
  statistics: "2,76k",
  series: [
    {
      name: "2020",
      data: [45, 35, 65, 75, 65],
    },
  ],
};
const mySecondaryData = {
  title: "Secondary",
  statistics: "2,76k",
  series: [
    {
      name: "2020",
      data: [15, 15, 65, 45, 65],
    },
  ],
};
const myStandardData = {
  title: "DFS Standard",
  statistics: "2,76k",
  series: [
    {
      name: "2020",
      data: [45, 85, 65, 45, 65],
    },
  ],
};
const myActualData = {
  title: "DFS Actual",
  statistics: "2,76k",
  series: [
    {
      name: "2020",
      data: [45, 85, 65, 45, 65],
    },
  ],
};

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** vars
  const trackBgColor = "#e9ecef";

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col lg="2" md="3" xs="6">
          <OrdersBarChart
            myData={myPrimaryData}
            warning={colors.primary.main}
          />
        </Col>
        <Col lg="2" md="3" xs="6">
          <OrdersBarChart myData={mySKUData} warning={colors.secondary.main} />
        </Col>
        <Col lg="2" md="3" xs="6">
          <OrdersBarChart
            myData={myDropSizeData}
            warning={colors.success.main}
          />
        </Col>
        <Col lg="2" md="3" xs="6">
          <OrdersBarChart
            myData={mySecondaryData}
            warning={colors.warning.main}
          />
        </Col>
        <Col lg="2" md="3" xs="6">
          <OrdersBarChart
            myData={myStandardData}
            warning={colors.info.main}
          />
        </Col>
        <Col lg="2" md="3" xs="6">
          <OrdersBarChart myData={myActualData} warning={colors.dark.main} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="12">
          <PolarAreaChart
            greyColor={"#4F5D70"}
            labelColor={"#6e6b7b"}
            yellowColor={"#ffe800"}
            primary={colors.primary.main}
            infoColorShade={"#299AFF"}
            warningColorShade={"#ffbd1f"}
            successColorShade={"#28dac6"}
          />
        </Col>
        <Col lg="8" md="8">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
            name={"VOL (8 Oz) Secondary"}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;

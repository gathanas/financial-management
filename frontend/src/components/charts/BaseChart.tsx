import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

type DataProps = {
  name: string;
  y: number;
};

interface Props {
  data: DataProps[];
  title: string;
}

const BaseChart: React.FC<Props> = ({ title,data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: title,
    },
    series: [
      {
        type: "pie",
        data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BaseChart;

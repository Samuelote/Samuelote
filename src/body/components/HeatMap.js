import React from "react"
import ReactApexChart from "react-apexcharts"


const HeatMapView = () => {
  return <ReactApexChart options={options} series={series} type="heatmap" height="350" width="100%" />
}

export default HeatMapView

const options = {
  dataLabels: {
    enabled: true
  },
  colors: ["#008FFB"],
  xaxis: {
    title: {
      text: "Weeks"
    },
    labels: {
      show: false
    },
    tooltip: {
      enabled: true,
      formatter: val => `Week ${val}`,
    },
  },

};

const series = [{
  name: 'SS',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90],
}, {
  name: 'M',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90]
}, {
  name: 'T',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90]
}, {
  name: 'W',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90]
}, {
  name: 'TH',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90]
}, {
  name: 'F',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90]
}, {
  name: 'S',
  data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 90, 80, 70, 60, 90]
}]
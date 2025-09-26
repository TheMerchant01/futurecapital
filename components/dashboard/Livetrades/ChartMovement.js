/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import dynamic from "next/dynamic";
import { useTheme } from "../../../contexts/themeContext";

am4core.useTheme(am4themes_animated);

const ChartMovement = () => {
  const { isDarkMode } = useTheme();
  const trades = [
    "EUR-CHF",
    "GBP-JPN",
    "USD-AUD",
    "CHF-JPN",
    "EUR-JPN",
    "JPN-USD",
    "USD-CHF",
    "EUR-USD",
  ];
  const signals = [
    "connecting to IOT server",
    "placing trades",
    "analyzing markets",
    "market appreciation",
    "calculating pips",
    "Artificial Intelligence 99%",
    "Artificial Intelligence 94%",
    "pulling",
    "retrying ",
  ];
  const [tradeIndex, setTradeIndex] = useState(0);
  const [currentTrade, setCurrentTrade] = useState(trades[tradeIndex]);
  const [currentSignal, setCurrentSignal] = useState(
    signals[Math.floor(Math.random() * signals.length)]
  ); // Initial random signal
  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    chart.padding(0, 0, 0, 0);
    chart.zoomOutButton.disabled = true;

    // Initial data
    const MIN_DATA_POINTS = 30;
    let data = [];
    let visits = 10;
    for (let i = 0; i < MIN_DATA_POINTS; i++) {
      visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({
        date: new Date().setSeconds(i - MIN_DATA_POINTS),
        value: visits,
      });
    }
    chart.data = data;

    // X-axis configuration
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    // Y-axis configuration
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.0;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;

    // Series configuration
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;
    series.stroke = am4core.color("rgba(8, 153, 129, 1)");
    series.fillOpacity = 0.1; // Adjust the opacity as needed
    series.fill = am4core.color("rgba(8, 153, 129, 0.5)");

    let bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = chart.colors.getIndex(0);
    bullet.circle.fill = am4core.color("rgba(8, 153, 129, 1)");
    bullet.isMeasured = false;

    if (isDarkMode) {
      // Change chart colors and grid lines for dark mode
      chart.colors.list = [am4core.color("rgba(255, 255, 255, 1)")];
      dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");
      valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
      valueAxis.renderer.line.stroke = am4core.color(
        "rgba(255, 255, 255, 0.3)"
      );
      dateAxis.renderer.grid.template.stroke = am4core.color(
        "rgba(255, 255, 255, 0.1)"
      );
      valueAxis.renderer.grid.template.stroke = am4core.color(
        "rgba(255, 255, 255, 0.1)"
      );
    } else {
      // Use your original colors and grid lines for light mode
      chart.colors.list = [am4core.color("rgba(8, 153, 129, 1)")];
      dateAxis.renderer.labels.template.fill = am4core.color("#000000");
      valueAxis.renderer.labels.template.fill = am4core.color("#000000");
      valueAxis.renderer.line.stroke = am4core.color("rgba(8, 153, 129, 0.3)");
      dateAxis.renderer.grid.template.stroke =
        am4core.color("rgba(0, 0, 0, 0.1)");
      valueAxis.renderer.grid.template.stroke =
        am4core.color("rgba(0, 0, 0, 0.1)");
    }

    series.events.on("validated", function () {
      bullet.moveTo(series.dataItems.last.point);
      bullet.validatePosition();
    });
    // Chart event
    chart.events.on("datavalidated", function () {
      dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
    });

    // Additional date axis configuration
    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;

    const updateData = () => {
      // Only remove the oldest data point if we have more than MIN_DATA_POINTS
      if (chart.data.length >= MIN_DATA_POINTS) {
        chart.data.shift();
      }

      // Determine the new data point's value
      let lastDataPoint = chart.data[chart.data.length - 1];
      let lastValue = lastDataPoint ? lastDataPoint.value : 10;
      let newValue =
        lastValue -
        Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      // Determine the new data point's date
      let lastDate = lastDataPoint ? new Date(lastDataPoint.date) : new Date();
      let newDate = new Date(lastDate.setSeconds(lastDate.getSeconds() + 1));

      // Add the new data point
      chart.addData({ date: newDate, value: newValue }, 1);
    };

    const interval = setInterval(updateData, 1000);

    return () => {
      clearInterval(interval);
      chart.dispose();
    };
  }, []);
  useEffect(() => {
    const tradeInterval = setInterval(() => {
      setTradeIndex((prevIndex) => (prevIndex + 1) % trades.length);
    }, 5000);

    const signalInterval = setInterval(() => {
      setCurrentSignal(signals[Math.floor(Math.random() * signals.length)]);
    }, 3000);

    return () => {
      clearInterval(tradeInterval);
      clearInterval(signalInterval);
    };
  }, []);

  useEffect(() => {
    setCurrentTrade(trades[tradeIndex]);
  }, [tradeIndex]);
  return (
    <div className="my-4 card rounded-lg shadow[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="p-2">
        <div className="flex my-2 ecn-cont w-full justify-center">
          <div className=" bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-500 flex items-center p-3 rounded-lg text-white font-bold text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
            </svg>

            <button className="text-center"> ECN Server Running</button>
          </div>
        </div>
        <div className="grid my-4 w-full grid-cols-2 text-center justify-between items-center text-sm">
          <div>
            <div
              className={` font-bold p-3 rounded-lg trades ${
                isDarkMode ? "bg-[#111] text-white" : "bg-slate-100"
              }`}
            >
              {currentTrade}
            </div>
          </div>
          <div className="font-bold signals capitalize text-green-600">
            {currentSignal}...
          </div>
        </div>
      </div>
      <div
        id="chartdiv"
        className="text-xs"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ChartMovement), { ssr: false });

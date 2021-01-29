// import modules
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import cn from "classnames";
// import defaults
import { responsivePb, responsiveCp, responsiveCols } from "utils/defaults";

// add the responsive react grid style
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.scss";

// create the responsive grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);
// load the original layouts
const originalLayouts = getFromLS("layouts") || {};

export default function ResponsiveGrid(props: any) {
  // set the state
  const [layouts, setLayouts] = useState(originalLayouts);
  // save the layout change
  function onLayoutChange(_layout: any, xlayouts: any) {
    saveToLS("layouts", xlayouts);
    setLayouts(xlayouts);
  }

  const className = cn("layout", props.className);

  return (
    <ResponsiveGridLayout
      className={className}
      breakpoints={responsivePb}
      cols={responsiveCols}
      layouts={layouts}
      isBounded={true}
      margin={[16, 16]}
      rowHeight={100}
      containerPadding={responsiveCp}
      resizeHandles={["se", "e", "s"]}
      onLayoutChange={onLayoutChange}
    >
      {props.children}
    </ResponsiveGridLayout>
  );
}

function getFromLS(key: string) {
  let ls: any = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8") as string) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key: string, value: any) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

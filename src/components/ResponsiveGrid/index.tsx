// import interfaces
import { IResponsiveGrid } from "Interfaces";
// import modules
import React, { useState, useEffect } from "react";
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

function getFromLS(lsItemKey: string, layoutKey: string) {
  let ls: any = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(lsItemKey) as string) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[layoutKey];
}

function saveToLS(lsItemKey: string, layoutKey: string, value: any) {
  if (global.localStorage) {
    global.localStorage.setItem(
      lsItemKey,
      JSON.stringify({
        [layoutKey]: value,
      })
    );
  }
}

export default function ResponsiveGrid(props: IResponsiveGrid) {
  const { layoutKey = "default" } = props;
  // load the original layouts
  const storedLayouts = getFromLS(layoutKey, "layouts") || {};
  const [layouts, setLayouts] = useState(storedLayouts);

  useEffect(() => {
    // update everytime the layout key has changed
    const storedLayouts = getFromLS(layoutKey, "layouts") || {};
    setLayouts(storedLayouts);
  }, [layoutKey]);

  // save the layout change
  function onLayoutChange(_layout: any, xlayouts: any) {
    saveToLS(layoutKey, "layouts", xlayouts);
    setLayouts(xlayouts);
  }

  // set the class name of the responsive layout
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
      {props.children.map((child: any, id: number) => {
        // get the x and y coordinates
        const [x, y] = [(id * 3) % 12, Math.floor((3 * id) / 12)];
        return (
          <div key={id} data-grid={{ x, y, w: 3, h: 3, minW: 2, minH: 2 }}>
            <div className="box">{child}</div>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}

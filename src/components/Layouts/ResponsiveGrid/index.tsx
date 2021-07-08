// import modules
import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Toolbox from "./Toolbox";

import cn from "classnames";
// import defaults
import {
  responsiveBp,
  responsiveCp,
  responsiveCols,
  generateGrid,
} from "utils/grid";

// add the responsive react grid style
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IResponsiveGrid {
  layoutKey?: string;
  hasToolbox?: boolean;
  className?: any;
  children: React.ReactChild[];
}

//===============================================
// Define the component
//===============================================

// create the responsive grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ResponsiveGrid(props: IResponsiveGrid) {
  const { layoutKey = "default", hasToolbox = false } = props;
  // ============================================
  // Setup the responsive grid hooks
  // ============================================

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getDefaultGrid() {
    const defaultGrid = getFromLS(layoutKey, "layouts") ?? {};
    if (Object.keys(defaultGrid).length === 0) {
      // generate the default grid from scrach
      for (const bp in responsiveBp) {
        // set the breakpoints for the new grid layout
        defaultGrid[bp] = generateGrid(props.children, bp);
      }
    }
    return defaultGrid;
  }

  // get the default grid from localStorage
  const defaultGrid = getDefaultGrid();
  const defaultToolbox = getFromLS(layoutKey, "toolbox") ?? [];

  // state the layouts and toolbox
  const [layouts, setLayouts] = useState<{ [key: string]: any[] }>(defaultGrid);
  const [toolbox, setToolbox] = useState<any[]>(defaultToolbox);
  const [breakpoint, setBreakpoint] = useState("xl");

  // update on layout loading
  useEffect(() => {
    // update everytime the layout key has changed
    const defaultGrid = getFromLS(layoutKey, "layouts") ?? {};
    if (Object.keys(defaultGrid).length === 0) {
      // generate the default grid from scrach
      for (const bp in responsiveBp) {
        // set the breakpoints for the new grid layout
        defaultGrid[bp] = generateGrid(props.children, bp);
      }
    }
    setLayouts(defaultGrid);
  }, [layoutKey, props.children]);

  // ============================================
  // Initialize the variables
  // ============================================

  function onBreakpointChange(bp: string) {
    setBreakpoint(bp);
  }

  function onDeleteItem(item: any, label: string) {
    console.log(item, label);
    setToolbox((prevToolbox) => [...prevToolbox, [item, label]]);
    setLayouts((prevLayouts) => {
      for (const bp in prevLayouts) {
        prevLayouts[bp] = prevLayouts[bp].filter(
          (xitem: any) => xitem.i !== item.i
        );
      }
      return prevLayouts;
    });
  }

  function onAddItem(item: any) {
    console.log(item);
    setToolbox((prevToolbox) =>
      // remove the item from the toolbox
      prevToolbox.filter((xitem: any) => xitem[0].i !== item.i)
    );
    setLayouts((prevLayouts) => {
      // mandatory tmp object; if using prevLayouts it inserts the
      // item two times throwing errors when rendering the layout
      const tmpLayouts = JSON.parse(JSON.stringify(prevLayouts));
      for (const bp in tmpLayouts) {
        tmpLayouts[bp] = [...tmpLayouts[bp], item];
      }
      return tmpLayouts;
    });
  }

  // save the layout change
  function onLayoutChange(_layout: any, xlayouts: any) {
    saveToLS(layoutKey, "layouts", xlayouts);
    saveToLS(layoutKey, "toolbox", toolbox);
    setLayouts(xlayouts);
  }

  // set the class name of the responsive layout
  const className = cn("layout", props.className);

  // ============================================
  // Visualize the component
  // ============================================
  return (
    <React.Fragment>
      {hasToolbox ? <Toolbox items={toolbox} onAddItem={onAddItem} /> : null}
      <ResponsiveGridLayout
        className={className}
        onBreakpointChange={onBreakpointChange}
        containerPadding={responsiveCp}
        breakpoints={responsiveBp}
        cols={responsiveCols}
        layouts={layouts}
        isBounded={true}
        margin={[16, 16]}
        rowHeight={100}
        resizeHandles={["se", "e", "s"]}
        onLayoutChange={onLayoutChange}
      >
        {layouts[breakpoint].map((item: any) => {
          const child = props.children[parseInt(item.i)];
          const render = React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                onDeleteItem: onDeleteItem.bind(undefined, item),
                makeStatic: true,
              })
            : child;
          return (
            <div key={item.i} className={item.static ? "static" : ""}>
              <div className="box">{render}</div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </React.Fragment>
  );
}

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
    const item =
      JSON.parse(global.localStorage.getItem(lsItemKey) as string) || {};
    global.localStorage.setItem(
      lsItemKey,
      JSON.stringify({
        ...item,
        [layoutKey]: value,
      })
    );
  }
}

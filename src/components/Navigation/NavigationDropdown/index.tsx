// import interfaces
import {
  INavigationDropdown,
  ISubsetNavigationItem,
  IMethodNavigationItem,
  EMethodTypes,
  IMethod,
  ISubset,
} from "Interfaces";

// import modules
import React from "react";
import cn from "classnames";
import { formatMethod, formatNumber } from "utils/format";

// import styles and images
import styles from "./styles.module.scss";

export default function NavigationDropdown(props: INavigationDropdown) {
  // get dataset information and set their state
  const { hidden, selectedId, dataset } = props;
  // assign the button style
  const dropdownStyle = cn(styles.container, {
    [styles.hide]: hidden === true,
  });
  return (
    <div className={dropdownStyle}>
      <div className={styles.triangle}></div>
      <div className={styles.content}>
        <SubsetNavigationItem
          selectedId={selectedId}
          dataset={dataset}
          subsetId={0}
        />
      </div>
    </div>
  );
}

function SubsetNavigationItem(props: ISubsetNavigationItem) {
  const { selectedId, dataset, subsetId } = props;
  // get the subset metadata
  const subset = dataset.getSubset(subsetId) as ISubset;
  // get the number of documents
  const nDocs = formatNumber(subset.nDocuments);
  // define the label style
  const styleLabel = cn(styles.label, {
    [styles.selected]: selectedId === subset.id,
  });
  return (
    <div className={styles.subset}>
      <button className={styleLabel}>
        <span>{subset?.label} </span>
        <span className={styles.ndocuments}>{nDocs} documents</span>
      </button>
      <div className={styles.children}>
        {subset?.usedBy.map((methodId, id) => {
          const method = dataset.getMethod(methodId);
          return method?.method === EMethodTypes.AGGREGATE ? null : (
            <MethodNavigationItem
              key={id}
              selectedId={selectedId}
              methodId={methodId}
              dataset={dataset}
            />
          );
        })}
      </div>
    </div>
  );
}

function MethodNavigationItem(props: IMethodNavigationItem) {
  const { selectedId, dataset, methodId } = props;
  // get the subset metadata
  const method = dataset.getMethod(methodId) as IMethod;
  const label = formatMethod(method.method);
  return (
    <div className={styles.method}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children}>
        {method?.produced?.map((subsetId, id) => (
          <SubsetNavigationItem
            key={id}
            selectedId={selectedId}
            subsetId={subsetId}
            dataset={dataset}
          />
        ))}
      </div>
    </div>
  );
}

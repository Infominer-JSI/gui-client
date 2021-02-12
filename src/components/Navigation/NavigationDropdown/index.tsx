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
import { Link } from "react-router-dom";
import { formatMethodLabel, formatNumber } from "utils/format";
import cn from "classnames";

// import styles and images
import styles from "./styles.module.scss";

export default function NavigationDropdown(props: INavigationDropdown) {
  // get dataset information and set their state
  const { hidden, selectedId, dataset, onClick } = props;
  // assign the button style
  const dropdownStyle = cn(styles.container, {
    [styles.hide]: hidden === true,
  });
  return (
    <div className={dropdownStyle}>
      <div className={styles.triangle}></div>
      <div className={styles.content}>
        <div className={styles.inner}>
          <SubsetNavigationItem
            dataset={dataset}
            selectedId={selectedId}
            subsetId={0}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

function SubsetNavigationItem(props: ISubsetNavigationItem) {
  const { selectedId, dataset, subsetId, onClick } = props;
  // get the subset metadata
  const datasetId = dataset.getDataset().id;
  const subset = dataset.getSubset(subsetId) as ISubset;
  // get the number of documents
  const nDocs = formatNumber(subset.nDocuments);
  // define the label style
  const styleLabel = cn(styles.label, {
    [styles.selected]: selectedId === subset.id,
  });
  return (
    <div className={styles.subset}>
      <Link
        className={styleLabel}
        to={`/datasets/${datasetId}/subsets/${subset.id}`}
        onClick={onClick}
      >
        <span>{subset?.label}</span>
        <span className={styles.ndocuments}>{nDocs} documents</span>
      </Link>
      <div className={styles.children}>
        {subset?.usedBy.map((methodId, id) => {
          const method = dataset.getMethod(methodId);
          return method?.method === EMethodTypes.AGGREGATE ? null : (
            <MethodNavigationItem
              key={id}
              dataset={dataset}
              selectedId={selectedId}
              methodId={methodId}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
}

function MethodNavigationItem(props: IMethodNavigationItem) {
  const { selectedId, dataset, methodId, onClick } = props;
  // get the subset metadata
  const method = dataset.getMethod(methodId) as IMethod;
  const label = formatMethodLabel(method);
  return (
    <div className={styles.method}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children}>
        {method?.produced?.map((subsetId, id) => (
          <SubsetNavigationItem
            key={id}
            dataset={dataset}
            selectedId={selectedId}
            subsetId={subsetId}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

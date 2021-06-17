// import modules
import { Link } from "react-router-dom";

// import styles
import styles from "./styles.module.scss";

// get global store functions
import {
  IStoreContext,
  getDataset,
  getSubset,
  getMethod,
} from "utils/GlobalState";

//===============================================
// Define the component interfaces
//===============================================

import { IDataset, IMethod, ISubset } from "Interfaces";

interface IBreadcrumbs {
  store: IStoreContext;
  selectedId: number;
}

interface ICrumb {
  label: string;
  URL: string;
}

//===============================================
// Define the component
//===============================================

const createURL = (datasetId: number, subsetId: number) =>
  `/datasets/${datasetId}/subsets/${subsetId}`;

function getBreadcrumbs(
  subset: ISubset,
  store: IStoreContext,
  datasetId: number
) {
  // breadcrumbs placeholder
  let breadcrumbs: ICrumb[] = [];
  // add the current subset to the breadcrumbs
  // breadcrumbs.push({
  //   label: subset.label,
  //   URL: createURL(datasetId, subset.id),
  // });
  // iterate through the path back to the root
  let currentSubset = subset;
  while (currentSubset.resultedIn) {
    // get the method that create the subset
    const methodId = currentSubset.resultedIn;
    const method = getMethod(store, methodId) as IMethod;
    // get the subset used by the method
    const subsetId = method.appliedOn;
    currentSubset = getSubset(store, subsetId) as ISubset;
    // add the current subset to the breadcrumbs
    breadcrumbs = [
      {
        label: currentSubset.label,
        URL: createURL(datasetId, currentSubset.id),
      },
      ...breadcrumbs,
    ];
  }

  return breadcrumbs;
}

//===============================================
// Define the component
//===============================================

export default function Breadcrumbs(props: IBreadcrumbs) {
  const { store, selectedId } = props;

  // get the subset metadata
  const datasetId = (getDataset(store) as IDataset).id;
  const subset = getSubset(store, selectedId) as ISubset;

  // get the whole breadcrumb path
  const breadcrumbs = getBreadcrumbs(subset, store, datasetId);

  return (
    <ol className={styles.breadcrumbs}>
      {breadcrumbs.map((crumb, i) => (
        <li key={i} className={styles.crumb}>
          <Link className={styles.link} to={crumb.URL}>
            {crumb.label}
          </Link>
        </li>
      ))}
    </ol>
  );
}

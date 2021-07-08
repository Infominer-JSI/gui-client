// import modules
import { Link } from "react-router-dom";
import { formatMethodLabel, formatNumber } from "utils/format";
import cn from "classnames";

// import styles and images
import styles from "./styles.module.scss";

// import global state
import {
  getDataset,
  getSubset,
  getMethod,
  IStoreContext,
} from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

// import interfaces
import { EMethodTypes, IDataset, IMethod, ISubset } from "Interfaces";

interface INavigationDropdown {
  store: IStoreContext;
  selectedId: number;
  hidden: boolean;
  onClick?: () => void;
}

interface INavigationDropdownItemSubset {
  store: IStoreContext;
  selectedId: number;
  subsetId: number;
  onClick?: () => void;
}

interface INavigationDropdownItemMethod {
  store: IStoreContext;
  selectedId: number;
  methodId: number;
  onClick?: () => void;
}

//===============================================
// Define the helper components
//===============================================

function NavigationDropdownItemSubset(props: INavigationDropdownItemSubset) {
  const { store, selectedId, subsetId, onClick } = props;

  // get the subset metadata
  const datasetId = (getDataset(store) as IDataset).id;
  const subset = getSubset(store, subsetId) as ISubset;

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
          const method = getMethod(store, methodId) as IMethod;
          return method?.method === EMethodTypes.AGGREGATE ? null : (
            <NavigationDropdownItemMethod
              key={id}
              store={store}
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

function NavigationDropdownItemMethod(props: INavigationDropdownItemMethod) {
  const { store, selectedId, methodId, onClick } = props;

  // get the subset metadata
  const method = getMethod(store, methodId) as IMethod;
  const label = formatMethodLabel(method);

  return (
    <div className={styles.method}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children}>
        {method?.produced?.map((subsetId, id) => (
          <NavigationDropdownItemSubset
            key={id}
            store={store}
            selectedId={selectedId}
            subsetId={subsetId}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

//===============================================
// Define the component
//===============================================

export default function NavigationDropdown(props: INavigationDropdown) {
  // get dataset information and set their state
  const { store, selectedId, onClick, hidden } = props;
  // assign the button style
  const dropdownStyle = cn(styles.container, {
    [styles.hide]: hidden === true,
  });
  return (
    <div className={dropdownStyle}>
      <div className={styles.triangle}></div>
      <div className={styles.content}>
        <div className={styles.inner}>
          <NavigationDropdownItemSubset
            store={store}
            selectedId={selectedId}
            subsetId={0}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

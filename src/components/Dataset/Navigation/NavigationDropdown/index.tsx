// import modules
import { Link } from "react-router-dom";
import { formatMethodLabel, formatNumber } from "utils/format";
import cn from "classnames";

// import styles and images
import styles from "./styles.module.scss";

// import global state
import { useStore, getDataset, getSubset, getMethod } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

// import interfaces
import { EMethodTypes, IDataset, IMethod, ISubset } from "Interfaces";

interface IDropdown {
  hidden: boolean;
  selectedId: number;
  onClick?: any;
}

interface IDropdownItemSubset {
  selectedId: number;
  subsetId: number;
  onClick?: any;
}

interface IDropdownItemMethod {
  selectedId: number;
  methodId: number;
  onClick?: any;
}

//===============================================
// Define the helper components
//===============================================

function SubsetNavigationItem(props: IDropdownItemSubset) {
  const { selectedId, subsetId, onClick } = props;
  const { store } = useStore();

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
            <MethodNavigationItem
              key={id}
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

function MethodNavigationItem(props: IDropdownItemMethod) {
  const { selectedId, methodId, onClick } = props;
  const { store } = useStore();

  // get the subset metadata
  const method = getMethod(store, methodId) as IMethod;
  const label = formatMethodLabel(method);

  return (
    <div className={styles.method}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children}>
        {method?.produced?.map((subsetId, id) => (
          <SubsetNavigationItem
            key={id}
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

export default function NavigationDropdown(props: IDropdown) {
  // get dataset information and set their state
  const { hidden, selectedId, onClick } = props;
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
            selectedId={selectedId}
            subsetId={0}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

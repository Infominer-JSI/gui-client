// import modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatNumber } from "utils/format";
import { download } from "utils/utils";

// import components
import NavigationBreadcrumbs from "../NavigationBreadcrumb";
import Button from "components/Inputs/Button";
import Modal from "components/Modal";

// import styles and images
import styles from "./styles.module.scss";

// import global state
import {
  useStore,
  getDataset,
  getSubset,
  IStoreContext,
} from "utils/GlobalState";

//===============================================
// Define the component interfaces
//===============================================

// import interfaces
import { IDataset, ISubset } from "Interfaces";

interface INavigationMetadata {
  store: IStoreContext;
  subsetId: number;
}

//===============================================
// Define the component
//===============================================

export default function Metadata(props: INavigationMetadata) {
  const history = useHistory();
  // get dataset information and set their state
  const { store, subsetId } = props;

  // get the gobal store
  const { setStore } = useStore();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteOpen((prevMode) => !prevMode);

  // get dataset and subset metadata
  const { id: datasetId } = getDataset(store) as IDataset;
  const { label, nDocuments } = getSubset(store, subsetId) as ISubset;

  // format the number of documents
  const numberDocs = formatNumber(nDocuments as number);

  async function deleteSubset() {
    const response = await fetch(
      `/api/v1/datasets/${datasetId}/subsets/${subsetId}`,
      {
        method: "DELETE",
      }
    );
    const {
      subsets: { id, isDeleted },
    } = await response.json();

    // toggle the delete modal and move
    toggleDeleteModal();
    history.push(`/datasets/${datasetId}/subsets/0`);

    if (isDeleted) {
      // delete the subset from the global context
      setStore({ type: "REMOVE_SUBSET", payload: id });
    } else {
      //! TODO: handle on error
    }
  }

  // set the download function
  const getFileFromURL = async () => {
    // create the download link and filename
    const downloadLink = `/api/v1/datasets/${datasetId}/subsets/${subsetId}/download`;
    const formatLabel = label.replace(/[, ]+/g, "-").toLowerCase();
    const filename = `${formatLabel}-D${datasetId}S${subsetId}T${Date.now()}.csv`;
    // download from the link and create a blob
    const response = await fetch(downloadLink);
    const blob = await response.blob();
    download(filename, blob);
  };

  return (
    <React.Fragment>
      <div className={styles.metadata}>
        <div className={styles.information}>
          <h1>{label}</h1>

          <span className={styles["generated-from"]}>
            Generated from:{" "}
            {subsetId !== 0 ? (
              <NavigationBreadcrumbs store={store} selectedId={subsetId} />
            ) : (
              "None"
            )}
          </span>
        </div>
        <div className={styles.controllers}>
          <Button
            type="full"
            size="medium"
            color="blue"
            icon="download"
            intensity="dark"
            onClick={getFileFromURL}
          />
          <Button
            type="full"
            size="medium"
            color="green"
            icon="edit"
            intensity="dark"
            onClick={() => {}}
          />
          {subsetId !== 0 ? (
            <Button
              type="full"
              size="medium"
              color="red"
              icon="delete"
              intensity="dark"
              onClick={toggleDeleteModal}
            />
          ) : null}
        </div>
      </div>
      <Modal
        type="delete"
        isOpen={deleteOpen}
        backClick={toggleDeleteModal}
        execClick={deleteSubset}
      >
        Are you sure? This action cannot be reversed!
        <br />
        <br />
        Do you really wish to delete <b>{label}</b>?
      </Modal>
    </React.Fragment>
  );
}

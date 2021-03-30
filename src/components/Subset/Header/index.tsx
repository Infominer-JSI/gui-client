// import interfaces
import { ISubset, IHeaderSubset } from "Interfaces";
// import modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatNumber } from "utils/format";
import { download } from "utils/utils";

// import components
import Button from "components/Inputs/Button";
import Modal from "components/Modal";

// import styles and images
import styles from "./styles.module.scss";

export default function SubsetHeader(props: IHeaderSubset) {
  const history = useHistory();
  // get dataset information and set their state
  const { subsetId, dataset } = props;
  // get dataset and subset metadata
  const { id: datasetId } = dataset.getDataset();
  const { label, nDocuments } = dataset.getSubset(subsetId) as ISubset;
  // format the number of documents
  const numberDocs = formatNumber(nDocuments as number);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteOpen((prevMode) => !prevMode);
  const deleteSubset = async () => {
    const response = await fetch(
      `/api/v1/datasets/${datasetId}/subsets/${subsetId}`,
      {
        method: "DELETE",
      }
    );
    const { id, isDeleted } = await response.json();
    if (isDeleted) {
      dataset.deleteSubset(id);
    } else {
      //! TODO: handle on error
    }
    toggleDeleteModal();
    history.push(`/datasets/${datasetId}/subsets/0`);
  };

  // create the download link and filename
  const downloadLink = `/api/v1/datasets/${datasetId}/subsets/${subsetId}/download`;
  const formatLabel = label.replace(/[, ]+/g, "-").toLowerCase();
  const filename = `${formatLabel}-D${datasetId}S${subsetId}T${Date.now()}.csv`;
  // set the download function
  const getFileFromURL = async () => {
    // download from the link and create a blob
    const response = await fetch(downloadLink);
    const blob = await response.blob();
    download(filename, blob);
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.controllers}>
          <h1>{label}</h1>
          <div className={styles.buttons}>
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
        <div className={styles.information}>
          <div className={styles.metadata}>
            <div>
              <b>No. Documents:</b> {numberDocs}
            </div>
          </div>
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

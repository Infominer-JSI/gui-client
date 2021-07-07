// import modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { download } from "utils/utils";

// import components
import Button from "components/Inputs/Button";
import Modal from "components/Modal";

import axios from "axios";

// import styles and images
import styles from "./styles.module.scss";

// import global state
import {
  useStore,
  getDataset,
  getSubset,
  IStoreContext,
} from "utils/GlobalState";

import { useInput } from "utils/hooks";

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

  // get dataset and subset metadata
  const { id: datasetId } = getDataset(store) as IDataset;
  const { label } = getSubset(store, subsetId) as ISubset;

  // modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState<"delete" | "edit">("delete");
  const [updatedLabel, setUpdatedLabel, labelInput] = useInput({
    className: styles.input,
    name: "flabel",
    value: label,
    type: "text",
  });

  //=============================================
  // Define the modal helper functions
  //=============================================

  // modal helper functions
  const activateDeleteModal = () => {
    setModalType("delete");
    setModalHeader("Delete Subset");
    setModalIsOpen(true);
  };

  const activateEditModal = () => {
    setModalType("edit");
    setModalHeader("Edit Subset");
    setModalIsOpen(true);
    (setUpdatedLabel as React.Dispatch<React.SetStateAction<string>>)(label);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // delete the subset
  async function deleteSubset() {
    const {
      data: {
        subsets: { id, isDeleted },
      },
    } = await axios.delete(`/api/v1/datasets/${datasetId}/subsets/${subsetId}`);

    // toggle the delete modal and move
    closeModal();
    history.push(`/datasets/${datasetId}/subsets/0`);

    if (isDeleted) {
      // delete the subset from the global context
      setStore({ type: "REMOVE_SUBSET", payload: { id } });
    } else {
      //! TODO: handle on error
    }
  }

  // update the subset
  async function updateSubset() {
    const {
      data: { subsets: subset },
    } = await axios.put(`/api/v1/datasets/${datasetId}/subsets/${subsetId}`, {
      body: {
        subsets: {
          label: updatedLabel,
        },
      },
    });
    closeModal();
    // update the subset from the global context
    setStore({ type: "UPDATE_SUBSET", payload: subset });
  }

  let modalContent: React.ReactNode;
  let execFunction: () => void = () => {};
  switch (modalType) {
    case "delete":
      modalContent = deleteModalContent(label);
      execFunction = deleteSubset;
      break;
    case "edit":
      modalContent = editModalContent(labelInput);
      execFunction = updateSubset;
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
            onClick={activateEditModal}
          />
          {subsetId !== 0 ? (
            <Button
              type="full"
              size="medium"
              color="red"
              icon="delete"
              intensity="dark"
              onClick={activateDeleteModal}
            />
          ) : null}
        </div>
      </div>
      <Modal
        type={modalType}
        isOpen={modalIsOpen}
        header={modalHeader}
        backClick={closeModal}
        execClick={execFunction}
      >
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}

function deleteModalContent(label: string) {
  return (
    <React.Fragment>
      <p>Are you sure? This action cannot be reversed!</p>
      <p>
        Do you really wish to delete <b>{label}</b>?
      </p>
    </React.Fragment>
  );
}

function editModalContent(InputElement: React.ReactNode) {
  return (
    <React.Fragment>
      <h3 className={styles.heading}>Update subset content</h3>
      <div className={styles.section}>
        <label htmlFor="flabel">Subset Label</label>
        {InputElement}
      </div>
    </React.Fragment>
  );
}

// import interfaces
import { IDataset } from "Interfaces";
// import modules
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatNumber, formatDate } from "utils/format";
import Button from "components/Inputs/Button";
import Modal from "components/Modal";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetHeader(props: IDataset) {
  const history = useHistory();
  // get dataset information and set their state
  const { id, nDocuments, created } = props;
  const [name] = useState(props.name);

  // modal states
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // format values
  const createdDate = formatDate(new Date(created));
  const numberDocs = formatNumber(nDocuments as number);

  const toggleDeleteModal = () => setDeleteOpen((prevMode) => !prevMode);
  const deleteDataset = async () => {
    const response = await fetch(`/api/v1/datasets/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    toggleDeleteModal();
    history.push("/datasets");
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.controllers}>
          <h1>{name}</h1>
          <div className={styles.buttons}>
            <Button
              type="full"
              size="medium"
              color="green"
              icon="edit"
              intensity="dark"
              onClick={() => {}}
            />
            <Button
              type="full"
              size="medium"
              color="red"
              icon="delete"
              intensity="dark"
              onClick={toggleDeleteModal}
            />
          </div>
        </div>
        <div className={styles.information}>
          <div className={styles.metadata}>
            <div>
              <b>No. Documents:</b> {numberDocs}
            </div>
            <div>
              <b>Created Date:</b> {createdDate}
            </div>
          </div>
        </div>
      </div>
      <Modal
        type="delete"
        isOpen={deleteOpen}
        backClick={toggleDeleteModal}
        execClick={deleteDataset}
      >
        Are you sure? This action cannot be reversed!
        <br />
        <br />
        Do you really wish to delete <b>{name}</b>?
      </Modal>
    </React.Fragment>
  );
}

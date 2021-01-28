// import interfaces
import { IDataset } from "Interfaces";
// import modules
import React, { Fragment, useState } from "react";
import { formatNumber, formatDate } from "utils/format";
import ButtonEdit from "components/ButtonEdit";
import ButtonDelete from "components/ButtonDelete";
import Collapse from "components/CollapseText";

// import styles and images
import styles from "./styles.module.scss";

export default function DatasetInfo(props: IDataset) {
  // get dataset information and set their state
  const { nDocuments, created } = props;
  const [name] = useState(props.name);
  const [description] = useState(props.description);

  // format values
  const createdDate = formatDate(new Date(created));
  const numberDocs = formatNumber(nDocuments as number);

  return (
    <div className={styles.container}>
      <div className={styles.controllers}>
        <h1>{name}</h1>
        <div className={styles.buttons}>
          <ButtonEdit />
          <ButtonDelete />
        </div>
      </div>
      <div className={styles.information}>
        <div className={styles.metadata}>
          <div>{numberDocs} documents</div>
          <div>Created Date: {createdDate}</div>
        </div>
        {description ? (
          <div className={styles.description}>
            <b>Description</b>
            <Collapse>
              {/* split the description based on its newlines */}
              {description?.split(/(?:\r\n|\r|\n)/g).map((value, id) => (
                <Fragment key={id}>
                  {value}
                  <br />
                </Fragment>
              ))}
            </Collapse>
          </div>
        ) : null}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useReducer } from "react";

import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

//
type fieldType = "number" | "datetime" | "category" | "class" | "text";

interface IField {
  name: string;
  type: fieldType;
  included: boolean;
}

interface IUploadForm {
  dataset: {
    id: number;
    filename: string;
    delimiter: string;
    fields: IField[];
  };
  metadata: {
    types: fieldType[];
    stopwords: {
      languages: {
        label: string;
        value: string;
      }[];
    };
  };
}

interface IFieldTableRow {
  id: number;
  key?: any;
  name: string;
  type: fieldType;
  included: boolean;
  onChange: React.Dispatch<IFieldAction>;
}

interface IFieldAction {
  type: string;
  payload: {
    id: number;
    field: IField;
  };
}

//===============================================
// Define field reducer
//===============================================

const fieldsReducer = (state: IField[], action: IFieldAction) => {
  const {
    type,
    payload: { field, id },
  } = action;
  switch (type) {
    case "UPDATE":
      return [...state.slice(0, id), field, ...state.slice(id + 1)];
    default:
      return [...state];
  }
};

//===============================================
// Define the component
//===============================================

export default function UploadForm(props: IUploadForm) {
  const { dataset, metadata } = props;

  // set the state
  const [name, setName] = useState(dataset.filename);
  const [desc, setDesc] = useState("");
  //
  const [fields, setFields] = useReducer(fieldsReducer, dataset.fields);
  const [stopwords, setStopwords] = useState("en");

  console.log(fields);
  return (
    <React.Fragment>
      <section className={styles.dataset}>
        <div className={styles.name}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Input dataset name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Dataset Name</label>
        </div>
        <div className={styles.description}>
          <textarea
            name="desc"
            rows={5}
            value={desc}
            placeholder="Input dataset description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="name">Dataset Description (optional)</label>
        </div>
      </section>
      <section className={styles.fields}>
        <h3 className={styles.header}>Dataset Fields</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.field}>Field</th>
              <th className={styles.type}>Type</th>
              <th className={styles.included}>Included</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, id) => (
              <FieldTableRow key={id} id={id} {...field} onChange={setFields} />
            ))}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
}

function FieldTableRow(props: IFieldTableRow) {
  const { id, name, type, included, onChange } = props;
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            onChange({
              type: "UPDATE",
              payload: { id, field: { name: e.target.value, type, included } },
            });
          }}
        />
      </td>
      <td></td>
      <td>
        <input
          type="checkbox"
          name="included"
          checked={included}
          onChange={(e) => {
            onChange({
              type: "UPDATE",
              payload: {
                id,
                field: { name: name, type, included: e.target.checked },
              },
            });
          }}
        />
      </td>
    </tr>
  );
}

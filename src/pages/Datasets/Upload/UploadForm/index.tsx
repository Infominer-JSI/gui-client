import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";

import Checkbox from "components/Inputs/Checkbox";
import Textarea from "components/Inputs/Textarea";
import Dropdown from "components/Inputs/Dropdown";
import Input from "components/Inputs/Input";
import Button from "components/Inputs/Button";

import styles from "./styles.module.scss";

import axios from "axios";

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
  onReset: () => void;
}

interface IFieldTableRow {
  id: number;
  key?: any;
  name: string;
  type: fieldType;
  included: boolean;
  onChange: React.Dispatch<IFieldAction>;
  isFieldValid: (field: string) => { invalid: boolean; message: string };
  types: fieldType[];
}

interface IFieldAction {
  type: string;
  payload: {
    id: number;
    field: IField;
  };
}

//===============================================
// Define helper functions
//===============================================

function formatIllegalCharaters(char: string) {
  switch (char) {
    case " ":
      return "(space)";
    case ",":
      return "(comma)";
    default:
      return char;
  }
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
  const {
    dataset,
    metadata: {
      types,
      stopwords: { languages },
    },
    onReset = () => {},
  } = props;

  // get the history object to navigate to different page
  const history = useHistory();

  // inititalize the dataset state
  const [name, setName] = useState(dataset.filename);
  const [desc, setDesc] = useState("");
  // initialize the fields state
  const [fields, setFields] = useReducer(fieldsReducer, dataset.fields);
  // initialize the stopwords and stoplanguage
  const [stoplang, setStoplang] = useState("en");
  const [stopword, setStopword] = useState<string>("");

  function isFieldValid(field: string) {
    // check if field is empty
    if (field.length === 0) {
      return { invalid: true, message: "Field is empty" };
    }
    // check if there are duplicates in the fields
    const sameNames = fields.filter((f) => f.included && f.name === field);
    if (sameNames.length > 1) {
      return { invalid: true, message: "Field is duplicated" };
    }
    // check if the field contains illegal characters
    const notAllowed = field.match(/[^a-zA-Z_]/g);
    if (notAllowed) {
      const illegalChar = notAllowed.map((c) => formatIllegalCharaters(c));
      const illegalString =
        illegalChar.length <= 5
          ? illegalChar.join(", ")
          : illegalChar.slice(0, 5).join(", ") + "...";
      return {
        invalid: true,
        message: `Field has illegal characters: ${illegalString}`,
      };
    }
    // the field if ok
    return { invalid: false, message: "" };
  }

  async function onExec() {
    // check if the dataset name is present
    if (name.length === 0) {
      // TODO: add notification
      return;
    }

    // check if at least one field is included
    const isIncluded = fields.filter((f) => f.included);
    if (isIncluded.length === 0) {
      // TODO: add notification
      return;
    }

    // check if any of the included fields is invalid
    const isInvalid = fields.filter((f) => isFieldValid(f.name).invalid);
    if (isInvalid.length > 0) {
      // TODO: add notification
      return;
    }

    // otherwise prepare the values
    const uploadBody = {
      datasets: {
        name,
        description: desc,
        parameters: {
          stopwords: {
            language: stoplang,
            words: stopword.split(",").map((w) => w.trim()),
          },
        },
        fields,
      },
    };
    await axios.post(`/api/v1/datasets/${dataset.id}`, uploadBody);
    history.push(`/datasets/`);
  }

  //=========================
  // Prepare the stopwords
  //=========================

  // prepare stop language selection
  const stoplangId = languages.map((s) => s.value).indexOf(stoplang);
  const stoplangs = languages.map((s) => s.label);

  return (
    <React.Fragment>
      <section className={styles.dataset}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Input dataset name"
          onChange={(e) => setName(e.target.value)}
          label="Dataset Name"
          className={styles.name}
          invalid={name.length === 0}
          message={"Dataset name should not be empty"}
          required
        />
        <Textarea
          name="desc"
          rows={5}
          value={desc}
          placeholder="Input dataset description"
          onChange={(e) => setDesc(e.target.value)}
          label="Dataset Description (optional)"
        />
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
              <FieldTableRow
                key={id}
                id={id}
                {...field}
                onChange={setFields}
                isFieldValid={isFieldValid}
                types={types}
              />
            ))}
          </tbody>
        </table>
      </section>
      <section className={styles.stopwords}>
        <h3 className={styles.header}>Stopwords</h3>
        <div className={styles.options}>
          <Dropdown
            className={styles.dropdown}
            buttonSize="medium"
            buttonIntensity="dark"
            selectedId={stoplangId}
            options={stoplangs}
            onClick={(e) => setStoplang(languages[e].value)}
          />
          <Textarea
            className={styles.textarea}
            name="desc"
            rows={5}
            value={stopword}
            placeholder="Input stopwords separated by a comma"
            onChange={(e) => setStopword(e.target.value)}
            label="Additional Stopwords (optional)"
          />
        </div>
      </section>
      <section className={styles.actions}>
        <Button
          onClick={onReset}
          type="outline"
          size="medium"
          color="red"
          intensity="dark"
          text="Cancel"
        />
        <Button
          onClick={onExec}
          type="full"
          size="medium"
          color="blue"
          intensity="dark"
          text="Upload"
        />
      </section>
    </React.Fragment>
  );
}

function FieldTableRow(props: IFieldTableRow) {
  const { id, name, type, included, onChange, types, isFieldValid } = props;

  // get the selected type ID
  const selectedTypeId = types.indexOf(type);

  const { invalid, message } = isFieldValid(name);

  return (
    <tr>
      <td>
        <Input
          type="text"
          name="name"
          value={name}
          className={styles.fullWidth}
          onChange={(e) =>
            onChange({
              type: "UPDATE",
              payload: { id, field: { name: e.target.value, type, included } },
            })
          }
          disabled={!included}
          invalid={invalid}
          message={message}
        />
      </td>
      <td>
        <Dropdown
          className={styles.fullWidth}
          buttonSize="medium"
          buttonIntensity="dark"
          selectedId={selectedTypeId}
          options={types}
          disabled={!included}
          onClick={(e) =>
            onChange({
              type: "UPDATE",
              payload: { id, field: { name: name, type: types[e], included } },
            })
          }
        />
      </td>
      <td>
        <Checkbox
          checked={included}
          onClick={() =>
            onChange({
              type: "UPDATE",
              payload: {
                id,
                field: { name: name, type, included: !included },
              },
            })
          }
        />
      </td>
    </tr>
  );
}

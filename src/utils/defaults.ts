// import utilities
import Dataset from "./Dataset";

// ==============================================
// Storybook Defaults
// ==============================================

const datasets = {
  id: 1,
  type: "dataset",
  name: "Dataset Name",
  description: "Dataset Description",
  nDocuments: 1340010,
  created: "2021-01-27T13:12:10.555Z",
};

const subsets = [
  {
    id: 0,
    type: "subset",
    label: "root",
    description: "The root subset. Contains all records of the dataset.",
    resultedIn: null,
    usedBy: [0, 1],
    nDocuments: 1340010,
    modified: false,
    metadata: null,
  },
  {
    id: 1,
    type: "subset",
    label: "This subset has a long name",
    description: "The root subset. Contains all records of the dataset.",
    resultedIn: 1,
    usedBy: [2],
    nDocuments: 600010,
    modified: false,
    metadata: null,
  },
  {
    id: 2,
    type: "subset",
    label: "Short",
    description: "The root subset. Contains all records of the dataset.",
    resultedIn: 1,
    usedBy: [3, 5],
    nDocuments: 660010,
    modified: false,
    metadata: null,
  },
  {
    id: 3,
    type: "subset",
    label: "Empty SET",
    description: "The root subset. Contains all records of the dataset.",
    resultedIn: 1,
    usedBy: [4],
    nDocuments: 1200,
    modified: false,
    metadata: null,
  },
  {
    id: 4,
    type: "subset",
    label: "Positive Examples",
    description: "The root subset. Contains all records of the dataset.",
    resultedIn: 5,
    usedBy: [6],
    nDocuments: 340010,
    modified: false,
    metadata: null,
  },
  {
    id: 5,
    type: "subset",
    label: "Negative Examples",
    description: "The root subset. Contains all records of the dataset.",
    resultedIn: 5,
    usedBy: [7],
    nDocuments: 1040010,
    modified: false,
    metadata: null,
  },
];

const methods = [
  {
    id: 0,
    type: "method",
    method: "aggregates.subset",
    status: "FINISHED",
    appliedOn: 0,
    produced: null,
    parameters: {},
    result: {
      aggregates: [
        { field: "Field 1" },
        { field: "Field 2" },
        { field: "Field 3" },
      ],
    },
    modified: false,
  },
  {
    id: 1,
    type: "method",
    method: "clustering.kmeans",
    status: "FINISHED",
    appliedOn: 0,
    produced: [1, 2, 3],
    parameters: {},
    result: {
      clusters: [{ subsetId: 1 }, { subsetId: 2 }],
      empty: {
        subsetId: 3,
      },
    },
    modified: false,
  },
  {
    id: 2,
    type: "method",
    method: "aggregates.subset",
    status: "FINISHED",
    appliedOn: 1,
    produced: null,
    parameters: {},
    result: {
      aggregates: [
        { field: "Field 1" },
        { field: "Field 2" },
        { field: "Field 3" },
      ],
    },
    modified: false,
  },
  {
    id: 3,
    type: "method",
    method: "aggregates.subset",
    status: "FINISHED",
    appliedOn: 2,
    produced: null,
    parameters: {},
    result: {
      aggregates: [
        { field: "Field 1" },
        { field: "Field 2" },
        { field: "Field 3" },
      ],
    },
    modified: false,
  },
  {
    id: 4,
    type: "method",
    method: "aggregates.subset",
    status: "FINISHED",
    appliedOn: 3,
    produced: null,
    parameters: {},
    result: {
      aggregates: [
        { field: "Field 1" },
        { field: "Field 2" },
        { field: "Field 3" },
      ],
    },
    modified: false,
  },
  {
    id: 5,
    type: "method",
    method: "classifier.active_learning",
    status: "FINISHED",
    appliedOn: 2,
    produced: [4, 5],
    parameters: {},
    result: {
      labelCount: {},
      positive: {},
      negative: {},
    },
    modified: false,
  },
  {
    id: 6,
    type: "method",
    method: "aggregates.subset",
    status: "FINISHED",
    appliedOn: 4,
    produced: null,
    parameters: {},
    result: {
      aggregates: [
        { field: "Field 1" },
        { field: "Field 2" },
        { field: "Field 3" },
      ],
    },
    modified: false,
  },
  {
    id: 7,
    type: "method",
    method: "aggregates.subset",
    status: "FINISHED",
    appliedOn: 5,
    produced: null,
    parameters: {},
    result: {
      aggregates: [
        { field: "Field 1" },
        { field: "Field 2" },
        { field: "Field 3" },
      ],
    },
    modified: false,
  },
];

export const dataset = new Dataset(datasets, subsets, methods);

import { gql } from "@apollo/client";

export const ADD_CHECKLIST = gql`
  mutation addChecklist($title: String!) {
    addChecklist(title: $title) {
      _id
      title
    }
  }
`;

export const UPDATE_CHECKLIST = gql`
  mutation updateChecklist(
    $checklistId: ID
    $title: String
    $steps: StepInput
  ) {
    updateChecklist(checklistId: $checklistId, title: $title, steps: $steps) {
      title
      steps {
        text
        position
        conditionType
        conditionValue
      }
    }
  }
`;

export const DELETE_CHECKLIST = gql`
  mutation deleteChecklist($checklistId: ID!) {
    deleteChecklist(checklistId: $checklistId) {
      _id
      title
    }
  }
`;

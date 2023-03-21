import { gql } from "@apollo/client";

export const QUERY_CHECKLISTS = gql`
  query checklists {
    checklists {
      _id
      title
    }
  }
`;

export const QUERY_CHECKLIST = gql`
  query checklist($checklistId: ID!) {
    checklist(checklistId: $checklistId) {
      _id
      title
      steps {
        _id
        text
        position
        conditionType
        conditionValue
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const QUERY_CHECKLISTS = gql`
  query Checklists {
    checklists {
      title
      _id
    }
  }
`;

export const QUERY_CHECKLIST = gql`
  query checklist($checklistId: ID!) {
    checklist(checklistId: $checklistId) {
      _id
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

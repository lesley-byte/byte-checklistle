import { gql } from "@apollo/client";

export const QUERY_CHECKLISTS = gql`
  query Checklists($userId: ID) {
    checklists(userId: $userId) {
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

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      checklists {
        _id
        title
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      checklists {
        _id
        title
      }
    }
  }
`;

// Path: client\src\utils\queries.js

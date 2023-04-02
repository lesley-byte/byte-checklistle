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
        _id
        text
        position
        conditions {
          AND
          IF
          NAND
          NOR
          NOT
          OR
          XNOR
          XOR
        }
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

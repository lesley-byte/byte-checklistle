import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

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
    $checklistId: ID!
    $title: String
    $steps: [StepInput]
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

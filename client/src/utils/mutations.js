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
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CHECKLIST = gql`
  mutation addChecklist($title: String!, $userId: ID!) {
    addChecklist(title: $title, userId: $userId) {
      _id
      title
    }
  }
`;

export const UPDATE_CHECKLIST = gql`
  mutation updateChecklist(
    $checklistId: ID!
    $title: String
    $steps: [StepInputWithId]
    $userId: ID
  ) {
    updateChecklist(
      checklistId: $checklistId
      title: $title
      steps: $steps
      userId: $userId
    ) {
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

export const DELETE_CHECKLIST = gql`
  mutation deleteChecklist($checklistId: ID!, $userId: ID!) {
    deleteChecklist(checklistId: $checklistId, userId: $userId) {
      _id
      title
    }
  }
`;

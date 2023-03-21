import { gql } from "@apollo/client";

export const ADD_CHECKLIST = gql`
  mutation addChecklist($title: String!, $steps: [ID]) {
    addChecklist(title: $title, steps: $steps) {
      _id
      title
      steps {
        _id
        title
        isHiddenAtStart
        condition {
          _id
        }
        position
        isAntecedentOrConsequent
      }
    }
  }
`;

export const ADD_STEP = gql`
  mutation addStep(
    $title: String!
    $isHiddenAtStart: Boolean!
    $condition: [ID]
    $position: Int!
    $isAntecedentOrConsequent: String
  ) {
    addStep(
      title: $title
      isHiddenAtStart: $isHiddenAtStart
      condition: $condition
      position: $position
      isAntecedentOrConsequent: $isAntecedentOrConsequent
    ) {
      _id
      title
      isHiddenAtStart
      condition {
        _id
      }
      position
      isAntecedentOrConsequent
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const UPDATE_CHECKLIST = gql`
  mutation updateChecklist($checklistId: ID!, $title: String!, $steps: [ID]) {
    updateChecklist(checklistId: $checklistId, title: $title, steps: $steps) {
      _id
      title
      steps {
        _id
        title
        isHiddenAtStart
        condition {
          _id
        }
        position
        isAntecedentOrConsequent
      }
    }
  }
`;

export const UPDATE_STEP = gql`
  mutation updateStep(
    $stepId: ID!
    $title: String!
    $isHiddenAtStart: Boolean!
    $condition: [ID]
    $position: Int!
    $isAntecedentOrConsequent: String
  ) {
    updateStep(
      stepId: $stepId
      title: $title
      isHiddenAtStart: $isHiddenAtStart
      condition: $condition
      position: $position
      isAntecedentOrConsequent: $isAntecedentOrConsequent
    ) {
      _id
      title
      isHiddenAtStart
      condition {
        _id
      }
      position
      isAntecedentOrConsequent
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $username: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      userId: $userId
      username: $username
      email: $email
      password: $password
    ) {
      _id
      username
      email
      password
    }
  }
`;

export const REMOVE_CHECKLIST = gql`
  mutation removeChecklist($checklistId: ID!) {
    removeChecklist(checklistId: $checklistId) {
      _id
      title
      steps {
        _id
        title
        isHiddenAtStart
        condition {
          _id
        }
        position
        isAntecedentOrConsequent
      }
    }
  }
`;

export const REMOVE_STEP = gql`
  mutation removeStep($stepId: ID!) {
    removeStep(stepId: $stepId) {
      _id
      title
      isHiddenAtStart
      condition {
        _id
      }
      position
      isAntecedentOrConsequent
    }
  }
`;

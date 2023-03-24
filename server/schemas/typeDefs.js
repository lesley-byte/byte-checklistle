const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Checklist {
    _id: ID
    title: String!
    steps: [Step]
  }

  type Step {
    text: String!
    position: Int!
    conditionType: String
    conditionValue: String
  }

  input StepInput {
    text: String!
    position: Int!
    conditionType: String
    conditionValue: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    checklists: [Checklist]
  }

  type Query {
    checklists: [Checklist]
    checklist(checklistId: ID!): Checklist
  }

  type Mutation {
    addChecklist(title: String!): Checklist
    updateChecklist(checklistId: ID!, title: String, steps: [StepInput]): Checklist
    deleteChecklist(checklistId: ID!): Checklist
  }
`;

module.exports = typeDefs;
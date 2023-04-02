const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Checklist {
    _id: ID
    title: String
    steps: [Step]
  }

  type Step {
    _id: ID!
    text: String
    position: Int
    conditions: ConditionsMap
  }

  type ConditionsMap {
    AND: [String]
    IF: [String]
    NAND: [String]
    NOR: [String]
    NOT: [String]
    OR: [String]
    XNOR: [String]
    XOR: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    checklists: [Checklist]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    checklists(userId: ID): [Checklist]
    checklist(checklistId: ID!): Checklist
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addChecklist(title: String!, userId: ID!): Checklist
    updateChecklist(
      checklistId: ID!
      title: String
      steps: [StepInputWithId]
      userId: ID
    ): Checklist
    deleteChecklist(checklistId: ID!, userId: ID!): Checklist
  }

  input StepInputWithId {
    _id: ID
    text: String
    position: Int
    conditions: ConditionsInput
  }

  input ConditionsInput {
    AND: [String]
    IF: [String]
    NAND: [String]
    NOR: [String]
    NOT: [String]
    OR: [String]
    XNOR: [String]
    XOR: [String]
  }
`;

module.exports = typeDefs;

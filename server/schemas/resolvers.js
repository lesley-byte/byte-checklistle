const { Checklist, User } = require("../models");
const { signToken } = require("../utils/auth"); // Import the signToken function
const { AuthenticationError } = require("apollo-server-express");
// Rest of the resolvers.js file...

const resolvers = {
  Query: {
    checklists: async () => {
      try {
        return Checklist.find();
      } catch (error) {
        console.error("Error fetching checklists:", error);
        throw new Error("Error fetching checklists.");
      }
    },

    checklist: async (parent, { checklistId }) => {
      try {
        return Checklist.findOne({ _id: checklistId });
      } catch (error) {
        console.error("Error fetching checklist:", error);
        throw new Error("Error fetching checklist.");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Change 'name' to 'username'
      const user = await User.create({ username, email, password }); // Change 'name' to 'username'
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addChecklist: async (parent, { title }) => {
      try {
        return Checklist.create({ title });
      } catch (error) {
        console.error("Error adding checklist:", error);
        throw new Error("Error adding checklist.");
      }
    },

    updateChecklist: async (parent, { checklistId, title, steps }) => {
      try {
        const update = { ...(title && { title }), ...(steps && { steps }) };
        const updatedChecklist = await Checklist.findOneAndUpdate(
          { _id: checklistId },
          { $set: update },
          { new: true }
        );
        return updatedChecklist;
      } catch (error) {
        console.error("Error updating checklist:", error);
        throw new Error("Error updating checklist.");
      }
    },

    deleteChecklist: async (parent, { checklistId }) => {
      try {
        return Checklist.findOneAndDelete({ _id: checklistId });
      } catch (error) {
        console.error("Error deleting checklist:", error);
        throw new Error("Error deleting checklist.");
      }
    },
  },
};

module.exports = resolvers;

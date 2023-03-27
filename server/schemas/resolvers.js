const { Checklist, User } = require("../models");
const { signToken } = require("../utils/auth"); // Import the signToken function
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    checklists: async (parent, { userId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const checklists = await Checklist.find({ userId: userId });
        return checklists;
      } catch (error) {
        console.error("Error fetching checklists:", error);
        throw new Error("Error fetching checklists.");
      }
    },

    checklist: async (parent, { checklistId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        return Checklist.findOne({ _id: checklistId, userId: user._id });
      } catch (error) {
        console.error("Error fetching checklist:", error);
        throw new Error("Error fetching checklist.");
      }
    },

    me: async (parent, args, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        return User.findOne({ _id: user._id });
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user.");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { email, username, password }) => {
      const user = await User.create({
        email,
        username,
        password,
      });
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

    // In server-side resolver.js

    addChecklist: async (parent, { title, userId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const checklist = await Checklist.create({ title, userId });
        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { checklists: checklist._id } }
        );
        return checklist;
      } catch (error) {
        console.error("Error adding checklist:", error);
        throw new Error("Error adding checklist.");
      }
    },

    updateChecklist: async (
      parent,
      { checklistId, title, steps, userId },
      context
    ) => {
      try {
        const { user } = context;
        if (!user && !userId) {
          throw new AuthenticationError(
            "You need to be logged in or provide a valid userId!"
          );
        }

        const checklist = await Checklist.findOne({
          _id: checklistId,
          userId: userId || user._id,
        });

        if (!checklist) {
          throw new Error(
            "You don't have permission to update this checklist."
          );
        }

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

    deleteChecklist: async (parent, { checklistId, userId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError(
            "You need to be logged in! User was !user"
          );
        }
        const checklist = await Checklist.findOne({
          _id: checklistId,
          userId: userId,
        });

        if (!checklist) {
          throw new Error(
            "You don't have permission to delete this checklist. checklist was !checklist"
          );
        }
        return Checklist.findOneAndDelete({ _id: checklistId });
      } catch (error) {
        console.error("Error deleting checklist:", error);
        throw new Error("Error deleting checklist.");
      }
    },
  },

  User: {
    checklists: async (parent) => {
      try {
        return await Checklist.find({ user: parent._id });
      } catch (error) {
        console.error("Error fetching user checklists:", error);
        throw new Error("Error fetching user checklists.");
      }
    },
  },
};

module.exports = resolvers;

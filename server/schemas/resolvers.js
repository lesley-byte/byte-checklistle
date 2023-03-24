const { Checklist, User } = require("../models");

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

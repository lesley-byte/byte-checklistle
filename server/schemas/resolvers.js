const { Checklist, User } = require("../models");

const resolvers = {
  Query: {
    checklists: async () => {
      return Checklist.find();
    },
    checklist: async (parent, { checklistId }) => {
      const params = checklistId ? { _id: checklistId } : {};
      return Checklist.findOne(params);
    },
  },

  Mutation: {
    addChecklist: async (parent, { title }) => {
      return Checklist.create({ title });
    },
    updateChecklist: async (parent, { checklistId, title, steps }) => {
      console.log("steps: ", steps);
      const updatedChecklist = await Checklist.findOneAndUpdate(
        { _id: checklistId },
        { $set: { title: title }, $push: { steps: steps } },
        { new: true }
      );
      return updatedChecklist;
    },
    deleteChecklist: async (parent, { checklistId }) => {
      return Checklist.findOneAndDelete({ _id: checklistId });
    },
  },
};

module.exports = resolvers;

import exampleChecklist from "./exampleChecklist.js";

const CHECKLISTS_KEY = "playgroundChecklists";
export const PLAYGROUND_CHECKLISTS_KEY = "playgroundChecklists";

export const saveChecklistsToLocalStorage = (checklists) => {
  try {
    const serializedChecklists = JSON.stringify(checklists);
    localStorage.setItem(CHECKLISTS_KEY, serializedChecklists);
  } catch (error) {
    console.error("Error saving checklists to local storage:", error);
  }
};

export const getChecklistsFromLocalStorage = () => {
  const checklists = localStorage.getItem(CHECKLISTS_KEY);
  if (checklists) {
    return JSON.parse(checklists);
  } else {
    // If no checklists are found in local storage, create an example checklist
    localStorage.setItem(CHECKLISTS_KEY, JSON.stringify(exampleChecklist));
    return exampleChecklist;
  }
};

export const saveChecklistToLocalStorage = (checklist) => {
  const checklists = getChecklistsFromLocalStorage();

  const existingChecklistIndex = checklists.findIndex(
    (c) => c._id === checklist._id
  );

  if (existingChecklistIndex !== -1) {
    checklists.splice(existingChecklistIndex, 1, checklist);
  } else {
    checklists.push(checklist);
  }

  saveChecklistsToLocalStorage(checklists);
  return checklist;
};

export const getChecklistFromLocalStorage = (checklistId) => {
  const checklists = getChecklistsFromLocalStorage();
  const foundChecklist = checklists.find(
    (checklist) => checklist._id === parseInt(checklistId)
  );

  return foundChecklist || null;
};

export function updateChecklistsInLocalStorage(checklists) {
  localStorage.setItem(CHECKLISTS_KEY, JSON.stringify(checklists));
}

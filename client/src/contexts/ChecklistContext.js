import { createContext, useContext, useState } from 'react';

const ChecklistContext = createContext();

export const useChecklist = () => {
  return useContext(ChecklistContext);
};

export const ChecklistProvider = ({ children }) => {
  const [checklist, setChecklist] = useState(null);

  return (
    <ChecklistContext.Provider value={{ checklist, setChecklist }}>
      {children}
    </ChecklistContext.Provider>
  );
};

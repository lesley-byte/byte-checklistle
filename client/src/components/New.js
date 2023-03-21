import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_CHECKLIST } from "../utils/mutations";

const New = () => {
  const [addChecklist, { error }] = useMutation(ADD_CHECKLIST);

  const [formState, setFormState] = useState({
    title: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addChecklist({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>New checklist</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            placeholder="Title"
            name="title"
            type="text"
            id="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default New;

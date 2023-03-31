import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/minified/introjs.min.css";

const useIntro = () => {
  useEffect(() => {
    const editorTutorialShown = sessionStorage.getItem("editorTutorialShown");

    if (!editorTutorialShown) {
      const intro = introJs();

      intro.setOptions({
        steps: [
          {
            element: "#title",
            intro: "Here you can edit the title of the checklist.",
            position: "bottom",
          },
          {
            element: "#step",
            intro:
              "Here you can edit, or delete steps, and change the conditions (i.e., IF, NOT, XOR, XNOR) associated with each step.",
            position: "bottom",
          },
          {
            element: "#add-step",
            intro: "Here you can add a new step to the checklist.",
            position: "bottom",
          },
          {
            element: "#save",
            intro: "Here you can save the checklist.",
            position: "bottom",
          },
        ],
      });

      intro.start();

      sessionStorage.setItem("editorTutorialShown", "true");
    }
  }, []);
};

export default useIntro;

// Path: client\src\components\ChecklistForm\useIntro.js

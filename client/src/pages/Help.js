import React from "react";
import { Container, Grid, Typography, Link, Box, Paper } from "@mui/material";

const Help = () => {
  return (
    <Container maxWidth="md">
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5">Table of Contents</Typography>

              <ul>
                <li>
                  <a href="#getting-started">Getting Started</a>
                </li>
                <li>
                  <a href="#creating-an-account">Creating an Account</a>
                </li>
                <li>
                  <a href="#logging-in">Logging In</a>
                </li>
                <li>
                  <a href="#using-the-checklist-editor">
                    Using the Checklist Editor
                  </a>
                </li>
                <li>
                  <a href="#managing-checklists">Managing Checklists</a>
                  <ul>
                    <li>
                      <a href="#creating-a-new-checklist">
                        Creating a New Checklist
                      </a>
                    </li>
                    <li>
                      <a href="#editing-a-checklist">Editing a Checklist</a>
                    </li>
                    <li>
                      <a href="#updating-checklist-steps">
                        Updating Checklist Steps
                      </a>
                    </li>
                    <li>
                      <a href="#deleting-a-checklist">Deleting a Checklist</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#conditional-logic">Conditional Logic</a>
                </li>
                <li>
                  <a href="#troubleshooting-and-support">
                    Troubleshooting and Support
                  </a>
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4">Checklistle Help Page</Typography>

              <p>
                Welcome to the Checklistle Help Page! This guide will walk you
                through the main features and functionality of the Checklistle
                application, helping you make the most of this powerful tool for
                managing tasks and workflows.
              </p>

              <h2 id="getting-started">Getting Started</h2>

              <p>
                Checklistle is a web application designed to help you create and
                manage customizable checklists with conditional logic. To get
                started, you will need to create an account or log in if you
                already have one.
              </p>

              <h2 id="creating-an-account">Creating an Account</h2>

              <ol>
                <li>
                  Click the "Sign Up" link in the top-right corner of the
                  landing page.
                </li>
                <li>
                  Enter a username, email address, and password in the form.
                </li>
                <li>Click the "Sign Up" button to create your account.</li>
              </ol>

              <h2 id="logging-in">Logging In</h2>

              <ol>
                <li>
                  Click the "Log In" link in the top-right corner of the landing
                  page.
                </li>
                <li>Enter your email address and password in the form.</li>
                <li>Click the "Log In" button to access your account.</li>
              </ol>

              <h2 id="using-the-checklist-editor">
                Using the Checklist Editor
              </h2>

              <p>
                The Checklist Editor allows you to add, edit, and delete steps
                within your checklists. You can also specify conditions for each
                step based on the state of other steps in the list.
              </p>

              <ol>
                <li>Click the "ADD STEP" button to add a new step.</li>
                <li>Enter a description for the step in the text field.</li>
                <li>
                  Choose a condition type (e.g., AND, OR, IF, NOT, NOR, NAND,
                  XOR, XNOR) from the dropdown menu.
                </li>
                <li>
                  Specify the condition value by selecting the corresponding
                  steps.
                </li>
                <li>Click the "Save" button to save your changes.</li>
              </ol>

              <h2 id="managing-checklists">Managing Checklists</h2>

              <h3 id="creating-a-new-checklist">Creating a New Checklist</h3>

              <ol>
                <li>Go to the Checklist Management page.</li>
                <li>Enter a title for your new checklist in the form.</li>
                <li>
                  Click the "Create" button to add the new checklist to your
                  account.
                </li>
              </ol>

              <h3 id="editing-a-checklist">Editing a Checklist</h3>

              <ol>
                <li>
                  Click the "Edit" button next to the checklist you want to edit
                  on the Checklist Management page.
                </li>
                <li>
                  Update the checklist title or add, edit, and delete steps as
                  needed.
                </li>
                <li>Click the "Save Changes" button to save your changes.</li>
              </ol>

              <h3 id="updating-checklist-steps">Updating Checklist Steps</h3>

              <p>
                To update the status of a checklist step, simply click on the
                step. Clicking on the step will toggle its status between
                checked and unchecked. This will also automatically update any
                conditions that depend on the state of the updated step.
              </p>

              <p>
                You can rearrange the order of the steps in a checklist by using
                the drag and drop functionality. To do this, click and hold on
                the step you want to move, then drag it to the desired position
                within the checklist, either up or down. Release the click to
                place the step in its new position.
              </p>

              <h3 id="deleting-a-checklist">Deleting a Checklist</h3>

              <ol>
                <li>
                  Click the "Delete" button next to the checklist you want to
                  delete on the Checklist Management page.
                </li>
                <li>
                  Confirm your decision by clicking "Yes" in the confirmation
                  dialog.
                </li>
              </ol>

              <h2 id="conditional-logic">Conditional Logic</h2>

              <p>
                Conditional logic allows you to create dynamic checklists that
                adapt to the completion status of the steps within the list. By
                specifying conditions for each step, you can ensure that steps
                are only displayed or enabled when certain criteria are met.
              </p>

              <p>
                To learn more about the different types of conditions available
                and how to use them, please refer to the "Using the Checklist
                Editor" section above.
              </p>

              <h2 id="troubleshooting-and-support">
                Troubleshooting and Support
              </h2>

              <p>
                If you encounter any issues while using Checklistle, please
                consult the FAQ section for guidance. If you cannot find a
                solution in the FAQ, feel free to contact our support team by
                clicking the "Contact Us" link at the bottom of the page.
              </p>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Help;

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
                      <a href="#deleting-a-checklist">Deleting a Checklist</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#using-the-checklist-editor">
                    Using the Checklist Editor
                  </a>
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

              <h2 id="using-the-checklist-editor">
                Using the Checklist Editor
              </h2>

              <p>
                The Checklist Editor allows you to add, edit, and delete steps
                within your checklists. You can also specify conditions for each
                step based on the state of other steps in the list.
              </p>

              <ol>
                <li>Click the "+" button to add a new step.</li>
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

              <h2 id="conditional-logic">Conditional Logic</h2>

              <p>
                Checklistle supports multiple types of conditional logic to
                create complex workflows:
              </p>

              <ul>
                <li>
                  <strong>AND</strong>: The step is displayed if all specified
                  steps are checked.
                </li>
                <li>
                  <strong>OR</strong>: The step is displayed if any of the
                  specified steps are checked.
                </li>
                <li>
                  <strong>IF</strong>: The step is displayed if the first
                  specified step is checked.
                </li>
                <li>
                  <strong>NOT</strong>: The step is displayed if the first
                  specified step is not checked.
                </li>
                <li>
                  <strong>NOR</strong>: The step is displayed if none of the
                  specified steps are checked.
                </li>
                <li>
                  <strong>NAND</strong>: The step is displayed if not all
                  specified steps are checked.
                </li>
                <li>
                  <strong>XOR</strong>: The step is displayed if exactly one of
                  the specified steps are checked.
                </li>
                <li>
                  <strong>XNOR</strong>: The step is displayed if an even number
                  of the specified steps are checked.
                </li>
              </ul>

              <h2 id="troubleshooting-and-support">
                Troubleshooting and Support
              </h2>

              <p>
                If you encounter any issues while using Checklistle or have any
                questions, please refer to the following resources for
                assistance:
              </p>

              <ul>
                <li>
                  <strong>FAQs</strong>: Browse our Frequently Asked Questions
                  to find answers to common questions.
                </li>
                <li>
                  <strong>User Guide</strong>: Refer to the Checklistle User
                  Guide for detailed information about features and
                  functionality.
                </li>
                <li>
                  <strong>Contact Us</strong>: If you still need help, please
                  contact our support team by clicking the "Contact Us" link in
                  the application footer or by sending an email to
                  support@checklistle.com.
                </li>
              </ul>

              <p>Thank you for using Checklistle, and happy task managing!</p>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Help;

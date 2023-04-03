import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authService from "./utils/auth";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Editor from "./pages/Editor";
import ChecklistManagement from "./pages/ChecklistManagement";
import SingleChecklist from "./pages/SingleChecklist";
import { ChecklistProvider } from "./contexts/ChecklistContext";
import Layout from "./components/Layout";
import Help from "./pages/Help";
import TestPlayground from "./components/TestPlayground";
import TestPlaygroundManagement from "./pages/TestPlaygroundManagement";
import PlaygroundEditor from "./pages/PlaygroundEditor";
import PlaygroundSingleChecklist from "./pages/PlaygroundSingleChecklist";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = authService.getToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({ uri: "/graphql" });

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  addTypename: false, // Disable automatic addition of __typename
});

function App() {
  return (
    <ChecklistProvider>
      <ApolloProvider client={client}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/editor/:checklistId" element={<Editor />} />
              <Route
                path="/checklistManagement"
                element={<ChecklistManagement />}
              />
              <Route
                path="/checklist/:checklistId"
                element={<SingleChecklist />}
              />
              <Route path="/help" element={<Help />} />
              <Route path="/test" element={<TestPlayground />} />
              // Add new routes for Test Playground
              <Route
                path="/playground/checklistManagement"
                element={<TestPlaygroundManagement />}
              />
              <Route
                path="/playground/editor/:checklistId"
                element={<PlaygroundEditor />}
              />
              <Route
                path="/playground/checklistManagement"
                element={<TestPlaygroundManagement />}
              />
              <Route
                path="/playground/editor/:checklistId"
                element={<PlaygroundEditor />}
              />
              <Route
                path="/playground/checklist/:checklistId"
                element={<PlaygroundSingleChecklist />}
              />
              // Existing routes continue
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Landing />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </Layout>
        </Router>
      </ApolloProvider>
    </ChecklistProvider>
  );
}

export default App;

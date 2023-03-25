// App.js
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Editor from "./pages/Editor";
import ChecklistManagement from "./pages/ChecklistManagement";
import SingleChecklist from "./pages/SingleChecklist";
import { ChecklistProvider } from "./contexts/ChecklistContext";
import Layout from "./components/Layout";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
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
              <Route path="*" element={<Landing />} />
            </Routes>
          </Layout>
        </Router>
      </ApolloProvider>
    </ChecklistProvider>
  );
}

export default App;

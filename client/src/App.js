import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Header from "./components/Header";
import NavTabs from "./components/NavTabs";
import Footer from "./components/Footer";
import Editor from "./pages/Editor";
import ChecklistManagement from "./pages/ChecklistManagement";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <NavTabs />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/editor" element={<Editor />} />
            <Route
              path="/checklistManagement"
              element={<ChecklistManagement />}
            />
            <Route path="*" element={<Landing />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

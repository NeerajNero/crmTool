import React from "react";
import Leads from "../components/Leads";
import CreateLead from "../components/CreateLead";

const HomePage = () => {
  return (
    <div className="container">
      <div className="my-3">
        <div className="d-flex gap-3">
          <h3>Dashboard</h3> 
          <CreateLead />
        </div>
        <Leads />
      </div>
    </div>
  );
};

export default HomePage;

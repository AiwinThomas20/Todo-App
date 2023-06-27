import React from "react";
import ReactDOM from "react-dom/client";
import ToDo from "./components/ToDo";

const AppLayout = () => {
  return (
    <>
      <ToDo />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);

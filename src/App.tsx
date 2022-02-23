import React, { useEffect } from "react";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "./components/CellList";

const App = () => {
  useEffect(() => {
    document.title = "Sandbox JS";
  }, []);

  return (
    <div style={{ margin: "2rem" }}>
      <div>
        <CellList />
      </div>
    </div>
  );
};

export default App;

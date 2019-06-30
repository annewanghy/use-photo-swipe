import React, { useState } from "react";
import "./App.css";
import Popup from "./Popup";

function App() {
  const [isOpen, changeIsOpen] = useState();

  return (
    <div className="App">
      <button onClick={() => changeIsOpen(true)}>click me</button>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          items={[
            {
              src: "http://lorempixel.com/1200/900/sports/1",
              w: 1200,
              h: 900
            }
          ]}
          onClose={() => changeIsOpen(false)}
          options={{
            closeOnScroll: false
          }}
        />
      )}
    </div>
  );
}

export default App;

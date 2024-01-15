import React, { useState, useReducer, useRef, useEffect } from 'react';
import './App.css';

const nameArr = [
  {
    name: "Anuj",
    visible: true
  }
];

function reducer(arr, action) {
  switch (action.type) {
    case "ADD":
      return [...arr, { name: action.data, visible: true }];

    case "CHANGE":
      return arr.map((item, index) => {
        if (action.index === index) {
          return { ...item, visible: !item.visible };
        } else {
          return item;
        }
      });

    default:
      return arr;
  }
}

function App() {
  const [value, setValue] = useState("");
  const [myArr, dispatch] = useReducer(reducer, nameArr);

  function handleChangeValue(e) {
    setValue(e.target.value);
  }

  function handleOnClick() {
    dispatch({ type: "ADD", data: value });
  }

  function handleHide(index) {
    dispatch({ type: "CHANGE", index });
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []); // Empty dependency array to run only once

  const inputRef = useRef();

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => handleChangeValue(e)}
          ref={inputRef}
        />
        <button onClick={handleOnClick}>ADD</button>
      </div>
      <div>
        {myArr.map((item, index) => (
          <div key={index} id="mainbox">
            <p>{item.visible ? item.name : "Name is hidden"}</p>
            <button onClick={() => handleHide(index)}>Toggle</button>
          </div>
        ))}
      </div>
      <button onClick={() => inputRef.current.focus()} id='getback'>Get back writing</button>
    </>
  );
}

export default App;

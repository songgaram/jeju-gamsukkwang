import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { useRecoilState } from "recoil";

import { filterStatus } from "../states";

import { DROP_DOWN_LIST } from "./data";

const Dropdown = () => {
  const [selected, setSelected] = useRecoilState(filterStatus);
  const [isListOpen, setIsListOpen] = useState(false);
  const outsideRef = useRef(null);

  const handleSelectedClick = () => {
    setIsListOpen((prev) => !prev);
  };

  const handleItemClick = (e) => {
    const item = e.currentTarget.title;

    setSelected(item);
    setIsListOpen(false);
  };

  useClickAway(outsideRef, () => {
    setIsListOpen(false);
  });

  const dropdownList = DROP_DOWN_LIST.map((item) => (
    <li key={item.text}>
      <button
        type="button"
        title={item.text}
        onClick={handleItemClick}
        value={item.value}
      >
        {item.text}
      </button>
    </li>
  ));

  return (
    <div ref={outsideRef}>
      <button onClick={handleSelectedClick}>
        <input type="text" value={selected} readOnly />
      </button>
      {isListOpen && (
        <div>
          <ul>{dropdownList}</ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

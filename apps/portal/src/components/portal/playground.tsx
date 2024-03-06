import { useState, useRef } from "react";

import Portal from "./portal";

function PortalPlayground() {
  const [show, setShow] = useState(false);
  const container = useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {show ? "Unmount children" : "Mount children"}
      </button>
      {show ? (
        <Portal container={() => container.current}>
          <span>But I actually render here!</span>
        </Portal>
      ) : null}
    </div>
  );
}

export default PortalPlayground;

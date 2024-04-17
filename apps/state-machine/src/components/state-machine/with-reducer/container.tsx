import { useEffect, useCallback } from "react";

import { useStateMachineReducer } from "./reducer";

function Container() {
  const [currentState, dispatch] = useStateMachineReducer();

  useEffect(() => {
    if (currentState.effect) {
      const effect = currentState.effect;
      delete currentState.effect; // Mark as completed
      return effect();
    }
  }, [currentState]);

  const isVisible =
    currentState.stage === "showing" ||
    currentState.stage === "might-hide" ||
    currentState.stage === "hiding";

  const onPointerEnterTarget = useCallback(() => {
    dispatch("hovered");
  }, []);

  const onPointerLeaveTarget = useCallback(() => {
    dispatch("unhovered");
  }, []);

  return (
    <div>
      State Machine With React.Reducer
      {JSON.stringify(currentState)};
      <div
        onPointerEnter={onPointerEnterTarget}
        onPointerLeave={onPointerLeaveTarget}
        style={{
          width: 500,
          height: 500,
          border: "solid 1px gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Hover Me and Leave It!
        {isVisible && <div>I'm shown!</div>}
      </div>
    </div>
  );
}

export default Container;

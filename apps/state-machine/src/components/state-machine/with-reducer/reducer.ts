import React, { useReducer } from "react";

type Action =
  | "pressed"
  | "hovered"
  | "unhovered"
  | "show-timer-elapsed"
  | "hide-timer-elapsed"
  | "completed";

type State = {
  stage: "hidden" | "might-show" | "showing" | "might-hide" | "hiding";
  effect?: () => () => any;
};

const SHOW_DELAY = 350;
const HIDE_DELAY = 200;
const HIDE_DURATION = 200;

// Use case: Transitioning from hiding to show
type Return = [State, React.Dispatch<Action>];

export function useStateMachineReducer(): Return {
  const [currentState, dispatch] = useReducer(
    (state: State, action: Action): State => {
      if (state.stage === "hidden") {
        if (action === "hovered") {
          // Transitioning to -> 'might-show'
          return {
            stage: "might-show",
            effect() {
              const id = setTimeout(
                () => dispatch("show-timer-elapsed"),
                SHOW_DELAY,
              );
              return () => {
                clearTimeout(id);
              };
            },
          };
        }
      }

      if (state.stage === "might-show") {
        if (action === "unhovered") {
          return { stage: "hidden" };
        }
        if (action === "show-timer-elapsed") {
          return { stage: "showing" };
        }
      }

      if (state.stage === "showing") {
        if (action === "unhovered") {
          return {
            stage: "might-hide",
            effect() {
              const id = setTimeout(
                () => dispatch("hide-timer-elapsed"),
                HIDE_DELAY,
              );
              return () => clearTimeout(id);
            },
          };
        }
      }

      if (state.stage === "might-hide") {
        // At this point, two things can happen. Either the user hovers, and
        // we go back to showing it--or they linger enough that we'll start hiding the card.
        if (action === "hovered") {
          return { stage: "showing" };
        }
        if (action === "hide-timer-elapsed") {
          return {
            stage: "hiding",
            effect() {
              const id = setTimeout(() => dispatch("completed"), HIDE_DURATION);
              return () => clearTimeout(id);
            },
          };
        }
      }

      if (state.stage === "hiding") {
        // At that point, we'll hide the entire thing, going back to square one.
        if (action === "completed") {
          return { stage: "hidden" };
        }
      }

      // Something else happened. Keep calm and carry on.
      return state;
    },
    { stage: "hidden" },
  );

  return [currentState, dispatch];
}

export enum Action {
  PLAY = "play",
  RESET = "reset",
}

export const ActionComplete = {
  PLAY_COMPLETE: "play_complete",
  RESET_COMPLETE: "reset_complete",
} as const;

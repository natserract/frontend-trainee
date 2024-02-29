import useStateMachine from "@cassiozen/usestatemachine";

export enum State {
    RED_LIGHT = 'red_light',
    YELLOW_LIGHT = 'yellow_light',
    GREEN_LIGHT = 'green_light'
}

export enum Events {
    STOP = 'stop',
    READY_TO_DRIVE = 'ready_to_drive',
    DRIVE = 'drive',
}

export function useRedLightMachine() {
    const machine = useStateMachine({
        initial: State.RED_LIGHT,
        states: {
            [State.RED_LIGHT]: {
                on: {
                    [Events.READY_TO_DRIVE]: State.YELLOW_LIGHT
                }
            },
            [State.YELLOW_LIGHT]: {
                on: {
                    [Events.DRIVE]: State.GREEN_LIGHT
                }
            },
            [State.GREEN_LIGHT]: {
                on: {
                    [Events.STOP]: State.RED_LIGHT
                }
            }
        },
    })

    return machine
}
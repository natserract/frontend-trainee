import {useEffect} from "react";

import {Events, State, useRedLightMachine} from "./machine";

function StateMachinePlayground() {
    const [state, send] = useRedLightMachine()

    const handleTransition = () => {
        send(Events.READY_TO_DRIVE)
    }

    useEffect(() => {
        // In 2s, Get ready to drive
        if (state.value === State.YELLOW_LIGHT) {
            setTimeout(() => send(Events.DRIVE), 2000)
        }

        // In 5s, Get ready to stop
        if (state.value === State.GREEN_LIGHT) {
            setTimeout(() => send(Events.STOP), 5000)
        }
    }, [send, state.value])

    return (
        <div>
            State Machine playground
            {JSON.stringify(state.event)}

            <button onClick={handleTransition}>Start</button>
        </div>
    )
}

export default StateMachinePlayground
import {useCallback, useState} from "react";
import {emitOrderCreated} from "./events";
import OrderAction from "./action";

type StatusState = 'initial' | 'created' | 'done'

function EventEmitterPlayground() {
    const [status, setStatus] = useState<StatusState>('initial');

    const handleCreatedOrder = useCallback(() => {
        emitOrderCreated()
    }, [])

    return (
        <div>
            {JSON.stringify(status)}

            <button onClick={handleCreatedOrder}>
                Trigger order create!
            </button>

            <OrderAction onEvent={() => setStatus('created')} />
        </div>
    )
}

export default EventEmitterPlayground
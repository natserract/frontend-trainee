import {useCallback, useEffect} from "react";
import {listenOrderCreated} from "./events";

type OrderActionProps = {
    onEvent: () => void;
}

function OrderAction({ onEvent }: OrderActionProps) {
    const onOrderCreated = useCallback(() => {
        onEvent()
    }, [onEvent])

    // Listen `order_created` event and trigger other function,
    // cleanup Event Emitter listener on unmount
    useEffect(() => {
        return listenOrderCreated(onOrderCreated)
    }, [onOrderCreated])

    return (
        <div>
            Hello
        </div>
    )
}

export default OrderAction
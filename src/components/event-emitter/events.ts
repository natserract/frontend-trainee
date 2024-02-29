import EventEmitter from 'eventemitter3'

type UnlistenFn = () => void

export enum EventState {
    ORDER_CREATED = 'order_created',
}

const emitter = new EventEmitter();

export function emitOrderCreated() {
    emitter.emit(EventState.ORDER_CREATED);
}

export function listenOrderCreated(fn: () => void): UnlistenFn {
    emitter.on(EventState.ORDER_CREATED, fn);
    return () => emitter.off(EventState.ORDER_CREATED, fn);
}
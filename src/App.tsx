import './App.css'
import {HigherOrderComponentPlayground} from "./components/higher-order-component/playground";
import { ContextPlayground } from "./components/context/playground";
import {DataFetchingPlayground} from "./components/data-fetching/playground";
import EventEmitterPlayground from "./components/event-emitter/playground";
import StateMachinePlayground from "./components/state-machine/playground";
import ReactRouterPlayground from "./components/react-router/playground";

function App() {
  return (
    <>
        <HigherOrderComponentPlayground />
        <ContextPlayground />
        <DataFetchingPlayground />
        <EventEmitterPlayground />
        <StateMachinePlayground />
        <ReactRouterPlayground />
    </>
  )
}

export default App

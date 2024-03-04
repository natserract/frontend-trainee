## Finite State Machine (FSM)
Finite state machine (also called the finite state automaton or finite state automata) is a mathematical model of computation (abstract machine) that describes the system’s behaviour, alternative to other similar models such as the Turing machine. It consists of all possible states of the given object and transitions between them. When compared to the Turing machine, it has less computational power. This computational power distinction means that the computing ability of a FSM is more limited, due to the finite number of states it has (otherwise we would be talking about infinite state machines). 

## When should I use a State Machine?

There are clear signs that an entity could benefit state-transition model:
- Entity has a formal "status" property that tracks its current state. 
- Behavior changes based on status (e.g. some methods cannot be executed in certain statuses). 
- Events are published as a result of changes to the entity's state. 
- Spaghetti code in the domain model, specifically a lot of conditional logic in "generic-update" functions.

If your code reeks of these [code smells](https://en.wikipedia.org/wiki/Code_smell), you should consider implementing a simple state machine. Fortunately, it's not hard to implement a simple FSM using plain code (no frameworks). In the next section, I will demonstrate the creation of a minimalist state machine in JavaScript.

## Additional reading
- https://rclayton.silvrback.com/use-state-machines
- https://xstate.js.org/api/index.html
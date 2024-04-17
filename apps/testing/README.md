# Front-end Testing

> The more your tests resemble the way your software is used, the more confidence they can give you.

You want to write maintainable tests that give you high confidence that your components are working for your users. As a part of this goal, you want your tests to avoid including implementation details so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.

## Running

**Run the development server**

```bash
yarn dev
```

**Launches the cypress e2e testing suite**

```bash
yarn test:e2e:run
```

**Launches the test runner in the interactive watch mode**

```bash
yarn test:e2e
```

**Launches the rtl component testing**

```bash
yarn test:front
```

**Launches storybook**

```bash
yarn storybook
```

## Tools

- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [MSW](https://mswjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Story Book](https://storybook.js.org/)

## What should needed to Test?

- Business logic
- Presentational components
- Data Fetching and API Integration
- Authentication and Authorization
- Form Validation
- Cross-Browser and Cross-Device Compatibility
- Etc

## Tasks:

- Smoke Testing
- End-to-End Testing
- Functional Testing
- Integration Testing
- UI Testing

## Test Suites Related Files

- [smoke.spec.ts](cypress/e2e/smoke.spec.ts)
- [useSelectedItems.test](src/hooks/useSelectedItems.test.ts)
- [get.test](src/features/posts/api/get.test.tsx)
- [string-formatting.test](src/utils/string-formatting.test.ts)
- [App.test](src/App.test.tsx)
- [button.test](src/components/button/button.test.tsx)
- [Test Utils](src/test)

## Notes

### MSW

[msw](https://mswjs.io/) creates a mock server which intercepts all network requests and return the handlers (including stub responses) defined by you.

**The problems msw solved:**
Presently, when we run our test, we are hitting the actual API endpoint and waiting for the API to be done. This is not ideal. It can lead to slow and fragile tests, and adds an external network dependency to these unit tests. Instead, we will create a mock to model the exact API interaction.

Any unit test, at any level of the component tree, that triggers a call to GET /api (defined in msw handlers) will operate without any further configuration or thought. The API call will always be handled by the MSW server returning our standard handler's response. If need be, we can easily override the standard response with a unique handler for any specific test. Furthermore, if, for some reason, it would be desirable to mock the service layer for a given test suite that option still exists. The service mock would take precedence and no actual network request would be made. Using the MSW mock server, we gain the benefit of centrally defined API mocks that require little or no setup within our tests without losing any ability to fall back to other mocking techniques if they would be useful.

### What fixtures are?

Fixture refers to a set of predefined data or a specific state that is used as input for testing a component, module, or system. It is a known and controlled set of data that represents a particular scenario or condition.

Fixtures are commonly used to provide consistent and predictable test environments. They help ensure that the tests are not affected by external factors and produce reliable and reproducible results. Fixtures can be used to set up initial data, simulate different states, or provide mock data for API responses.

### Mocking

Mocking is a technique to isolate test subjects by replacing dependencies with objects that you can control and inspect. A dependency can be anything your subject depends on, but it is typically a module that the subject imports.

**Mocking Modules and Functions**
There are three main types of module and function mocking in Jest:

- `jest.fn`: Mock a function
- `jest.mock`: Mock a module
- `jest.spyOn`: Spy or mock a function

### TDD

TDD is a blend of all three: design, development, and testing. It’s an all-in-one methodology that enables developers to design simple, clean, and tested code. It’s a way to incrementally develop our software and comprehensively test all our business logic. It’s the gold standard way of producing quality software, incorporating best coding and design practices.

**Here are the [three laws of TDD](https://craftbettersoftware.com/p/the-tdd-debate)** that ensure a strict development flow:

1. You are not allowed to write any production code unless it is to make a failing unit test pass

2. You are not allowed to write any more of a unit test than is sufficient to fail, and compilation failures are failures

3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

## Additional Reading

- https://craftbettersoftware.com/p/why-tdd-is-a-non-negotiable
- https://startup-cto.net/tdd-in-a-react-frontend/
- https://www.denniskortsch.com/blog/develop-test-react-apps-react-query-msw-react-testing-library
- https://medium.com/javascript-journal-unlocking-project-potential/demystifying-jest-functions-mock-spyon-and-fn-a312fafb46b9

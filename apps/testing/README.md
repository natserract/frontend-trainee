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

## TDD

TDD is a blend of all three: design, development, and testing. It’s an all-in-one methodology that enables developers to design simple, clean, and tested code. It’s a way to incrementally develop our software and comprehensively test all our business logic. It’s the gold standard way of producing quality software, incorporating best coding and design practices.

**Here are the [three laws of TDD](https://craftbettersoftware.com/p/the-tdd-debate)** that ensure a strict development flow:

1. You are not allowed to write any production code unless it is to make a failing unit test pass

2. You are not allowed to write any more of a unit test than is sufficient to fail, and compilation failures are failures

3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

## Additional Reading

- https://craftbettersoftware.com/p/why-tdd-is-a-non-negotiable
- https://startup-cto.net/tdd-in-a-react-frontend/

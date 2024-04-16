import "@testing-library/jest-dom";
import * as React from "react";
import "whatwg-fetch";
import { server } from "./test/server/server";
import { QueryCache } from "@tanstack/react-query";

// Note: We set this here because setting it in the config is broken for projects: https://github.com/jestjs/jest/issues/9696
// Also, there are issues with async tests unless it is set at global scope: https://github.com/jestjs/jest/issues/11543
jest.setTimeout(60 * 1000);

window.React = React;

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const queryCache = new QueryCache();

// general cleanup
afterEach(async () => {
  queryCache.clear();
  // E.g Logout, resetting any state;
});

import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
  it("should using testing environment", () => {
    const IS_EE = process.env.IS_EE;
    expect(IS_EE).toEqual("true");
  });

  it("renders the component", () => {
    render(<App />);

    // Assert that the component is rendered
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});

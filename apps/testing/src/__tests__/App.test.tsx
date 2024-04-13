import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App component", () => {
  it("renders the component", () => {
    render(<App />);

    // Assert that the component is rendered
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});

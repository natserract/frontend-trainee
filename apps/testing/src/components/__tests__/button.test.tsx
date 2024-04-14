import { createRenderer } from "../../test/utils";
import { Button } from "../button";

describe("<Button />", () => {
  const { render } = createRenderer();

  it("should have text or children", () => {
    const { getByTestId } = render(<Button text="Click Me!" />);
    expect(getByTestId("root")).toHaveTextContent("Click Me!");
  });
});

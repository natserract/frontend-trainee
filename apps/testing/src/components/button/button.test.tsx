import { act, fireEvent } from "@testing-library/react";

import { createRenderer } from "../../test";
import { Button } from "./button";

describe("<Button />", () => {
  const { render, renderToString } = createRenderer();

  describe("prop: children", () => {
    it("should renders children", () => {
      const { getByTestId } = render(<Button>Click Me!</Button>);
      expect(getByTestId("root")).toHaveTextContent("Click Me!");

      const button = getByTestId("root");
      act(() => {
        button.focus();
      });
    });
  });

  describe("prop: disabled", () => {
    it("does not respond to user actions when disabled", () => {
      const handleClick = jest.fn();
      const { getByTestId } = render(
        <Button disabled onClick={handleClick}>
          Go to contact page
        </Button>,
      );

      const button = getByTestId("root");
      act(() => {
        fireEvent.click(button);
      });

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });

  describe("prop: href", () => {
    it('renders as a link when the "href" prop is provided', () => {
      const href = "/contact";
      const { getByTestId } = render(
        <Button href={href}>Go to contact page</Button>,
      );
      expect(getByTestId("root")).toHaveAttribute("href", href);
    });
  });

  describe("server-side-rendering", () => {
    it("renders the default element", () => {
      const { container } = renderToString(
        <Button disabled>Hello World</Button>,
      );

      expect((container.firstChild as HTMLElement).tagName).toEqual("BUTTON");
      expect(container.firstChild).toHaveAttribute("disabled");
    });
  });
});

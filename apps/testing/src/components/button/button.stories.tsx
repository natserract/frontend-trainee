import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./button";

export default {
  component: Button,
  title: "components/button",
} satisfies Meta<typeof Button>;

type ButtonProps = React.ComponentProps<typeof Button>;

const generateProps = ({ onClick = () => void null }: ButtonProps) => ({
  onClick,
});

export function Basic({ children, onClick }: ButtonProps) {
  if (children) {
    return <Button onClick={onClick}>{children}</Button>;
  }

  return <Button onClick={onClick}>{children}</Button>;
}

Basic.args = generateProps({ onClick: fn(), children: "Click Me!" });

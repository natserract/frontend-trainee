import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./button";

export default {
  component: Button,
  argTypes: {
    text: { control: "Click Me!" },
  },
  title: "components/button",
} satisfies Meta<typeof Button>;

type ButtonProps = React.ComponentProps<typeof Button>;

const generateProps = ({
  text = "Click Me!",
  onClick = () => void null,
}: ButtonProps) => ({
  text,
  onClick,
});

export function Basic({ text, children, onClick }: ButtonProps) {
  if (children) {
    return <Button onClick={onClick}>{children}</Button>;
  }

  return <Button text={text} onClick={onClick} />;
}

Basic.args = generateProps({ text: "Click Me!", onClick: fn() });

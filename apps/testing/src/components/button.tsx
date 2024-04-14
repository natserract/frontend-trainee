type Props = {
  text?: string;
  children?: React.ReactNode;
};

function Button(props: Props) {
  return <button data-testid="root">{props?.text ?? props.children}</button>;
}

export { Button };

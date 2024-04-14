type Props = {
  text?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

function Button(props: Props) {
  return (
    <button data-testid="root" onClick={props.onClick}>
      {props?.text ?? props.children}
    </button>
  );
}

export { Button };

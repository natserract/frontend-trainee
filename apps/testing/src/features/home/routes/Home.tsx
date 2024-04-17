import { Button } from "../../../components/button/button";

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Button onClick={() => console.log("Button clicked!")}>Click Me</Button>
    </div>
  );
}

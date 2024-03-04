import styles from "./page.module.css";
import { ContextPlayground } from "../components/playground";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <ContextPlayground />
    </main>
  );
}

import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "./navbar";

type Props = PropsWithChildren<{}>;

function Layout({}: Props) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export { Layout };

import { useInsertionEffect, Fragment } from "react";
import { renderConfiguration } from "./render";
import { useNatserractConfig } from "./useNatserractConfig";

function SyncExternalStorePlayground() {
  const config = useNatserractConfig();
  console.debug("config", config);

  useInsertionEffect(() => {
    renderConfiguration();
  }, []);

  return <Fragment />;
}

export default SyncExternalStorePlayground;

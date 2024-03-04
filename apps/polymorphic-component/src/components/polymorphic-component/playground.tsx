import { useEffect, useRef } from "react";

import { PolymorphicComponent } from "./polymorphic-component";

function PolymorphicComponentPlayground() {
  const ref = useRef(null);

  useEffect(() => {
    console.debug("PolymorphicComponent ref", ref);
  }, []);

  return (
    <>
      <PolymorphicComponent ref={ref} as="a" href="#">
        Link Href
      </PolymorphicComponent>
    </>
  );
}

export default PolymorphicComponentPlayground;

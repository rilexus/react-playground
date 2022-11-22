import React, {
  useReducer,
  useRef,
  createElement,
  useEffect,
  useState,
} from "react";
import A from "./component/A/A";
import B from "./component/B/B";
import C from "./component/C/C";

const createLazy = (endpoint) => {
  return (name) => {
    /**
     * Provide other dependencies, if needed.
     */
    window.createElement = createElement;

    /**
     * Return HOC Component
     */
    return (props) => {
      const [, rerender] = useReducer(() => ({}), {});
      const ref = useRef(() => null);

      useEffect(() => {
        if (window[name]) {
          /**
           * Look in to the cache. Prevent Fetching multiple times.
           */
          ref.current = window[name];
          return;
        }
        fetch(`${endpoint}/manifest.json`)
          .then((res) => res.json())
          .then((manifest) => {
            // Get path
            const path = manifest.components[name];

            const script = document.createElement("script");
            script.type = "application/javascript";
            script.src = `${endpoint}${path}`;
            script.onload = () => {
              ref.current = window[name];
              rerender();
            };

            const head = document.head;
            head.appendChild(script);
          });
      }, []);

      const Component = ref.current;
      return <Component {...props} />;
    };
  };
};

const lazy = createLazy(`${process.env.PUBLIC_URL}`);

const LazyComponent = lazy("Lazy");

const Suspense = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <A />
      <B />
      <C />
      {show && <LazyComponent value={"Hello from Suspense"} />}
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        load
      </button>
    </div>
  );
};

export default Suspense;

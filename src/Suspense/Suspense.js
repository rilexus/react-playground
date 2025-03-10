import React, {
  useReducer,
  useRef,
  createElement,
  useEffect,
  useState,
} from "react";

const Load = () => {
  const ref = useRef(() => null);
  const [, rerender] = useReducer(() => ({}), {});

  useEffect(() => {
    window.createElement = createElement;
    const script = document.createElement("script");
    script.type = "application/javascript";
    script.src = `/Lazy_somerandomid.js`;
    script.onload = () => {
      ref.current = window["Lazy"];
      rerender();
    };

    const head = document.head;
    head.appendChild(script);
  }, []);

  const Component = ref.current;

  return <Component value={"some"} />;
};

const Load2 = () => {
  const ref = useRef(() => null);
  const [, rerender] = useReducer(() => ({}), {});

  useEffect(() => {
    import("./component/Lazy/Lazy").then((res) => {
      console.log({ res });
      const Component = res.default;
      ref.current = Component;
      rerender();
    });
  }, []);

  const Component = ref.current;
  return <Component value={"some"} />;
};

const Load3 = ({ factory, ...props }) => {
  const ref = useRef(() => null);
  const [, rerender] = useReducer(() => ({}), {});

  useEffect(() => {
    factory().then((res) => {
      ref.current = res.default;
      rerender();
    });
  }, []);

  const Component = ref.current;
  return Component && <Component {...props} />;
};

const lazy = (factory) => {
  return (props) => {
    const ref = useRef(() => null);
    const [, rerender] = useReducer(() => ({}), {});

    useEffect(() => {
      factory()
        .then(({ default: Component }) => {
          ref.current = Component;

          rerender();
        })
        .catch((e) => {
          /**
           * Handle Error!
           */
        });
    }, []);

    const Component = ref.current;
    return <Component {...props} />;
  };
};

const Load4 = lazy(() => import("./component/Lazy/Lazy"));

const lazyWithThrow = (factory) => {
  let Component = () => null;
  let status = "pending";

  // return a React component function
  return function LazyWrapper(props) {
    useEffect(() => {
      // load JS module right away, LazyWrapper lazy is called
      let promise = factory()
        // wait for the JS module to be resolved
        .then((module) => {
          status = "resolved";
          // get the default export from a file
          Component = module.default;
        })
        .catch((e) => {
          // handle error
          status = "error";
        });

      // if still pending, throw to by catched by Suspense
      if (status === "pending") {
        throw promise;
      }
    }, []);

    return <Component {...props} />;
  };
};

class Suspense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentDidCatch(promiseOrError, errorInfo) {
    // do nothing, if not a promise
    if (typeof promiseOrError.then !== "function") return;
    const promise = promiseOrError;
    this.setState({
      // if catched, show fallback
      isLoading: true,
    });

    promise
      .then(() => {
        // promise is resolved, render children
        this.setState({
          isLoading: false,
        });
      })
      .catch((e) => {
        // handle error
      });
  }

  render() {
    const { isLoading } = this.state;
    const { fallback, children } = this.props;

    if (isLoading) {
      return fallback;
    }

    return children;
  }
}

const sleep = (time) => new Promise((res) => setTimeout(res, time));

const Load5 = lazyWithThrow(async () => {
  // await sleep(2000);
  return import("./component/Lazy/Lazy");
});

// const createLazy = (endpoint) => {
//   return (name) => {
//     /**
//      * Provide other dependencies, if needed.
//      */
//     window.createElement = createElement;
//
//     /**
//      * Return HOC Component
//      */
//     return (props) => {
//       const [, rerender] = useReducer(() => ({}), {});
//       const ref = useRef(() => null);
//
//       useEffect(() => {
//         if (window[name]) {
//           /**
//            * Look in to the cache. Prevent Fetching multiple times.
//            */
//           ref.current = window[name];
//           return;
//         }
//         fetch(`${endpoint}/manifest.json`)
//           .then((res) => res.json())
//           .then((manifest) => {
//             // Get path
//             const path = manifest.components[name];
//
//             const script = document.createElement("script");
//             script.type = "application/javascript";
//             script.src = `${endpoint}${path}`;
//             script.onload = () => {
//               ref.current = window[name];
//               rerender();
//             };
//
//             const head = document.head;
//             head.appendChild(script);
//           });
//       }, []);
//
//       const Component = ref.current;
//       return <Component {...props} />;
//     };
//   };
// };

// const lazy = createLazy(`${process.env.PUBLIC_URL}`);
// const LazyComponent = lazy("Lazy");

const Sus = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {/*{show && <Load value={"Hello World!"} />}*/}

      {/*{show && <Load2 value={"Load 2"} />}*/}

      {/*{show && (*/}
      {/*  <Load3*/}
      {/*    factory={() => import("./component/Lazy/Lazy")}*/}
      {/*    value={"Load3"}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{show && <Load4 value={"Load4"} />}*/}

      <Suspense fallback={<div>Here</div>}>
        {show && <Load5 value={"Load5"} />}
      </Suspense>

      {/*{show && <LazyComponent value={"Hello from Suspense"} />}*/}
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

export default Sus;

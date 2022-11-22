import React, {useCallback, useEffect, useRef, useState} from 'react';

const useDebounce = (fn, time) => {
  const timeout = useRef();
  const ref = useRef(fn);

  if (fn !== ref.current){
    ref.current = fn
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [time])

  return useCallback((...args) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      ref.current(...args)
    }, time);
  }, [])
}

const Input = ({validate, onChange}) => {
  const [value, setValue] = useState();
  const [, setValidating] = useState(false)

  const handle = () => {
    setValidating(true)
    validate(value).then(t => {
      onChange(value) // should be called once, with the value
    }).finally(() => {
      setValidating(false)
    })
  }

  const debouncedHandler = useDebounce(handle,500)

  return (
    <div>
      <input data-testid={'input'} type="text" onChange={(e) => {
        setValue(e.target.value);
        debouncedHandler()
      }}/>
    </div>
  );
};

export default Input;
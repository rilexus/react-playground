import {act, render, waitFor} from "@testing-library/react";
import Input from "./Input";
import userEvent from "@testing-library/user-event";


jest.useFakeTimers();

describe('Input', () => {
  it('should ', async function (done) {
    let resolve =  null
    const validate = () => {
      return new Promise((res) => {
        resolve = res;
      })
    }
    const onChange = jest.fn();

    const {getByTestId} = render(<Input validate={validate} onChange={onChange}/>)

    const input = getByTestId('input');

    act(() => {
      userEvent.type(input, 'some');
    })

    jest.runAllTimers();

    await waitFor(() => {
      resolve()
      expect(onChange).toHaveBeenCalledWith('some')

    })

  });
})
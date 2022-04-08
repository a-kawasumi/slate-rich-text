import React from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { decrement, increment } from '~/app/store/counter/counterSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {}
export const Counter: React.VFC<Props> = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button type="button" aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button type="button" aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
};

import { RefObject } from 'react';

export type GenericRef<T> =
  | ((instance: T | null) => void)
  | RefObject<T>
  | null
  | undefined;

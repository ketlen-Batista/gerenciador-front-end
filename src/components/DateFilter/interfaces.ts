import { RefObject } from 'react';

export type GenericRef<T> =
  | ((instance: T | null) => void)
  | RefObject<T>
  | null
  | undefined;

export interface DateRange {
  startDate: number | null;
  endDate: number | null;
}

export type PopoverDirection = 'left' | 'right';

import { SelectOption } from './interfaces';

export function factoryEnumToOptions(enumName: object): SelectOption[] {
  return Object.entries(enumName).map((value) => ({
    name: value[1] as string,
    value: value[0],
  }));
}

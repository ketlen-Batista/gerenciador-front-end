export const maskOnlyNumber = (value: string) => {
  return value.replace(/\D/g, '');
};

export const maskOnlyLetter = (value: string) => {
  return value.replace(/\d/g, '');
};

export const maskCep = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{1,2})/g, '$1-$2')
    .substring(0, 9);
};

export const maskDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+$/, '$1');
};

export const maskTelephone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(\d{4})\d+$/, '$1');
};

export const maskBrazilianCurrency = (value: string) => {
  const newValue = value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');

  return `R$ ${newValue}`;
};

export const maskCpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const maskCnpj = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const maskNumberWithDelimiter = (
  value: string,
  delimiter: string = '.',
): string => {
  const numericValue = value.replace(/\D/g, '');
  const reversedValue = numericValue.split('').reverse().join('');
  const formattedValue = reversedValue.replace(/(\d{3})/g, '$1' + delimiter);
  return formattedValue.split('').reverse().join('').replace(/^[.,]/, '');
};

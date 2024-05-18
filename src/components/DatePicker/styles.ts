import styled from 'styled-components';

export const Container = styled('div')`
  .ant-picker {
    width: 100%;
    padding: 7px 14px;
    border-radius: 4px;
    border-color: ${({ theme }) => theme.colors.text.disabled};

    input {
      font-size: 1rem;
      height: 1.5em;
      padding: 0;
    }

    .ant-picker-suffix {
      margin: 0;
      padding: 0 0.65rem;
      opacity: 1 !important;
    }
  }
`;

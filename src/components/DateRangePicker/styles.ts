import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   .ant-picker-dropdown {
    z-index: 1650 !important;
  }

  .ant-picker-dropdown-hidden {
    z-index: 1650 !important;
  }

  .ant-picker-dropdown-placement-bottomLeft {
    z-index: 1650 !important;
  }
`;

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

    /* .ant-picker-dropdown {
      z-index: 1650 !important;
    }

    :where(
        .css-dev-only-do-not-override-1r287do
      ).ant-picker-dropdown.ant-picker-dropdown-hidden {
      z-index: 1650 !important;
    } */
  }
`;

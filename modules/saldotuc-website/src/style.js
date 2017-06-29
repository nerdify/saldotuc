import { injectGlobal } from 'emotion'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    margin: 0;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    font-weight: normal;

    background-color: #f5f5f5;
    color: #292b2c;
    line-height: 1.5;
    
    &.home {
      background-color: #4285f4;
    }
  }
`;

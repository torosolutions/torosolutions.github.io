import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it.each(['/', '/id-photo', '/dev-tools', '/some/unknown/route'])(
    'renders %s without crashing',
    (path) => {
      const { container } = render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      );
      expect(container.textContent).not.toBe('');
    },
  );
});

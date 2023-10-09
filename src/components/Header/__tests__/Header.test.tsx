import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Contexts
import { ThemeProvider } from '@contexts';

// Components
import { Header } from '..';

const Component = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </ThemeProvider>
);

describe('Testing header', () => {
  it('Should render header component', () => {
    const { getByAltText } = render(<Component />);

    expect(getByAltText('Logo')).toBeInTheDocument();
  });

  it('Should click Login with correctly href', () => {
    const { getByText } = render(<Component />);

    expect(getByText('Login').closest('a')).toHaveAttribute('href', '/login');
  });

  it('Should click Sign Up with correctly href', () => {
    const { getByText } = render(<Component />);

    expect(getByText('Sign Up').closest('a')).toHaveAttribute('href', '/signup');
  });
});

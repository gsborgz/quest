import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Shop from '@/app/shop/page';

describe('Shop', () => {
  it('renders a heading', () => {
    render(<Shop />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Em Construção (Shop)');
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';

describe('Star Wars APP', () => {
  it('Should  show a list of characters including Luke Skywalker', () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  })
})


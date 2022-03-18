import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json'


describe('Star Wars APP', () => {
  it('Should  show a list of characters including Luke Skywalker', () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  })

  it("should show a list of characters from a JSON file", () => {
    render(<App />);
    for(let character of data.results) {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    }
  })
})


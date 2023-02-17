import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import {SearchBar} from "./SearchBar";

test('renders a search input', async () => {
  render(<MemoryRouter>
    <MockTheme>
      <SearchBar />
    </MockTheme>
  </MemoryRouter>);

  const searchBar = screen.getByLabelText(/search/i)
  expect(searchBar).toBeInTheDocument()
});
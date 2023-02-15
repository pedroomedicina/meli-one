import {render} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import {AccountLevel} from "./AccountLevel";

// const mockUser = {
//   "id_usuario":1,"nombre":"Mercadolibre","apellido":"User","nivel":"ORO",
//   "imagen":"https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png"
// }
// const mockLevel = {"id_nivel":"ORO","descripción":"Nivel Oro - Mercadopuntos"}

test('renders logo as anchor to home page', async () => {
    render(<MemoryRouter>
      <MockTheme>
        <AccountLevel/>
      </MockTheme>
    </MemoryRouter>);
});
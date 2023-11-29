import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { theme } from "./utils/constants";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";

import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import UserContextProvider from './Context/UserContext';
import {DataProvider} from './Context/DataContext';
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles></GlobalStyles>
    <DataProvider>
      <UserContextProvider>
        <ShopContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ShopContextProvider>
      </UserContextProvider>
    </DataProvider>
    </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
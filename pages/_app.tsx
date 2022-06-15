import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../src/components/Header/Header";
import { ThemeProvider } from "@emotion/react";
import { appTheme } from "../src/helpers/Theme";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import moment from "moment";
import "moment/locale/pl";

moment.locale("pl");

function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={appTheme}>
                <Header />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default App;

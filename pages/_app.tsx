import {CacheProvider} from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'
import {SWRConfig} from 'swr'
import '../styles/globals.css'
import {createEmotionCache} from "@utils/create-emotion-cache";
import {AppPropsWithLayout} from "@models/common";
import {theme} from "@utils/theme";
import axiosClient from "../api-client/axios-client";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({
                   Component,
                   pageProps,
                   emotionCache = clientSideEmotionCache,
               }: AppPropsWithLayout) {
    const Layout = Component.Layout

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default MyApp
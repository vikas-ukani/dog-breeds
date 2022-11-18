import DefaultLayout from 'Components/Layout/AppLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}

export default MyApp

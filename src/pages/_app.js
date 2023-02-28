import "@styles/custom.css";
import "react-multi-carousel/lib/styles.css";
import { CartProvider } from "react-use-cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Axios
import axios from "axios";
// reqct-query
import { QueryClient, QueryClientProvider } from "react-query";

//internal import
import { UserProvider } from "@context/UserContext";
import { SidebarProvider } from "@context/SidebarContext";
import DefaultSeo from "@component/common/DefaultSeo";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_KEY}` || null
);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ONE_DEAL_BACKEND_BASE_URL;

// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      // Enable retry in production
      retry: process.env.NODE_ENV === "production",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <Elements stripe={stripePromise}>
              <CartProvider>
                <DefaultSeo />
                <Component {...pageProps} />
              </CartProvider>
            </Elements>
          </SidebarProvider>
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;

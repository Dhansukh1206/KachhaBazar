import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";
import React, { useContext, useEffect, useRef } from "react";
import { IoCloudDownloadOutline, IoPrintOutline } from "react-icons/io5";

//internal import
import Layout from "@layout/Layout";
import Invoice from "@component/invoice/Invoice";
import Loading from "@component/preloader/Loading";
import { UserContext } from "@context/UserContext";

const Order = ({ params }) => {
  const componentRef = useRef();
  const orderId = params.id;
  const router = useRouter();
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const data = [];
  const loading = false;
  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Invoice" description="order confirmation page">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
          <div className="bg-yellow-100 rounded-md mb-5 px-4 py-3">
            <label>
              <span className="font-bold text-yellow-600">Thank you !</span> Your
              order have been received !
            </label>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <Invoice data={data} printRef={componentRef} />
            <div className="bg-white p-8 rounded-b-xl">
              <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between">
                <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                  Download Invoice{" "}
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
                <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                  <ReactToPrint
                    trigger={() => <p>Print Invoice</p>}
                    content={() => componentRef.current}
                  />
                  <span className="ml-2 text-base">
                    <IoPrintOutline />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });

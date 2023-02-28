import React from "react";
import { useForm } from "react-hook-form";

//internal import
import Error from "@component/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@component/form/InputArea";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Dashboard
      title="Change-Password"
      description="This is change-password page"
    >
      <h2 className="text-xl font-serif font-semibold mb-5">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid-cols-6 md:gap-6">
          <div className="md:mt-0 md:col-span-2">
            <div className="lg:mt-6 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <InputArea
                    register={register}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                  <Error errorName={errors.email} />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <InputArea
                    register={register}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Your Password"
                  />
                  <Error errorName={errors.password} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-right">
          <button
            type="submit"
            className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-yellow-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-yellow-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
          >
            Change Password
          </button>
        </div>
      </form>
    </Dashboard>
  );
};

export default ChangePassword;

import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";

const Common = ({ onShowRegister, setModalOpen }) => {
  const [enabled, setEnabled] = useState(false);
  const { handleSubmit, submitHandler, register, errors } =
    useLoginSubmit(setModalOpen);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          {!onShowRegister && (
            <div className="form-group">
              <InputArea
                register={register}
                label="Name"
                name="name"
                type="text"
                placeholder="Full Name"
                Icon={FiUser}
              />

              <Error errorName={errors.name} />
            </div>
          )}

          <div className="form-group">
            <InputArea
              register={register}
              defaultValue="9016912527"
              label="Mobile"
              name="mobile"
              type="mobile"
              placeholder="Mobile"
              Icon={FiMail}
            />
            <Error errorName={errors.mobile} />
          </div>

          <div className="form-group">
            <InputArea
              register={register}
              defaultValue="Yash@123"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              Icon={FiLock}
            />

            <Error errorName={errors.password} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-shrink-0">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </div>
            <div className="flex ms-auto">
              <button
                type="button"
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-all focus:outline-none my-1"
          >
            {onShowRegister ? <span>Login</span> : <span>Register</span>}
          </button>
        </div>
      </form>
    </>
  );
};

export default Common;

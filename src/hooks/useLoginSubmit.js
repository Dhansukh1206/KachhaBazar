import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

//internal import
import UserServices from "@services/UserServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = (setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ name, email, mobile, password }) => {
    if (name) {
      UserServices.userRegister({ name, email, password })
        .then((res) => {
          if (res) {
            dispatch({
              type: "USER_LOGIN",
              payload: res,
            });
            Cookies.set("userInfo", JSON.stringify(res));
            notifySuccess("user Created success!");
            router.push(redirect || "/");
            setModalOpen(false);
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setModalOpen(false);
        });
    } else {
      UserServices.userLogin({
        mobile,
        password,
      })
        .then((res) => {
          if (res) {
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("userInfo", JSON.stringify(res));
            router.push(redirect || "/");
            notifySuccess("Login Success!");
            setModalOpen(false);
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setModalOpen(false);
        });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    register,
    errors,
  };
};

export default useLoginSubmit;

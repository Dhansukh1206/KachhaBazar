import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

//internal import
import app from '@utils/firebase';
import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import { notifyError, notifySuccess } from '@utils/toast';

const useLoginSubmit = (setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const auth = getAuth(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ name, email, password }) => {
    if (name) {
      UserServices.userRegister({ name, email, password })
        .then((res) => {
          if (res) {
            dispatch({
              type: 'USER_LOGIN',
              payload: res,
            });
            Cookies.set('userInfo', JSON.stringify(res));
            notifySuccess('user Created success!');
            router.push(redirect || '/');
            setModalOpen(false);
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setModalOpen(false);
        });
    } else {
      UserServices.userLogin({
        email,
        password,
      })
        .then((res) => {
          if (res) {
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('userInfo', JSON.stringify(res));
            router.push(redirect || '/');
            notifySuccess('Login Success!');
            setModalOpen(false);
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setModalOpen(false);
        });
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        // The signed-in user info.
        const user = res.user;
        UserServices.signUpWithProvider({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        }).then((res) => {
          if (res) {
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('userInfo', JSON.stringify(res));
            notifySuccess('Login success!');
            router.push(redirect || '/');
            setModalOpen(false);
          }
        });
        // ...
      })
      .catch((err) => {
        notifyError(err.message);
        setModalOpen(false);
      });
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    register,
    errors,
  };
};

export default useLoginSubmit;

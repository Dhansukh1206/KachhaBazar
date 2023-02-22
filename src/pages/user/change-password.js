import React from 'react';
import { useForm } from 'react-hook-form';

//internal import
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';

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
    </Dashboard>
  );
};

export default ChangePassword;

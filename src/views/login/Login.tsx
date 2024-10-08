import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { authLoginAction } from '../../store/actions/auth.action';
import FormikInput from '../../shared-resources/components/Input/FormikInput';
import Button from '../../shared-resources/components/Button/Button';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    const loginValues = {
      password: values.password,
      email: values.email?.toLowerCase(),
    };
    dispatch(authLoginAction(loginValues));
  };

  return (
    <div className='pt-[87px] pb-[84px] pl-[60px] pr-[109px] flex flex-col'>
      <p className='text-4xl font-semibold text-headingTextColor pt-[23px] pb-[22px] px-[7px]'>
        Welcome to Assisted Math Learning
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required'),
        })}
      >
        {(formikProps) => {
          const areFieldsEmpty =
            !formikProps.values.email || !formikProps.values.password;
          const isError = Object.keys(formikProps.errors).length > 0;
          return (
            <Form>
              <div className='flex gap-[85px] items-end'>
                <div className='w-[962px] h-3/5 p-20 border-[1px] border-black mt-[61px] flex flex-col gap-[59px] items-center'>
                  <p className='text-4xl font-semibold text-headingTextColor pt-[23px] pb-[22px] text-center'>
                    LOGIN
                  </p>
                  <div className='flex flex-col gap-[34px]'>
                    <div className='flex gap-4 items-start'>
                      <p className='text-2xl text-headingTextColor translate-y-1/2'>
                        USERNAME
                      </p>
                      <FormikInput name='email' className='w-[236px]' />
                    </div>
                    <div className='flex gap-4 items-start'>
                      <p className='text-2xl text-headingTextColor  translate-y-1/2'>
                        PASSWORD
                      </p>
                      <FormikInput
                        name='password'
                        className='w-[236px]'
                        type='password'
                      />
                    </div>
                  </div>
                </div>

                <div className='pb-16'>
                  <Button type='submit' disabled={areFieldsEmpty || isError}>
                    Login
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;

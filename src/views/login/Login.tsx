import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { fetchCSRFToken } from 'store/actions/csrfToken.action';
import { localStorageService } from 'services/LocalStorageService';
import { authLoginAction } from '../../store/actions/auth.action';
import FormikInput from '../../shared-resources/components/Input/FormikInput';
import Button from '../../shared-resources/components/Button/Button';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorageService.getCSRFToken()) {
      dispatch(fetchCSRFToken());
    }
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: { username: string; password: string }) => {
    const loginValues = {
      password: values.password,
      username: values.username?.toLowerCase(),
    };
    dispatch(authLoginAction(loginValues));
  };

  return (
    <div className='flex flex-col'>
      <p className='text-4xl font-semibold text-headingTextColor ml-[60px] pt-[23px] pb-[22px] px-[7px]'>
        Welcome to Assisted Math Learning
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          username: yup.string().required('Username is required'),
          password: yup.string().required('Password is required'),
        })}
        validateOnChange // Disable validation on every keystroke
        validateOnBlur={false} // Validate only when the field loses focus (onBlur)
      >
        {(formikProps) => {
          // Check if both fields have values (without worrying about validation)
          const areFieldsFilled =
            !!formikProps.values.username && !!formikProps.values.password;

          return (
            <Form>
              <div className='flex gap-[85px] items-end'>
                <div className='w-[962px] h-3/5 p-20 border-[1px] ml-[60px] border-black mt-[61px] flex flex-col gap-[59px] items-center'>
                  <p className='text-4xl font-semibold text-headingTextColor pt-[23px] pb-[22px] text-center'>
                    LOGIN
                  </p>
                  <div className='flex flex-col gap-[34px]'>
                    <div className='flex gap-4 items-start'>
                      <p className='text-2xl w-36 text-headingTextColor translate-y-1/2'>
                        USERNAME
                      </p>
                      <FormikInput
                        name='username'
                        className='w-[236px]'
                        onBlur={formikProps.handleBlur} // Handle blur event for validation
                      />
                    </div>
                    <div className='flex gap-4 items-start'>
                      <p className='text-2xl w-36 text-headingTextColor translate-y-1/2'>
                        PASSWORD
                      </p>
                      <FormikInput
                        name='password'
                        type='password'
                        className='w-[236px]'
                        onBlur={formikProps.handleBlur} // Handle blur event for validation
                      />
                    </div>
                  </div>
                </div>

                <div className='pb-16'>
                  {/* Button gets enabled as soon as both fields have values */}
                  <Button type='submit' disabled={!areFieldsFilled}>
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

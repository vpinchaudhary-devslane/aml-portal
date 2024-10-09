import React, { forwardRef, useImperativeHandle } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Grid1QuestionProps {
  question: {
    answers: {
      result: string;
      isShowCarry: boolean;
      answerTop: string;
      answerResult: string;
    };
    numbers: {
      [key: string]: string;
    };
  };
  onSubmit: (gridData: any) => void;
}

interface FormValues {
  topAnswer: string[];
  resultAnswer: string[];
}

// Using forwardRef to forward refs to the parent component
const Grid1Question = forwardRef(
  ({ question, onSubmit }: Grid1QuestionProps, ref) => {
    const { answers, numbers } = question;

    const validationSchema = Yup.object({
      topAnswer: Yup.array().of(
        Yup.string()
          .required('Required')
          .matches(/^\d$/, 'Must be a single digit')
      ),
      resultAnswer: Yup.array().of(
        Yup.string()
          .required('Required')
          .matches(/^\d$/, 'Must be a single digit')
      ),
    });

    const formik = useFormik<FormValues>({
      initialValues: {
        topAnswer: answers.answerTop
          .split('')
          .map((val) => (val === 'B' ? '' : val)),
        resultAnswer: answers.answerResult
          .split('')
          .map((val) => (val === 'B' ? '' : val)),
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });

    // Expose the submitForm method to the parent component
    useImperativeHandle(ref, () => ({
      submitForm: formik.handleSubmit,
    }));

    return (
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col space-y-4 items-start'
      >
        {/* Top Answer Inputs */}
        <div className='flex space-x-2'>
          <div className='w-12 h-10 flex items-center justify-center font-bold text-[36px]'>
            {' '}
          </div>
          {formik.values.topAnswer.map((value, index) => (
            <div key={`top-${index}`}>
              <input
                type='text'
                name={`topAnswer.${index}`}
                value={formik.values.topAnswer[index]}
                onChange={formik.handleChange}
                maxLength={1}
                className='border-2 border-gray-900 rounded-[10px] p-2 w-[46px] h-[61px] text-center font-bold text-[36px] focus:outline-none focus:border-purple'
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
              {/* Using Array.isArray to check if formik.touched and formik.errors are arrays */}
              {Array.isArray(formik.touched.topAnswer) &&
                Array.isArray(formik.errors.topAnswer) &&
                formik.touched.topAnswer[index] &&
                formik.errors.topAnswer[index] && (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.topAnswer[index]}
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className='flex flex-col space-y-2'>
          {Object.keys(numbers).map((key, idx) => (
            <div key={key} className='flex justify-center space-x-2'>
              {/* Adding leading spaces for all but the last number */}
              {idx < Object.keys(numbers).length - 1 && (
                <div className='w-[46px] h-10 flex items-center justify-center font-bold text-[36px] leading-[42.3px]'>
                  {' '}
                  {/* Leading space */}
                </div>
              )}
              {/* Added the plus sign before the last number */}
              {idx === Object.keys(numbers).length - 1 && (
                <div className='w-[46px] h-10 flex items-center justify-center font-bold text-[36px]'>
                  +
                </div>
              )}
              {/* Rendering the number digits */}
              {numbers[key].split('').map((digit, index) => (
                <div
                  key={index}
                  className='w-[46px] h-10 flex items-center justify-center font-bold text-[36px]'
                >
                  {digit}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Result Inputs */}
        <div className='flex space-x-2'>
          {formik.values.resultAnswer.map((value, index) => (
            <div key={`result-${index}`}>
              <input
                type='text'
                name={`resultAnswer.${index}`}
                value={formik.values.resultAnswer[index]}
                onChange={formik.handleChange}
                maxLength={1}
                className='border-2 border-gray-900 rounded-[10px] p-2 w-[46px] h-[61px] text-center font-bold text-[36px] focus:outline-none focus:border-purple'
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
              {/* Checking for touched and errors for resultAnswer */}
              {Array.isArray(formik.touched.resultAnswer) &&
                Array.isArray(formik.errors.resultAnswer) &&
                formik.touched.resultAnswer[index] &&
                formik.errors.resultAnswer[index] && (
                  <div className='text-red-500 text-xs'>
                    {formik.errors.resultAnswer[index]}
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {/* <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded'
        >
          Submit
        </button> */}
      </form>
    );
  }
);

export default Grid1Question;

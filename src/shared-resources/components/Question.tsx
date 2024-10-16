/* eslint-disable func-names, react/no-this-in-sfc,  no-unsafe-optional-chaining */
import React, { forwardRef, useImperativeHandle } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { QuestionType } from 'models/enums/QuestionType.enum';
import ToggleButtonGroup from './ToggleButtonGroup/ToggleButtonGroup';

interface QuestionProps {
  question: {
    answers: {
      result: string;
      isPrefil: boolean;
      answerTop: string;
      answerResult: string;
    };
    numbers: {
      [key: string]: string;
    };
    questionType: QuestionType;
    questionId: string;
    options?: string[];
  };
  onSubmit: (gridData: any) => void;
}

interface FormValues {
  topAnswer: string[];
  resultAnswer: string[];
  row1Answers: string[];
  row2Answers: string[];
  questionType: QuestionType;
  fibAnswer: string;
  mcqAnswer: string;
  questionId: string;
}

// Using forwardRef to forward refs to the parent component
const Question = forwardRef(({ question, onSubmit }: QuestionProps, ref) => {
  const { answers, numbers } = question;

  const validationSchema = Yup.object({
    topAnswer: Yup.array()
      .of(
        Yup.string()
          .required('Required')
          .matches(/^\d$/, 'Must be a single digit')
      )
      .test(
        'is-topAnswer-required',
        'Top answer is required',
        function (value) {
          const { questionType } = this.parent;
          return (
            questionType !== QuestionType.GRID_1 || (value && value.length > 0)
          );
        }
      ),

    resultAnswer: Yup.array()
      .of(
        Yup.string()
          .required('Required')
          .matches(/^\d$/, 'Must be a single digit')
      )
      .test(
        'is-resultAnswer-required',
        'Result answer is required',
        function (value) {
          const { questionType } = this.parent;
          return (
            questionType !== QuestionType.GRID_1 || (value && value.length > 0)
          );
        }
      ),
    row1Answers: Yup.array()
      .of(Yup.string().nullable()) // Allow nulls for individual entries
      .test(
        'row1Answers-required',
        'Row 1 answers are required',
        function (value) {
          const { questionType } = this.parent; // Access parent context
          if (questionType === QuestionType.GRID_2) {
            return value && value.length > 0 && value.every((answer) => answer); // Check if every answer is provided
          }
          return true; // If not grid-2, skip validation
        }
      ),
    row2Answers: Yup.array()
      .of(Yup.string().nullable())
      .test(
        'row2Answers-required',
        'Row 2 answers are required',
        function (value) {
          const { questionType } = this.parent; // Access parent context
          if (questionType === QuestionType.GRID_2) {
            return value && value.length > 0 && value.every((answer) => answer); // Check if every answer is provided
          }
          return true; // If not grid-2, skip validation
        }
      ),
    fibAnswer: Yup.string()
      .nullable()
      .test(
        'fibAnswer-required',
        'Answer is required for Fill in the Blank',
        function (value) {
          const { questionType } = this.parent; // Access parent context
          if (questionType === QuestionType.FIB) {
            return !!value; // Return true if value is provided
          }
          return true; // Skip validation if not 'fib'
        }
      ),
    mcqAnswer: Yup.string()
      .nullable()
      .test(
        'mcqAnswer-required',
        'Please select an option for the MCQ question',
        function (value) {
          const { questionType } = this.parent; // Access parent context
          if (questionType === QuestionType.MCQ) {
            return !!value; // Ensure a selection is made
          }
          return true; // Skip validation if not 'mcq'
        }
      ),
  });

  const maxLength = Math.max(
    ...Object.values(numbers).map((num) => num.length)
  );

  const formik = useFormik<FormValues>({
    initialValues: {
      topAnswer: answers?.answerTop
        .split('')
        .map((val) => (val === 'B' ? '' : val)),
      resultAnswer: answers?.answerResult
        .split('')
        .map((val) => (val === 'B' ? '' : val)),
      row1Answers: Array(maxLength).fill(''),
      row2Answers: Array(maxLength).fill(''),
      questionType: question.questionType,
      fibAnswer: '',
      mcqAnswer: '',
      questionId: question.questionId,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (question.questionType === QuestionType.GRID_1) {
        onSubmit({
          questionId: question.questionId,
          topAnswer: values.topAnswer,
          resultAnswer: values.resultAnswer,
        });
      } else if (question.questionType === QuestionType.GRID_2) {
        onSubmit({
          row1Answers: values.row1Answers,
          row2Answers: values.row2Answers,
          questionId: question.questionId,
        });
      } else if (question.questionType === QuestionType.FIB) {
        onSubmit({
          questionId: question.questionId,
          fibAnswer: values.fibAnswer, // Pass the FIB answer
        });
      } else if (question.questionType === QuestionType.MCQ) {
        onSubmit({
          questionId: question.questionId,
          mcqAnswer: values.mcqAnswer, // Pass the FIB answer
        });
      }
      // Reset the form
      formik.resetForm();
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
      {question.questionType === QuestionType.GRID_1 && (
        <>
          <div className='flex justify-center self-end'>
            {Array.from({ length: question.answers?.answerTop?.length }).map(
              (_, index) => (
                <div
                  key={index}
                  className='w-[46px] mr-2 p-2 text-[#A5A5A5] text-center  flex items-center justify-center font-bold text-[20px]'
                >
                  {['U', 'T', 'H', 'Th', 'TTh', 'TTTh'][
                    question.answers?.answerTop?.length - index
                  ] || ''}
                </div>
              )
            )}
            <div className='w-[46px] p-2 text-[#A5A5A5] text-center  flex items-center justify-center font-bold text-[20px]'>
              U
            </div>
          </div>
          <div className='flex justify-end space-x-2 self-end'>
            {formik.values?.topAnswer?.map((value, index) => (
              <div key={`top-${index}`}>
                <input
                  type='text'
                  name={`topAnswer.${index}`}
                  value={formik.values?.topAnswer?.[index]}
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
            <div className='w-12 h-10 flex items-center justify-center font-bold text-[36px]'>
              {' '}
            </div>
          </div>
          <div className='flex flex-col space-y-2 self-end'>
            {Object.keys(numbers).map((key, idx) => (
              <div key={key} className='flex justify-end space-x-2'>
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
          <hr className='w-full text-black border border-black' />
          <div className='flex space-x-2'>
            <div className='w-12 h-10 flex items-center justify-center font-bold text-[36px]'>
              {' '}
            </div>
            {formik.values?.resultAnswer?.map((value, index) => (
              <div key={`result-${index}`}>
                <input
                  type='text'
                  name={`resultAnswer.${index}`}
                  value={formik.values?.resultAnswer?.[index]}
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
        </>
      )}
      {question.questionType === QuestionType.GRID_2 && (
        <>
          <div className='flex justify-center'>
            <div className='w-[75px] p-4  border border-gray-900 flex items-center justify-center font-bold text-[36px]'>
              {' '}
            </div>
            {Array.from({ length: maxLength }).map((_, index) => (
              <div
                key={index}
                className='w-[80px] h-[95px] p-4 border text-[#A5A5A5] border-gray-900 flex items-center justify-center font-bold text-[24px]'
              >
                {['U', 'T', 'H', 'Th', 'TTh'][maxLength - 1 - index] || ''}
              </div>
            ))}
          </div>
          <div className='flex flex-col !mt-0'>
            <div className='flex'>
              <div className='w-[75px] p-4 border border-gray-900 flex items-center justify-center font-bold text-[36px]'>
                {' '}
              </div>
              {formik.values?.row1Answers?.map((value, index) => (
                <div
                  key={`row-1-${index}`}
                  className='border border-gray-900 p-4'
                >
                  {' '}
                  <input
                    key={`row1-${index}`}
                    type='text'
                    name={`row1Answers.${index}`}
                    value={formik.values?.row1Answers?.[index]}
                    onChange={formik.handleChange}
                    maxLength={1}
                    className='border-2 border-gray-900 rounded-[10px] p-2 w-[46px] h-[61px] text-center font-bold text-[36px] focus:outline-none focus:border-purple'
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                  {Array.isArray(formik.touched.row1Answers) &&
                    Array.isArray(formik.errors.row1Answers) &&
                    formik.touched.row1Answers[index] &&
                    formik.errors.row1Answers[index] && (
                      <div className='text-red-500 text-xs'>
                        {formik.errors.row1Answers[index]}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Row 2 Inputs */}
            <div className='flex'>
              <div className='w-[75px] border border-gray-900 p-4 flex items-center justify-center font-bold text-[36px]'>
                +
              </div>
              {formik.values?.row2Answers?.map((value, index) => (
                <div
                  key={`row-2-${index}`}
                  className='border border-gray-900 p-4'
                >
                  <input
                    key={`row2-${index}`}
                    type='text'
                    name={`row2Answers.${index}`}
                    value={formik.values?.row2Answers?.[index]}
                    onChange={formik.handleChange}
                    maxLength={1}
                    className='border-2 border-gray-900 rounded-[10px] p-2 w-[46px] h-[61px] text-center font-bold text-[36px] focus:outline-none focus:border-purple'
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                  {Array.isArray(formik.touched.row2Answers) &&
                    Array.isArray(formik.errors.row2Answers) &&
                    formik.touched.row2Answers[index] &&
                    formik.errors.row2Answers[index] && (
                      <div className='text-red-500 text-xs'>
                        {formik.errors.row2Answers[index]}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {question.questionType === QuestionType.FIB && (
        <div className='flex flex-row items-center justify-center relative'>
          <p className='text-4xl flex flex-row w-[200px] font-semibold text-headingTextColor ml-[60px] pt-[23px] pb-[22px] px-[7px]'>
            {Object.values(question?.numbers || {}).join(' + ')}=
          </p>
          <div className='flex flex-col space-y-2 w-[236px]'>
            <input
              type='text'
              name='fibAnswer'
              value={formik.values.fibAnswer}
              onChange={formik.handleChange}
              onKeyPress={(e) => {
                // Prevent non-numeric key presses
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className='border-2 border-gray-900 rounded-[10px] p-2 w-full h-[61px] text-center font-bold text-[36px] focus:outline-none focus:border-purple'
            />
            {formik.touched.fibAnswer && formik.errors.fibAnswer && (
              <div className='text-red-500 text-xs absolute -bottom-2'>
                {formik.errors.fibAnswer}
              </div>
            )}
          </div>
        </div>
      )}

      {question.questionType === QuestionType.MCQ && !!question.options && (
        <div className='flex flex-col space-y-2'>
          <ToggleButtonGroup
            selectedValue={formik.values.mcqAnswer}
            setSelectedValue={(val) => formik.setFieldValue('mcqAnswer', val)}
            options={question.options}
          />

          {formik.touched.mcqAnswer && formik.errors.mcqAnswer && (
            <div className='text-red-500 text-xs'>
              {formik.errors.mcqAnswer}
            </div>
          )}
        </div>
      )}
    </form>
  );
});

export default Question;

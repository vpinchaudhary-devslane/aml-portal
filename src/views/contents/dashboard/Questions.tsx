import React, { useEffect, useState, useRef } from 'react';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import Grid1Question from 'shared-resources/components/Grid1Question';
import Loader from 'shared-resources/components/Loader/Loader';

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    {
      topAnswer: string[];
      resultAnswer: string[];
    }[]
  >([]);
  const grid1QuestionRef = useRef<{ submitForm: () => void } | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const mockQuestions = [
        {
          answers: {
            result: '1234',
            isShowCarry: true,
            answerTop: '3339',
            answerResult: '333338',
          },
          numbers: { n1: '23326', n2: '25622' },
        },
        {
          answers: {
            result: '5678',
            isShowCarry: true,
            answerTop: 'BBBB',
            answerResult: 'BBBBBB',
          },
          numbers: { n1: '43326', n2: '55622' },
        },
      ];
      setQuestions(mockQuestions);
    };
    fetchQuestions();
  }, []);

  const handleNextClick = () => {
    if (grid1QuestionRef.current) {
      grid1QuestionRef.current.submitForm();
    }
  };

  const handleQuestionSubmit = (gridData: any) => {
    console.log('Grid Submitted Data in Questions:', gridData);
    setSubmittedAnswers((prev) => [
      ...prev,
      {
        topAnswer: gridData.topAnswer,
        resultAnswer: gridData.resultAnswer,
      },
    ]);
    setCurrentQuestionIndex((prev) => prev + 1); // Move to next question
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    console.log('LATEST ANSWERS', submittedAnswers);
  }, [submittedAnswers]);
  return (
    <ContainerLayout
      headerText={`Question ${currentQuestionIndex + 1}`}
      content={
        <div className='text-4xl font-semibold text-headingTextColor'>
          {!!questions.length && currentQuestion ? (
            <Grid1Question
              ref={grid1QuestionRef}
              question={questions[currentQuestionIndex]}
              onSubmit={handleQuestionSubmit}
            />
          ) : (
            <Loader />
          )}
        </div>
      }
      buttonText='Next'
      onButtonClick={handleNextClick}
    />
  );
};

export default Questions;

import { Description } from '@mui/icons-material';
import React, { useEffect, useState, useRef } from 'react';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import GridQuestion from 'shared-resources/components/Grid1Question';
import Loader from 'shared-resources/components/Loader/Loader';

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    {
      topAnswer: string[];
      resultAnswer: string[];
      row1Answers: string[];
      row2Answers: string[];
      fibAnswer: string;
      mcqAnswer: string;
      questionId: string;
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
            answerResult: '233338',
          },
          numbers: { n1: '23326', n2: '25622' },
          questionType: 'grid-1',
          description: { en: 'Solve' },
          questionId: '1',
        },
        {
          answers: {
            result: '5678',
            isShowCarry: true,
            answerTop: 'BBBB',
            answerResult: 'BBBBBB',
          },
          numbers: { n1: '43326', n2: '55622' },
          questionType: 'grid-1',
          description: { en: 'Solve' },
          questionId: '2',
        },
        {
          numbers: { n1: '756', n2: '53552' },
          questionType: 'grid-2',
          description: { en: 'Write numbers as per their place values' },
          questionId: '3',
        },
        {
          questionType: 'fib',
          numbers: { n1: '7', n2: '2200' },
          description: { en: 'Solve' },
          questionId: '4',
        },
        {
          numbers: { n1: '45', n2: '4567' },
          options: ['7645', '5434', '6582', '6541', '', ''],
          questionType: 'mcq',
          description: { en: 'Choose the correct option' },
          questionId: '5',
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
    setSubmittedAnswers((prev) => [
      ...prev,
      {
        topAnswer: gridData.topAnswer,
        resultAnswer: gridData.resultAnswer,
        row1Answers: gridData?.row1Answers,
        row2Answers: gridData?.row2Answers,
        fibAnswer: gridData?.fibAnswer,
        mcqAnswer: gridData?.mcqAnswer,
        questionId: gridData.questionId,
      },
    ]);
    setCurrentQuestionIndex((prev) => prev + 1); // Move to next question
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const filteredAnswers = submittedAnswers.map(
      ({ questionId, ...answers }) => ({
        questionId,
        answers: Object.fromEntries(
          Object.entries(answers).filter(([_, value]) => value !== undefined)
        ),
      })
    );

    console.log('LATEST ANSWERS', filteredAnswers);
  }, [submittedAnswers]);

  return (
    <ContainerLayout
      headerText={
        questions[currentQuestionIndex]?.description?.en
          ? `${questions[currentQuestionIndex]?.description?.en}`
          : 'Loading...'
      }
      content={
        <div className='text-4xl font-semibold text-headingTextColor'>
          {!!questions.length && currentQuestion ? (
            <GridQuestion
              ref={grid1QuestionRef}
              question={questions[currentQuestionIndex]}
              onSubmit={(gridData) => handleQuestionSubmit(gridData)}
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
import { QuestionType } from 'models/enums/QuestionType.enum';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import Loader from 'shared-resources/components/Loader/Loader';
import Question from 'shared-resources/components/Question';
import {
  convertResponseToLearnerResponse,
  transformQuestions,
} from 'shared-resources/utils/helpers';
import { questionsSetSelector } from 'store/selectors/questionSet.selector';

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const questionSet = useSelector(questionsSetSelector);
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
  const questionRef = useRef<{
    submitForm: () => void;
  } | null>(null);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const mockQuestions = [
  //       {
  //         answers: {
  //           result: '1234',
  //           isPrefil: true,
  //           answerTop: '3339',
  //           answerResult: '233338',
  //         },
  //         numbers: { n1: '23326', n2: '25622' },
  //         questionType: QuestionType.GRID_1,
  //         description: { en: 'Solve' },
  //         questionId: '1',
  //       },
  //       {
  //         answers: {
  //           result: '5678',
  //           isPrefil: true,
  //           answerTop: 'BBBB',
  //           answerResult: 'BBBBBB',
  //         },
  //         numbers: { n1: '43326', n2: '55622' },
  //         questionType: QuestionType.GRID_1,
  //         description: { en: 'Solve' },
  //         questionId: '2',
  //       },
  //       {
  //         numbers: { n1: '756', n2: '53552' },
  //         questionType: QuestionType.GRID_2,
  //         description: { en: 'Write numbers as per their place values' },
  //         questionId: '3',
  //       },
  //       {
  //         questionType: QuestionType.FIB,
  //         numbers: { n1: '7', n2: '2200' },
  //         description: { en: 'Solve' },
  //         questionId: '4',
  //       },
  //       {
  //         numbers: { n1: '45', n2: '4567' },
  //         options: ['7645', '5434', '6582', '6541', '', ''],
  //         questionType: QuestionType.MCQ,
  //         description: { en: 'Choose the correct option' },
  //         questionId: '5',
  //       },
  //     ];
  //     setQuestions(mockQuestions);
  //   };
  //   fetchQuestions();
  // }, []);

  useEffect(() => {
    if (questionSet?.questions) {
      const { questions } = questionSet;
      console.log('HERE', questions);
      if (questions) {
        const transformedQuestions = transformQuestions(questions);
        console.log('Transformed', transformedQuestions);
        setQuestions(transformedQuestions);
      }
    }
  }, [questionSet]);

  const handleNextClick = () => {
    if (questionRef.current) {
      questionRef.current.submitForm();
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
    // will check for refactoring after v1 release
    const filteredAnswers = submittedAnswers.map(
      ({ questionId, ...answers }) => ({
        questionId,
        answers: Object.fromEntries(
          Object.entries(answers).filter(([_, value]) => value !== undefined)
        ),
      })
    );
    if (questionSet) {
      const payload = convertResponseToLearnerResponse(
        filteredAnswers,
        questionSet?.identifier
      );
      console.log('PAYLOAD', payload);
    }
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
            <Question
              ref={questionRef}
              question={questions[currentQuestionIndex]}
              onSubmit={(gridData) => handleQuestionSubmit(gridData)}
              onValidityChange={(value: boolean) => {
                setIsFormValid(value);
              }}
            />
          ) : (
            <Loader />
          )}
        </div>
      }
      buttonText='Next'
      onButtonClick={handleNextClick}
      buttonDisabled={!isFormValid}
    />
  );
};

export default Questions;

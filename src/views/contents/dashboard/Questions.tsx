import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageService } from 'services/LocalStorageService';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import Loader from 'shared-resources/components/Loader/Loader';
import Question from 'shared-resources/components/Question';
import {
  convertResponseToLearnerResponse,
  transformQuestions,
} from 'shared-resources/utils/helpers';
import { syncLearnerResponse } from 'store/actions/syncLearnerResponse.action';
import { learnerIdSelector } from 'store/selectors/auth.selector';
import { learnerJourneySelector } from 'store/selectors/learnerJourney.selector';
import { questionsSetSelector } from 'store/selectors/questionSet.selector';

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const questionSet = useSelector(questionsSetSelector);
  const learnerId = useSelector(learnerIdSelector);
  const learnerJourney = useSelector(learnerJourneySelector);
  const dispatch = useDispatch();
  const [submittedAnswers, setSubmittedAnswers] = useState<
    {
      topAnswer: string[];
      resultAnswer: string[];
      row1Answers: string[];
      row2Answers: string[];
      fibAnswer: string;
      mcqAnswer: string;
      questionId: string;
      start_time?: string;
      end_time?: string;
    }[]
  >([]);
  const questionRef = useRef<{
    submitForm: () => void;
  } | null>(null);

  useEffect(() => {
    if (questionSet?.questions) {
      const { questions } = questionSet;
      if (questions) {
        const transformedQuestions = transformQuestions(questions);
        // Retrieve saved responses from local storage
        const savedResponses = localStorageService.getLearnerResponseData(
          String(learnerId)
        );
        if (savedResponses?.length) {
          // If local storage data is present, use it to find the first unanswered question
          const answeredQuestionIds =
            savedResponses?.map((response: any) => response.question_id) || [];
          const firstUnansweredIndex = transformedQuestions.findIndex(
            (question: any) =>
              !answeredQuestionIds.includes(question.questionId)
          );
          setQuestions(transformedQuestions);
          setCurrentQuestionIndex(
            firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0
          );
        } else if (
          learnerJourney &&
          learnerJourney?.completed_question_ids?.length
        ) {
          // If no local storage data, use completedQuestionIds from API
          const firstUnansweredIndex = transformedQuestions.findIndex(
            (question: any) =>
              !(learnerJourney.completed_question_ids as string[]).includes(
                question.questionId
              )
          );
          setQuestions(transformedQuestions);
          setCurrentQuestionIndex(
            firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0
          );
        } else {
          // Fallback to start from 0th question if both are null
          setQuestions(transformedQuestions);
          setCurrentQuestionIndex(0);
        }
      }
    }
  }, [questionSet]);

  const handleNextClick = () => {
    if (questionRef.current) {
      questionRef.current.submitForm();
    }
    if (questions.length === currentQuestionIndex && learnerId) {
      const learnerResponseData = localStorageService.getLearnerResponseData(
        String(learnerId)
      );
      dispatch(
        syncLearnerResponse({
          learner_id: learnerId,
          questions_data: learnerResponseData,
        })
      );
    }
  };

  const handleQuestionSubmit = (gridData: any) => {
    const currentTime = new Date().toISOString(); // Capture the current time

    setSubmittedAnswers((prev) => {
      const newAnswer = {
        topAnswer: gridData.topAnswer,
        resultAnswer: gridData.resultAnswer,
        row1Answers: gridData?.row1Answers,
        row2Answers: gridData?.row2Answers,
        fibAnswer: gridData?.fibAnswer,
        mcqAnswer: gridData?.mcqAnswer,
        questionId: gridData.questionId,
        start_time: '',
        end_time: '',
      };
      // Add start_time to the first question
      if (currentQuestionIndex === 0) {
        newAnswer.start_time = currentTime;
      }

      // Add end_time to the last question
      if (currentQuestionIndex === questions.length - 1) {
        newAnswer.end_time = currentTime;
      }

      return [...prev, newAnswer];
    });
    setCurrentQuestionIndex((prev) => prev + 1); // Move to next question
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // will check for refactoring after v1 release
    const filteredAnswers = submittedAnswers.map(
      ({ questionId, start_time, end_time, ...answers }) => ({
        questionId,
        start_time,
        end_time,
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
      if (!!learnerId && payload.length) {
        localStorageService.saveLearnerResponseData(String(learnerId), payload);
      }
    }
  }, [submittedAnswers]);

  return (
    <ContainerLayout
      headerText={
        questions[currentQuestionIndex]?.description?.en
          ? `${questions[currentQuestionIndex]?.description?.en}`
          : ''
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
            // <Loader />
            'Congratulations!! You have completed this question set please click start to start next question set'
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

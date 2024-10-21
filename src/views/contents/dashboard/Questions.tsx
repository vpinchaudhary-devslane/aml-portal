/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageService } from 'services/LocalStorageService';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import Question from 'shared-resources/components/Question';
import {
  convertResponseToLearnerResponse,
  transformQuestions,
} from 'shared-resources/utils/helpers';
import { fetchLogicEngineEvaluation } from 'store/actions/logicEngineEvaluation.action';
import { syncLearnerResponse } from 'store/actions/syncLearnerResponse.action';
import { learnerIdSelector } from 'store/selectors/auth.selector';
import { learnerJourneySelector } from 'store/selectors/learnerJourney.selector';
import { questionsSetSelector } from 'store/selectors/questionSet.selector';

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false); // State to track if the set is completed
  const [isSyncing, setIsSyncing] = useState(false); // State to manage sync loading
  const questionSet = useSelector(questionsSetSelector);
  const learnerId = useSelector(learnerIdSelector);
  const learnerJourney = useSelector(learnerJourneySelector);
  const dispatch = useDispatch();
  const questionRef = useRef<{ submitForm: () => void } | null>(null);

  useEffect(() => {
    if (questionSet?.questions) {
      const { questions } = questionSet;

      if (questions) {
        const transformedQuestions = transformQuestions(questions);
        const savedResponses = localStorageService.getLearnerResponseData(
          String(learnerId)
        );
        const localStorageAnsweredIds =
          savedResponses?.map((response: any) => response.question_id) || [];
        const apiAnsweredIds = learnerJourney?.completed_question_ids || [];
        const combinedAnsweredIds = [
          ...new Set([...apiAnsweredIds, ...localStorageAnsweredIds]),
        ];

        // Check if all questions are answered
        const allAnswered = transformedQuestions.every((question: any) =>
          combinedAnsweredIds.includes(question.questionId)
        );

        if (allAnswered) {
          // If all questions are answered, set completed state
          setIsCompleted(true);
        } else {
          // Otherwise, set the first unanswered question
          const firstUnansweredIndex = transformedQuestions.findIndex(
            (question: any) =>
              !combinedAnsweredIds.includes(question.questionId)
          );
          setQuestions(transformedQuestions);
          setCurrentQuestionIndex(
            firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0
          );
        }
      }
    }
  }, [questionSet, learnerJourney]);

  const handleNextClick = () => {
    if (isCompleted && learnerId) {
      dispatch(fetchLogicEngineEvaluation(String(learnerId)));
    } else if (questions.length === currentQuestionIndex + 1) {
      if (questionRef.current) {
        questionRef.current.submitForm();
      }
      // If this is the last question, dispatch sync action
      if (!isCompleted) {
        setIsSyncing(true);
        const learnerResponseData = localStorageService.getLearnerResponseData(
          String(learnerId)
        );
        dispatch(
          syncLearnerResponse({
            learner_id: learnerId,
            questions_data: learnerResponseData,
          })
        );
        setIsSyncing(false);
        setIsCompleted(true); // Mark as completed once sync is done
      }
    } else {
      // For non-last questions, submit the form as usual
      // eslint-disable-next-line no-lonely-if
      if (questionRef.current) {
        questionRef.current.submitForm();
      }
    }
  };

  const handleQuestionSubmit = (gridData: any) => {
    const currentTime = new Date().toISOString();
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
      if (currentQuestionIndex === 0) newAnswer.start_time = currentTime;
      if (currentQuestionIndex === questions.length - 1)
        newAnswer.end_time = currentTime;
      return [...prev, newAnswer];
    });
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ContainerLayout
      headerText={
        isCompleted
          ? 'Congratulations!'
          : questions[currentQuestionIndex]?.description?.en || ''
      }
      content={
        <div className='text-4xl font-semibold text-headingTextColor'>
          {isCompleted ? (
            <div>
              <p>Congratulations! You've completed this question set.</p>
              <p>Click "Next" to move on to the next question set.</p>
            </div>
          ) : questions.length && currentQuestion ? (
            <Question
              ref={questionRef}
              question={questions[currentQuestionIndex]}
              onSubmit={(gridData) => handleQuestionSubmit(gridData)}
              onValidityChange={(value: boolean) => setIsFormValid(value)}
            />
          ) : (
            ''
          )}
        </div>
      }
      buttonText={isCompleted ? 'Next Set' : isSyncing ? 'Syncing...' : 'Next'}
      onButtonClick={handleNextClick}
      buttonDisabled={!isCompleted && (!isFormValid || isSyncing)} // Disable during sync or if the form isn't valid
    />
  );
};

export default Questions;

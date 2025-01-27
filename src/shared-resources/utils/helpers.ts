/* eslint-disable @typescript-eslint/naming-convention */
import { ArithmaticOperations } from 'models/enums/ArithmaticOperations.enum';
import { FibType, QuestionType } from 'models/enums/QuestionType.enum';
import { QuestionPropsType } from 'shared-resources/components/questionUtils';

export type LearnerResponse = {
  result?: string;
  quotient?: string;
  remainder?: string;
  answerTop?: string;
  answerIntermediate?: string;
  answerQuotient?: string;
  answerRemainder?: string;

  answerTopRow?: string;
  answerBottomRow?: string;
};

type QuestionData = {
  question_id: string;
  question_set_id: string;
  learner_response: LearnerResponse;
};

export function getUserInitials(name: string): string {
  // Trim and split the string into an array of words
  const words = name.trim()?.split(/\s+/);

  // Get the first letter of the first word and the first letter of the last word
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial =
    words.length > 1 ? words[words.length - 1][0].toUpperCase() : '';

  // Return the initials
  return firstInitial + lastInitial;
}

export const transformQuestions = (apiQuestions: any): any =>
  apiQuestions.map((apiQuestion: any) => {
    const {
      question_body,
      identifier,
      question_type,
      description,
      name,
      operation,
    } = apiQuestion;

    // Construct answers only if present
    const answers = question_body?.answers
      ? {
          ...(question_body.answers.result !== undefined && {
            result: question_body.answers.result,
          }),
          ...(question_body.answers.isPrefil !== undefined && {
            isPrefil: question_body.answers.isPrefil,
          }),
          ...(question_body.answers.answerTop !== undefined && {
            answerTop: question_body.answers.answerTop,
          }),
          ...(question_body.answers.answerResult !== undefined && {
            answerResult: question_body.answers.answerResult,
          }),
          ...(question_body.answers?.answerIntermediate !== undefined && {
            answerIntermediate: question_body.answers?.answerIntermediate,
          }),
          ...(question_body.answers?.fib_type !== undefined && {
            fib_type: question_body.answers?.fib_type,
          }),
          ...(question_body.answers?.answerQuotient !== undefined && {
            answerQuotient: question_body.answers?.answerQuotient,
          }),
          ...(question_body.answers?.answerRemainder !== undefined && {
            answerRemainder: question_body.answers?.answerRemainder,
          }),
          ...(question_body.answers?.isIntermediatePrefill !== undefined && {
            isIntermediatePrefill: question_body.answers?.isIntermediatePrefill,
          }),
        }
      : undefined;

    // Construct numbers only if present
    const numbers = question_body?.numbers
      ? {
          ...question_body.numbers, // Spread to keep the dynamic structure (n1, n2, etc.)
        }
      : undefined;

    // Construct options only for MCQ type questions
    const options =
      question_type === QuestionType.MCQ ? question_body?.options : undefined;
    const questionImageUrl = question_body?.question_image_url
      ? question_body.question_image_url
      : undefined;

    const correctOption = question_body?.correct_option?.replace(/Option /, '');
    const correctOptionIndex = Number.isFinite(parseInt(correctOption, 10))
      ? parseInt(correctOption, 10) - 1
      : 0;

    return {
      questionId: identifier, // Assigning identifier as questionId
      questionType: question_type, // Adding questionType from the API
      description, // Adding description from the API
      name,
      operation,
      questionImageUrl,
      ...(answers && { answers }), // Include only if answers exist
      ...(numbers && { numbers }), // Include only if numbers exist
      ...(options && { options, correct_option: options[correctOptionIndex] }), // Include only if it's an MCQ question
    };
  });

function formatAnswerIntermediate(
  flatArray: string[],
  originalAnswerIntermediate: string
): string {
  const parts = originalAnswerIntermediate.split('#');
  let flatArrayIndex = 0;
  const updatedParts = parts.map((part) => {
    const partLength = part.length;
    const flatPart = flatArray.slice(
      flatArrayIndex,
      flatArrayIndex + partLength
    );
    flatArrayIndex += partLength;
    const updatedPart = part
      .split('')
      .map((char, index) => {
        if (char === 'B') {
          return flatPart[index] || 'B';
        }
        return char;
      })
      .join('');

    return updatedPart;
  });

  return updatedParts.join('#');
}

export function convertSingleResponseToLearnerResponse(
  item: any,
  questionSetId: string,
  originalAnswerIntermediate?: string
): QuestionData {
  const { questionId, start_time, end_time, answers, operation } = item;
  let result = '';
  let answer_top = '';
  let answerIntermediate = '';
  let quotient = '';
  let remainder = '';
  let row1Answers = '';
  let row2Answers = '';

  if (answers?.resultAnswer) {
    result = answers.resultAnswer.join('');
  } else if (answers?.fibAnswer) {
    result = answers.fibAnswer;
  } else if (answers?.mcqAnswer) {
    result = answers.mcqAnswer;
  }

  if (answers?.row1Answers) {
    row1Answers = answers.row1Answers.join('');
  }

  if (answers?.row2Answers) {
    row2Answers = answers.row2Answers.join('');
  }

  if (answers?.answerQuotient) {
    quotient = Array.isArray(answers.answerQuotient)
      ? answers.answerQuotient.join('')
      : answers.answerQuotient;
  }
  if (answers?.answerRemainder) {
    remainder = Array.isArray(answers.answerRemainder)
      ? answers.answerRemainder.filter((char: string) => char !== '#').join('')
      : answers.answerRemainder;
  }

  if (
    answers?.answerIntermediate &&
    originalAnswerIntermediate &&
    operation === ArithmaticOperations.MULTIPLICATION
  ) {
    answerIntermediate = formatAnswerIntermediate(
      answers.answerIntermediate,
      originalAnswerIntermediate
    );
  }

  if (
    answers?.answerIntermediate &&
    operation === ArithmaticOperations.DIVISION
  ) {
    console.log('answerIntermediate', answers.answerIntermediate);
    answerIntermediate = answers.answerIntermediate
      .map(
        (row: any) =>
          row.map((cell: any) => (cell === '' ? 'B' : cell)).join('') // Replace empty string with '#' and join elements
      )
      .join('|');
  }

  if (answers?.topAnswer) {
    answer_top =
      operation === ArithmaticOperations.SUBTRACTION
        ? answers.topAnswer.join('|')
        : answers.topAnswer.join('');
  }
  // Build the learner response
  const learner_response: LearnerResponse = {};

  if (result) {
    learner_response.result = result;
  }

  if (answer_top) {
    learner_response.answerTop = answer_top;
  }

  if (answerIntermediate) {
    learner_response.answerIntermediate = answerIntermediate;
  }
  if (quotient) {
    learner_response.quotient = quotient;
  }
  if (remainder) {
    learner_response.remainder = remainder;
  }

  if (row1Answers) {
    learner_response.answerTopRow = row1Answers;
  }

  if (row2Answers) {
    learner_response.answerBottomRow = row2Answers;
  }

  // Return the transformed question data
  return {
    question_id: questionId,
    ...(start_time && { start_time }), // Include start_time only if it has a value
    ...(end_time && { end_time }), // Include end_time only if it has a value
    question_set_id: questionSetId,
    learner_response,
  };
}

export function convertToCamelCase(input: {
  src: string;
  file_name: string;
  mediaType: string;
  mime_type: string;
}): {
  fileName: string;
  src: string;
  mimeType: string;
  mediaType: string;
} {
  return {
    fileName: input.file_name,
    src: `${input.src}`,
    mimeType: input.mime_type,
    mediaType: input.mediaType,
  };
}

export const removeCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const replaceAt = (str: string, index: number, replacement: string) =>
  str.slice(0, index) + replacement + str.slice(index + replacement.length);

export const convertLearnerResponseToSingleResponse = (
  questionData: QuestionData,
  question: QuestionPropsType
) => {
  const answers = {} as Record<string, any>;

  if (question.questionType === QuestionType.MCQ) {
    answers.mcqAnswer = questionData.learner_response.result;
    return answers;
  }

  if (question.questionType === QuestionType.FIB) {
    if (question.operation === ArithmaticOperations.DIVISION) {
      if (
        [
          FibType.FIB_QUOTIENT_REMAINDER,
          FibType.FIB_QUOTIENT_REMAINDER_WITH_IMAGE,
        ].includes(question.answers.fib_type!)
      ) {
        answers.answerQuotient = questionData.learner_response.quotient;
        answers.answerRemainder = questionData.learner_response.remainder;
      } else {
        answers.fibAnswer = questionData.learner_response.result;
      }
      return answers;
    }
    answers.fibAnswer = questionData.learner_response.result;
    return answers;
  }

  if (question.questionType === QuestionType.GRID_2) {
    answers.row2Answers =
      questionData.learner_response.answerBottomRow?.split('');
    answers.row1Answers = questionData.learner_response.answerTopRow?.split('');
    return answers;
  }

  if (question.operation === ArithmaticOperations.ADDITION) {
    if (question.answers.isPrefil) {
      answers.topAnswer = questionData.learner_response.answerTop?.split('');
    }
    answers.resultAnswer = questionData.learner_response.result?.split('');
    return answers;
  }

  if (question.operation === ArithmaticOperations.SUBTRACTION) {
    if (question.answers.isPrefil) {
      answers.topAnswer = questionData.learner_response.answerTop?.split('|');
    }
    answers.resultAnswer = questionData.learner_response.result?.split('');
    return answers;
  }

  if (question.operation === ArithmaticOperations.MULTIPLICATION) {
    if (question.answers.isIntermediatePrefill) {
      const formattedParts =
        questionData.learner_response.answerIntermediate?.split('#');
      const resArray: string[][] = [];

      formattedParts?.forEach((formattedPart) => {
        resArray.push(formattedPart.split('').map((i) => (i === 'B' ? '' : i)));
      });
      answers.answerIntermediate = resArray.flat();
    }

    const result = questionData.learner_response.result?.split('');
    answers.resultAnswer = result;
    return answers;
  }

  if (question.operation === ArithmaticOperations.DIVISION) {
    answers.answerQuotient = questionData.learner_response.quotient?.split('');
    answers.answerRemainder = questionData.learner_response.remainder
      ?.padStart(question.answers.answerRemainder.length, '#')
      .split('');

    const intermediateArray: string[][] = [];
    const parts = questionData.learner_response.answerIntermediate?.split('|');

    const placeholders = question.answers.answerIntermediate.split('|');
    placeholders.forEach((placeholder, index) => {
      const partData = parts?.[index]?.padStart(placeholder.length, '#');
      if (!partData) return;
      intermediateArray.push(
        partData
          .split('')
          // eslint-disable-next-line no-nested-ternary
          .map((char) => (char === '#' ? '' : char === 'B' ? '' : char))
      );
    });
    answers.answerIntermediate = intermediateArray;
    return answers;
  }

  return answers;
};

export const arrangeObjectKeysInAlphabeticOrder = <T>(reducers: T): T =>
  Object.keys(reducers as any)
    .sort()
    .reduce((obj: any, key) => ({ ...obj, [key]: (reducers as any)[key] }), {});

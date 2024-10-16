/* eslint-disable @typescript-eslint/naming-convention */
import { QuestionType } from 'models/enums/QuestionType.enum';

export function getUserInitials(name: string): string {
  // Trim and split the string into an array of words
  const words = name.trim().split(/\s+/);

  // Get the first letter of the first word and the first letter of the last word
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial =
    words.length > 1 ? words[words.length - 1][0].toUpperCase() : '';

  // Return the initials
  return firstInitial + lastInitial;
}

// export const getUserFullName = (user?: User) =>
//   [user?.first_name, user?.last_name]
//     .filter((v) => !!v)
//     .join(' ')
//     .trim();

export const transformQuestions = (apiQuestions: any): any =>
  apiQuestions.map((apiQuestion: any) => {
    const { question_body, identifier, question_type, description } =
      apiQuestion;

    // Construct answers only if present
    const answers = question_body?.answers
      ? {
          ...(question_body.answers.result !== undefined && {
            result: question_body.answers.result,
          }),
          ...(question_body.answers.isPrefil !== undefined && {
            isShowCarry: question_body.answers.isPrefil,
          }),
          ...(question_body.answers.answerTop !== undefined && {
            answerTop: question_body.answers.answerTop,
          }),
          ...(question_body.answers.answerResult !== undefined && {
            answerResult: question_body.answers.answerResult,
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

    return {
      questionId: identifier, // Assigning identifier as questionId
      questionType: question_type, // Adding questionType from the API
      description, // Adding description from the API
      ...(answers && { answers }), // Include only if answers exist
      ...(numbers && { numbers }), // Include only if numbers exist
      ...(options && { options }), // Include only if it's an MCQ question
    };
  });

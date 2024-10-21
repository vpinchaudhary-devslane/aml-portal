import React from 'react';

interface QuestionheaderProps {
  HeaderText: string;
}

const QuestionHeader: React.FC<QuestionheaderProps> = (
  props: QuestionheaderProps
) => {
  const { HeaderText } = props;
  return (
    <div>
      <p className='text-4xl font-semibold text-headingTextColor ml-[60px] pt-[23px] pb-[22px] px-[7px]'>
        {HeaderText}
      </p>
    </div>
  );
};

export default QuestionHeader;

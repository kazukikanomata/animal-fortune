"use client";

import { Question } from "@/app/types/questions";

type Props = {
  question: Question;
  questionNumber: number;
  selectedValue: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export const QuestionAccordion = ({
  question,
  selectedValue,
  onValueChange,
  isOpen,
  onToggle,
}: Props) => {
  const handleValueChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <div className="collapse bg-white border border-gray-300 shadow-sm">
      <input
        type="radio"
        name="my-accordion-2"
        checked={isOpen}
        onChange={onToggle}
      />
      <div className="collapse-title font-semibold text-gray-800">
        <span className="flex-1">{question.title}</span>
      </div>
      <div className="collapse-content">
        <div className="flex flex-col gap-y-3 p-4">
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center gap-x-3">
              <input
                type="radio"
                name={question.id}
                id={`${question.id}-${option.value}`}
                className="radio radio-primary"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleValueChange(option.value)}
              />
              <label
                htmlFor={`${question.id}-${option.value}`}
                className="text-sm text-gray-700 cursor-pointer flex-1"
              >
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

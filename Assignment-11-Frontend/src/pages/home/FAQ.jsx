import PropTypes from "prop-types";
import { useState } from "react";

const faqs = [
  {
    question: "What should I do if I lose something in public transport?",
    answer:
      "Contact the transport provider's Lost & Found department immediately. Provide details such as the route, time, and a description of the item.",
  },
  {
    question: "How can I prove an item belongs to me?",
    answer:
      "Provide specific details about the item, such as unique markings, serial numbers, or photos you may have. This helps confirm your ownership.",
  },
  {
    question: "What should I do if I find an item but no one claims it?",
    answer:
      "If no one claims the item after a reasonable amount of time, check with local laws regarding found property. You may need to turn it in to the authorities.",
  },
  {
    question: "Is it safe to meet someone to exchange a lost item?",
    answer:
      "Always meet in a public place, such as a café or police station. Avoid sharing personal information, and if possible, bring a friend along.",
  },
  {
    question: "How does Track & Retrieve help with lost items?",
    answer:
      "Track & Retrieve connects people who have lost or found items through a centralized platform, making it easier to reunite owners with their belongings.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 dark:border-gray-600 py-4">
      <button
        className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800 dark:text-gray-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span>{isOpen ? "–" : "+"}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{answer}</p>
      )}
    </div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

const FAQSection = () => {
  return (
    <div className="bg-white dark:bg-darkThree p-8 rounded-lg shadow-md mt-16">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQSection;

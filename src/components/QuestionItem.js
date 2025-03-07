import React from "react";

function QuestionItem({ question, handleDelete, handleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;


  const handleCorrectAnswerChange = (event) => {
    const newCorrectIndex = Number(event.target.value);
    handleUpdate(id, newCorrectIndex); 
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

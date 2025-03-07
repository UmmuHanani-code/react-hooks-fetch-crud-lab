import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);


  const addNewQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };


  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
          );
        } else {
          console.error("Error deleting question");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };


  const handleUpdate = (id, correctIndex) => {
    const updatedQuestion = { correctIndex };

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((updatedQuestionData) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? updatedQuestionData : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm addNewQuestion={addNewQuestion} />
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

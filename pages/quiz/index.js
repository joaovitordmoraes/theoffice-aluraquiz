/* eslint-disable linebreak-style */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import db from '../../db.json';

import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import AlternativeForm from '../../src/components/AlternativeForm';
import Widget from '../../src/components/Widget';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Button from '../../src/components/Button';
import Footer from '../../src/components/Footer';
import GithubCorner from '../../src/components/GithubCorner';

function ResultScreen({ results }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Parabéns
          {' '}
          {name}
          {' '}
          , você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;

            if (isAcerto) {
              return somatoriaAtual + 1;
            }

            return somatoriaAtual;
          }, 0)}
          {' '}
          perguntas!
        </p>

        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #0
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true ? 'ACERTOU' : 'ERROU'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingScreen() {
  return (
    <Widget>
      <Widget.Header>
        Carregando Quiz...
      </Widget.Header>

      <img
        src="https://media.giphy.com/media/PsrXGq6OyLjIA/source.gif"
        alt="Descrição da imagem aqui"
        style={{
          width: '100%',
          height: '190px',
          objectFit: 'cover',
        }}
      />
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        src={question.image}
        alt="Descrição da imagem aqui"
        style={{
          width: '100%',
          height: '190px',
          objectFit: 'cover',
        }}
      />

      <Widget.Content>
        <h2>{question.title}</h2>

        <AlternativeForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 3 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => { setSelectedAlternative(alternativeIndex); }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 5000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setcurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingScreen />}

        {screenState === screenStates.RESULT && <ResultScreen results={results} />}

        <Footer />
      </QuizContainer>

      <GithubCorner projectUrl="https://github.com/joaovitordmoraes/theoffice-aluraquiz" />
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object,
  totalQuestions: PropTypes.number,
  questionIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  addResult: PropTypes.func,
};

ResultScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  results: PropTypes.array,
};

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Form from '../src/components/Form';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>

      <QuizContainer>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <p>{db.description}</p>

            <Form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Form.Field
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                onChange={function (event) {
                  setName(event.target.value)
                }}
              />

              <Button backgroundColor={db.theme.colors.buttonHover} disabled={name.length === 0}>
                Jogar {name}
              </Button>
            </Form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h2>Quizes da galera</h2>

            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React - Next.JS fez:</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GithubCorner projectUrl="https://github.com/joaovitordmoraes/theoffice-aluraquiz" />

    </QuizBackground>
  );
}

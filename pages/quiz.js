import React from 'react';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';

export default function QuizPage() {

    return(
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />

                <Widget>
                    <Widget.Header>
                        <h1>{db.title}</h1>
                    </Widget.Header>

                    <Widget.Content>
                        <p>Conteúdo em desenvolvimento</p>
                    </Widget.Content>
                </Widget>

                <Footer />
            </QuizContainer>

            <GithubCorner projectUrl="https://github.com/joaovitordmoraes/theoffice-aluraquiz" />
        </QuizBackground>
    );
}
import db from '../db.json'

import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import Widget from '../src/components/Widget'
import Form from '../src/components/Form'
import Button from '../src/components/Button'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'

export default function Home() {
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

            <Form>
              <Form.Field type="text" placeholder="Diz aí seu nome pra jogar :)" />

              <Button backgroundColor={db.theme.colors.buttonHover}>Jogar</Button>
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
  )
}

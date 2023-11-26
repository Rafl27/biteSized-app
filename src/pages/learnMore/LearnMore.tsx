import React from 'react';
import TopBar from "../../components/topBar/TopBar";
import './LearnMore.css'

const LearnMore = () => {
    return (
        <div>
            <TopBar />
            <h6 className="paragraphs">FAQ em Português abaixo</h6>
            <h1 className="titles">How does BiteSized work? <img className="language" src={"usa-flag.png"}/></h1>

            <p className="paragraphs">So, you know how life gets busy and you don’t have as much time to dive into epic fantasy like you used to? That’s where this platform comes in. It’s all about getting your fantasy fix in bite-sized pieces (yep, that’s why we call it what we do!).
                When I started building this thing, I had a lightbulb moment. What if everyone could chip in and weave stories together? No more groaning at bad endings or plot holes, 'cause you or anyone else could step in and fix it. Cool, right? That’s what we’re all about here.</p>

            <h3 className="titles">How do I create my first story?</h3>
            <p className="paragraphs">
                Ready to start weaving your own tale? Just hit that plus sign in the top bar.
            </p>
            <img className="example-images" src={"plus-button-arrpw.png"}/>
            <p className="paragraphs">This will take you to a pretty rad page where you can fill in all the details for your story. And guess what? Everything you type in gets updated on the right side of the screen in real-time.
                But here’s the catch - we’re currently not set up to accept image uploads directly from your device. So, you’ll need to upload your image somewhere else first and then drop us the URL. It’s a bit of a roundabout way, I know. But hey, we’re a nonprofit platform at the moment, so we appreciate your understanding!</p>
            <img className="example-images" src="create-story.png"/>
            <h3 className="titles">How do threads work?</h3>
            <p className="paragraphs">BiteSized is a cool place where you can let your creativity run wild, creating and collaborating on stories. Whether you’re a wordsmith who loves to spin tales in paragraphs or an artist who expresses themselves through artwork, there’s a space for you here.
                On our platform, we’ve got this thing called ‘threads’. Why, you ask? Well, one of the big ideas behind BiteSized is that stories crafted by a community can branch out in countless directions, leading to endless possible endings. So, each thread can weave its own unique tale, with multiple independent endings. It’s like every story is a tapestry with infinite patterns. Pretty awesome, right?</p>
            <img className="example-images" src={"threads-example.png"}/>
            <h3 className="titles">What about my reputation?</h3>
            <p className="paragraphs">Alright, here’s where I reel you in! If you click on your avatar up there in the top bar, you’ll get a neat overview of your BiteSized journey. You’ll see all the stories you’ve spun, the number of followers you’ve gathered, and the folks you’re following.
                But wait, there’s more! You can also check out everything you’ve given a thumbs up to. And to keep things transparent, we show you the number of upvotes and downvotes you’ve received - that’s your rep in the BiteSized community. So, go ahead and explore!</p>
            <img className="example-images" src={"profile-page.png"}/>

            <h1 className="titles">Como funciona o BiteSized? <img className="language" src={"brazil-flag.png"}/></h1>
            <p className="paragraphs">Sabe como a vida fica ocupada e você não tem tanto tempo para mergulhar em fantasia épica como costumava ter? É aí que entra esta plataforma. Tudo se resume a obter sua dose de fantasia em pedaços pequenos (sim, é por isso que chamamos do jeito que chamamos!). Quando comecei a construir isso, tive um momento de inspiração. E se todos pudessem contribuir e tecer histórias juntos? Não mais gemidos em finais ruins ou buracos na trama, porque você ou qualquer outra pessoa poderia intervir e consertar. Legal, né? É disso que se trata aqui.</p>

            <h3 className="titles">Como eu crio minha primeira história?</h3>
            <p className="paragraphs">
                Pronto para começar a tecer sua própria história? Basta clicar no sinal de mais na barra superior.
            </p>
            <img className="example-images" src={"plus-button-arrpw.png"}/>
            <p className="paragraphs">Isso te levará a uma página bem legal onde você pode preencher todos os detalhes para a sua história. E adivinha? Tudo o que você digita é atualizado em tempo real no lado direito da tela. Mas aqui está a pegadinha - atualmente não estamos configurados para aceitar uploads de imagens diretamente do seu dispositivo. Então, você precisará fazer o upload da sua imagem em outro lugar primeiro e depois nos fornecer a URL. É um pouco complicado, eu sei. Mas ei, somos uma plataforma sem fins lucrativos no momento, então agradecemos a sua compreensão!</p>
            <img className="example-images" src="create-story.png"/>
            <h3 className="titles">Como funcionam as threads?</h3>
            <p className="paragraphs">BiteSized é um lugar legal onde você pode deixar sua criatividade correr solta, criando e colaborando em histórias. Seja você um mestre das palavras que adora tecer contos em parágrafos ou um artista que se expressa através de obras de arte, há um espaço para você aqui. Em nossa plataforma, temos essa coisa chamada ‘threads’. Por quê, você pergunta? Bem, uma das grandes ideias por trás do BiteSized é que histórias criadas por uma comunidade podem se ramificar em inúmeras direções, levando a infinitos finais possíveis. Então, cada thread pode tecer seu próprio conto único, com múltiplos finais independentes. É como se cada história fosse um tapete com padrões infinitos. Muito incrível, certo?</p>
            <img className="example-images" src={"threads-example.png"}/>
            <h3 className="titles">E a minha reputação?</h3>
            <p className="paragraphs">Tudo bem, aqui é onde eu te fisgo! Se você clicar no seu avatar ali em cima na barra superior, você terá uma visão geral bacana da sua jornada no BiteSized. Você verá todas as histórias que criou, o número de seguidores que acumulou e as pessoas que está seguindo.
                Mas espere, tem mais! Você também pode conferir tudo o que deu um joinha. E para manter as coisas transparentes, mostramos o número de votos positivos e negativos que você recebeu - essa é a sua reputação na comunidade BiteSized. Então, vá em frente e explore!</p>
            <img className="example-images" src={"profile-page.png"}/>
        </div>
    );
};

export default LearnMore;
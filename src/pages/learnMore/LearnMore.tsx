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
            <p className="paragraphs">Sabe quando a vida fica tão corrida que mal sobra tempo para se perder em uma boa fantasia épica como antigamente? Pois é, foi pensando nisso que surgiu a nossa plataforma. A ideia é simples: te oferecer uma dose de fantasia em pedacinhos, ou melhor, em “mordidas” (sacou o nome da plataforma agora, né?).

                Quando comecei a criar essa belezinha, tive um estalo: e se todo mundo pudesse contribuir e tecer histórias juntas? Nada de finais ruins ou buracos na trama que te deixam de cabelo em pé, porque você ou qualquer outra pessoa poderia entrar na jogada e dar um jeito. Demais, né? É essa a nossa pegada por aqui.</p>

            <h3 className="titles">Como crio minha primeira história?</h3>
            <p className="paragraphs">
                Tá afim de começar a criar sua própria história? É só clicar no sinal de mais lá em cima na barra.
            </p>
            <img className="example-images" src={"plus-button-arrpw.png"}/>
            <p className="paragraphs">Isso vai te levar para uma página maneira onde você pode preencher todos os detalhes da sua história. E o melhor de tudo? Tudo o que você digita é atualizado em tempo real do lado direito da tela. Mas tem um porém - no momento, não estamos preparados para aceitar uploads de imagens diretamente do seu dispositivo. Então, você vai precisar fazer o upload da sua imagem em outro lugar primeiro e depois nos passar a URL. Eu sei, é meio chato. Mas olha, somos uma plataforma sem fins lucrativos no momento, então agradecemos a sua compreensão!</p>
            <img className="example-images" src="create-story.png"/>
            <h3 className="titles">Como funcionam as threads?</h3>
            <p className="paragraphs">BiteSized é um lugar onde sua criatividade pode voar alto, seja criando ou colaborando em histórias. Se você é daqueles que adora criar contos em parágrafos ou um artista que se expressa através de obras de arte, aqui tem um espaço pra você. Na nossa plataforma, temos as ‘threads’. Por que, você pergunta? Bom, uma das ideias por trás do BiteSized é que histórias criadas por uma comunidade podem se desdobrar em várias direções, levando a finais infinitos. Então, cada thread pode tecer seu próprio conto único, com vários finais independentes. É como se cada história fosse um tapete com padrões infinitos. Demais, né?</p>
            <img className="example-images" src={"threads-example.png"}/>
            <h3 className="titles">E a minha reputação?</h3>
            <p className="paragraphs">Agora, deixa eu te fisgar! Se você clicar no seu avatar ali em cima na barra superior, vai ter uma visão geral da sua jornada no BiteSized. Vai ver todas as histórias que criou, o número de seguidores que juntou e as pessoas que está seguindo. Mas calma, ainda tem mais! Você também pode dar uma olhada em tudo que curtiu. E pra manter a transparência, mostramos o número de curtidas e descurtidas que você recebeu - essa é a sua reputação na comunidade BiteSized. Então, se joga e explora!</p>
            <img className="example-images" src={"profile-page.png"}/>
        </div>
    );
};

export default LearnMore;
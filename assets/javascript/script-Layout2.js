let quizzEscolhido = '';
let totalDePontos = 0;



function retornarAoLayoutDoisPAraUm() {

    const layoutUm = document.querySelector('.layout1');
    const layoutDois = document.querySelector('.layout2');

    layoutUm.classList.remove('esconde');
    layoutDois.classList.add('esconde');

    const inicio = document.querySelector(".layout1");
    inicio.scrollIntoView({block:"start"});

}

function reiniciarQuizz(){

    requisitarQuizz();
    const topo = document.querySelector(".layout2 .questionamento-quiz");
    topo.scrollIntoView({block:"start"});

}

function pergarId(quizz) {

    quizzEscolhido = quizz;
    requisitarQuizz();

}



function requisitarQuizz() {

    const promise_quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promise_quizzes.then(renderizarQuizz);
    promise_quizzes.catch(trataErroQuizz);

}

function renderizarQuizz(resposta) {
    
    //Topo da página
    const objetoQuizzSelecionado = resposta.data.filter( element => {

        if (element.id == quizzEscolhido) {

            return true;

        }

    });


    const topo = document.querySelector(".layout2 .questionamento-quiz");

    topo.innerHTML = `

        <div class="questionamento-quiz">
            <div class="escuro"></div>
            <img src="${objetoQuizzSelecionado[0].image}" alt="">
            <p>${objetoQuizzSelecionado[0].title}</p>
        </div>

    `;

    
    //Titulo da pergunta
    const localDasPerguntas = document.querySelector('.layout2 .perguntaLayout2');
    const objeto = objetoQuizzSelecionado[0];
    const objetoPerguntaCompleto = objeto.questions;


    localDasPerguntas.innerHTML = '';
    for (let i = 0; i < objetoPerguntaCompleto.length; i++) {
        
            localDasPerguntas.innerHTML += `
                
                <div class="conteudo">
                
                    <div class="pergunta azul">
                        
                        <p>${objetoPerguntaCompleto[i].title}</p>
    
                    </div>

                    <div class="alternativas-quizz">

                        ${alternativas(objetoPerguntaCompleto[i].answers)}
                    
                    </div>

                </div>
            `;

    };

}

function alternativas(objeto) {
    
    let texto = '';

    for (let i = 0; i < objeto.length; i++) {

        texto += `
            <div class="alternativa" onclick="selecionarAlternativa(this); comparaResposta(this)">
                <span class="esconde">${objeto[i].isCorrectAnswer}</span>
                <img src="${objeto[i].image}" alt="">
                <p>${objeto[i].text}</p>
            </div>
        `
        
    }

    return texto;

}

function trataErroQuizz() {

    console.log("Erro")

}

function selecionarAlternativa (selecionarAlternativa) {

    const alternativas = selecionarAlternativa.parentNode.querySelectorAll('.alternativa img');
    const alternativaSelecionada = selecionarAlternativa.querySelector('.alternativa img');

    for (let i = 0; i < alternativas.length; i++){
    
        if (alternativas[i].classList.contains('branco')){
            return 
        }
    
    }

    for (let i = 0; i < alternativas.length; i++){
    
        if (alternativas[i] !== alternativaSelecionada){
            alternativas[i].classList.add('branco');
        }
    
    }

    const listaDeRespostas = selecionarAlternativa.parentNode.querySelectorAll('.alternativa span');
    const textos = selecionarAlternativa.parentNode.querySelectorAll('.alternativa p');

    for (let i = 0; i < listaDeRespostas.length; i++) {

        if (listaDeRespostas[i].innerHTML === 'true') {

            textos[i].classList.add('verde');

        } else {

            textos[i].classList.add('vermelho');

        }

    }

}

function comparaResposta(elemento) {

    const resposta = elemento.querySelector('.alternativa span');
    
    if (resposta.innerHTML === 'true') {

        totalDePontos += 100

    }
    console.log(totalDePontos);    

}

function terminarQuizz() {

    const respostaDeAcertos = document.querySelector('.layout2 .conteudo-acertos');
    const botoes = document.querySelector('.layout2 .botoes');

    

}
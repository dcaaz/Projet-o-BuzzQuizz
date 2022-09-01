let quizzEscolhido = '';

function retornarAoLayoutDoisPAraUm() {

    const layoutUm = document.querySelector('.layout1');
    const layoutDois = document.querySelector('.layout2');

    layoutUm.classList.remove('esconde');
    layoutDois.classList.add('esconde');

}

function pergarId(quizz) {

    console.log(quizz);
    const x = quizz.className;
    quizzEscolhido = x.replace("umQuizz ", "");
    console.log(quizzEscolhido);
    requisitarQuizz();

}

function requisitarQuizz() {

    const promise_quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promise_quizzes.then(sucessoQuizz);
    promise_quizzes.catch(trataErroQuizz);

}

function sucessoQuizz(resposta) {
    
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
    const localDasPerguntas = document.querySelector('.layout2 .pergunta .conteudo');
    console.log(localDasPerguntas);
    
    const objeto = objetoQuizzSelecionado[0];
    console.log(objeto);

    const objetoPerguntaCompleto = objeto.questions;
    console.log(objetoPerguntaCompleto);
    
    const objetoPerguntaRespostas = objetoPerguntaCompleto[0].answers;
    console.log(objetoPerguntaRespostas);

    localDasPerguntas.innerHTML = '';
    for (let i = 0; i < objetoPerguntaCompleto.length; i++) {
        

        localDasPerguntas.innerHTML += `

            <div class="pergunta azul">
                
                <p>${objetoPerguntaCompleto[i].title}</p>
            
            </div>
        
        `;

        for (let j = 0; j < objetoPerguntaCompleto[i].answers.length; j++) {

            localDasPerguntas.innerHTML += `

                <div class="alternativa">
                    <img src="${objetoPerguntaCompleto[i].answers[j].image}" alt="">
                    <p>${objetoPerguntaCompleto[i].answers[j].text}</p>
                </div>
            
            `

        }

    };

}

function trataErroQuizz() {

    console.log("Erro")

}



















/* //quizzes da api
let quizzes;

//estrutura quizz
let quizz = {
    title:'',
    image:'',
    // perguntas
    questions:[
        {
            title:'',
            color:'',
            answers:[
                {
                    text: '',
				    image: '',
				    isCorrectAnswer: true
                },
                {
                    text: '',
				    image: '',
				    isCorrectAnswer: true
                },
                {
                    text: '',
				    image: '',
				    isCorrectAnswer: true
                },
                {
                    text: '',
				    image: '',
				    isCorrectAnswer: true
                }
            ]
        }
    ],
    //nível (nota) de acertos
    levels:[
        {
            title: '',
            image: '',
            text: '',
            minValue: 0
        },
        {
            title: '',
            image: '',
            text: '',
            minValue: 50
        }
    ]
};

//buscando quizzes da api
const promise_quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

promise_quizzes.then(sucessoQuizz);
promise_quizzes.catch(trataErroQuizz);


function sucessoQuizz(resposta){
    quizzes = resposta.data;
}

function trataErroQuizz(erro){
    console.log(erro.response.status);
}
 */
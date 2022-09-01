function retornarAoLayoutDoisPAraUm() {

    const layoutUm = document.querySelector('.layout1');
    const layoutDois = document.querySelector('.layout2');

    layoutUm.classList.remove('esconde');
    layoutDois.classList.add('esconde');

}

//quizzes da api
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

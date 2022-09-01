//Variáveis do layout3


//array de teste de criação;
let quizzTeste =[];

//só mudo de secao se as condições forem satisfeitas.
let mudarSecao = false;

let quizzNovo ={
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

function retornarAoLayoutTresParaUm() {

    const layoutUm = document.querySelector('.layout1');
    const layoutTres = document.querySelector('.layout3');

    layoutUm.classList.remove('esconde');
    layoutTres.classList.add('esconde');

    resetaCriacao();

}

function mudaSecao(elemento, proximo, funcao){
    
    if (mudarSecao){   
        const secaoAtual = document.querySelector(elemento);
        const proximaSecao = document.querySelector(proximo);

        secaoAtual.classList.add('esconde');
        proximaSecao.classList.remove('esconde');
    }
    funcao();
}


//Preciso Resetar quando voltar à pagina principal
function resetaCriacao(){
    const ultimaSecaoCriacao = document.querySelector
    ('.finalizou-quizz');
    const secaoInicial = document.querySelector
    ('.nome-quizz');

    ultimaSecaoCriacao.classList.add('esconde');
    secaoInicial.classList.remove('esconde');
}

//Titulo do quizz
function validaTitulo(){
    const titulo = document.querySelector('.tituloQuizzNovo');
    if(titulo.value.length < 20 || titulo.value.length > 65){
        alert('Quantidade invalida de caracteres para o título!');
    }
    else{
        quizzNovo.title = titulo.value;
        console.log(quizzNovo.title);
    }
}

//testa se esta é uma url válida
function ehImagem(url){
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
function validaImg(){
    const img = document.querySelector('.imgQuizzNovo');
    const testaImagem = img.value;
    if(ehImagem(testaImagem)){
        quizzNovo.image = testaImagem;
    }else{
        alert('URL inválida! entre com uma URL de imagem válida')
    }
}


function nomeQuizz(){
    validaTitulo();
    validaImg();
    //validaQtdPerguntas();
    //validaQtdNiveis();
}
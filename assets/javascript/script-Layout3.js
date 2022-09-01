//Variáveis do layout3


//array de teste de criação;
let quizzTeste =[];

//só mudo de secao se as condições forem satisfeitas.
let mudarSecao = false;

//Quantidade de perguntas passados pelo usuário
let numPerguntas;
let numNiveis;

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
                        isCorrectAnswer: false
                    },

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
    
    mudarSecao = funcao();

    if (mudarSecao){   
        const secaoAtual = document.querySelector(elemento);
        const proximaSecao = document.querySelector(proximo);

        secaoAtual.classList.add('esconde');
        proximaSecao.classList.remove('esconde');
    }
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


// ----------------------------- inicio da secao nome ------------------------------

//Titulo do quizz
function validaTitulo(){
    const titulo = document.querySelector('.tituloQuizzNovo');
    if(titulo.value.length < 20 || titulo.value.length > 65){
        alert('Quantidade invalida de caracteres para o título!');
    }
    else{
        quizzNovo.title = titulo.value;
        console.log(quizzNovo.title);
        return true;
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
        return true;
    }else{
        alert('URL inválida! entre com uma URL de imagem válida')
    }
}

function validaQtdPerguntas(){
    const elemento = document.querySelector('.qtdePergQuizzNovo');
    const qtdPergunta = Number(elemento.value);

    //console.log(qtdPergunta);

    //    não NaN?                    inteiro?           maior que 3?
    if( !isNaN(qtdPergunta) && qtdPergunta % 1 === 0 && qtdPergunta > 3){
        numPerguntas = qtdPergunta;
        return true;
    }
    else{
        alert("Entre com um valor válido para o número de perguntas!");
    }
}

function validaQtdNiveis(){
    const elemento = document.querySelector('.qtdNiveisQuizzNovo');
    const qtdNiveis = Number(elemento.value);
    
    //    não NaN?                     inteiro?           maior que 3?
    if( !isNaN(qtdNiveis) && qtdNiveis % 1 === 0 && qtdNiveis > 2){
        numNiveis = qtdNiveis;
        return true;
    }
    else{
        alert("Entre com um valor válido para o número de Níveis!");
    }
}

function nomeQuizz(){
    if(validaTitulo() && validaImg() && validaQtdPerguntas() && validaQtdNiveis()){
        return true;
    }
}

// ----------------------------- fim da secao nome ------------------------------
//-------------------------------------------------------------------------------
// ------------------------- inicio da secao perguntas --------------------------

function perguntasQuizz(){
    
}
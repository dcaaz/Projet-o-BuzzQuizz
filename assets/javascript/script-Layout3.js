//Variáveis do layout3


//array de teste de criação;
let quizzTeste =[];

//só mudo de secao se as condições forem satisfeitas.
let mudarSecao = false;

//Quantidade de perguntas passados pelo usuário
let numPerguntas;
let numNiveis;
let resposta = {
    text: '',
    image: '',
    isCorrectAnswer: true
};

// pergunta (Card 2)
let pergunta = {
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

function mostraConteudo(elemento){
    const elementoCard = elemento.parentNode.nextElementSibling;
    elementoCard.classList.toggle('esconde');

}

function mudaSecao(elemento, proximo, funcao){
    
    mudarSecao = funcao();

    if (mudarSecao){   
        const secaoAtual = document.querySelector(elemento);
        const proximaSecao = document.querySelector(proximo);

        secaoAtual.classList.add('esconde');
        proximaSecao.classList.remove('esconde');
    }

    mudarSecao = false;
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

function validaPergunta(elemento){
    
    const elementoSelecionado = document.querySelector(elemento);

    const texto = elementoSelecionado.querySelector('.textoPergunta');

    if(texto.value.length < 20){
        alert('Quantidade invalida de caracteres para a pergunta! mínimo de 20 caracteres');
    }
    else{
        pergunta.title = texto.value;
        console.log(pergunta.title);
        return true;
    }
}

function checaCorFundo(elemento){

    const elementoSelecionado = document.querySelector(elemento);
    const corFundo = elementoSelecionado.querySelector('.corFundoPergunta');
    const stringCor = corFundo.value;
    //teste por expressão regular (se começa por #, e os demais caracteres são de 0 a A e são no total 6);
    const testaHexa = /^#([A-Fa-f0-9]{6})/; 

    if(testaHexa.test(stringCor)){
        console.log("Cor Válida!");
        pergunta.color = stringCor;
    }else{
        alert("Cor Inválida!");
    }

}

function checaResposta(elemento){
    const elementoSelecionado = document.querySelector(elemento);
    const texto = elementoSelecionado.querySelector('.textoResposta');

    const img = elementoSelecionado.querySelector('.imgResposta');
    const testaImagem = img.value;
    const textoResposta = texto.value;


    if(textoResposta === ''){
        alert('Entre com um texto para resposta!');
        
    } else if(!(ehImagem(testaImagem))){
        alert('URL inválida! entre com uma URL de imagem válida para resposta')
    }else{
        resposta.text = textoResposta; 
        resposta.image = testaImagem;
        return true;
    }

}

function perguntaQuizz(elemento){
    validaPergunta(elemento);
    checaCorFundo(elemento);
    checaResposta(elemento);
    //validaRespostas(); //qtde >=2  e possui 1 certa
    //validaImgResposta();
}

function checaPerguntas(){
    // enquanto não checar cada card de perguntas...
}
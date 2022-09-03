//Variáveis do layout3


//array de teste de criação;
let quizzTeste =[];

//só mudo de secao se as condições forem satisfeitas.
let mudarSecao = false;

//Quantidade de perguntas passados pelo usuário
let numPerguntas = 5;

let numNiveis;

// objeto resposta
let resposta = {
    text: '',
    image: '',
    isCorrectAnswer: true
};

// objeto pergunta 
let pergunta = {
    title:'',
    color:'',
    answers:[]
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



//----------------------------- funcoes genericas -------------------------------------

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
        return true;
    }else{
        alert("Cor Inválida!");
    }

}

function checaValidadeResposta(elemento){
    //const elementoSelecionado = document.querySelector(elemento);
    const texto = elemento.querySelector('.textoResposta');

    const img = elemento.querySelector('.imgResposta');
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


function renderizaPerguntas(){
    const secaoPerguntas = document.querySelector('.perguntas-quizz');
    //min 3 perguntas

    secaoPerguntas.innerHTML = `
        <div class="titulo">
            <h1>Crie suas perguntas</h1>
        </div>
    `;
    

    for(let i = 0; i < numPerguntas; i++){
        let esconder = '';
        let botaoEditar = '';

        if (i>0){
            esconder = 'esconde';
            botaoEditar = `<ion-icon name="create-outline" 
            onclick="mostraConteudo(this)"></ion-icon>
            `;
        }

        secaoPerguntas.innerHTML += `
            <div class="card pergunta${i}">
                <div class="qtd-card">
                    <p>Pergunta ${1+i}</p>
                    ${botaoEditar}
                </div>

                <div class="card-content ${esconder}">

                    <div class="bloco-pergunta">
                        <input type="text" placeholder="Texto da pergunta" class="textoPergunta">
                        <input type="text" placeholder="Cor de fundo da pergunta" class="corFundoPergunta">
                    </div>

                    <p>Resposta correta</p>

                    <div class="bloco-resposta correta">
                        <input type="text" placeholder="Resposta correta" class="textoResposta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>

                    <p>Respostas incorretas</p>

                    <div class="bloco-resposta incorreta1">
                        <input type="text" placeholder="Resposta incorreta" class="textoResposta incorreta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>

                    <div class="bloco-resposta incorreta2">
                        <input type="text" placeholder="Resposta incorreta" class="textoResposta incorreta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>

                    <div class="bloco-resposta incorreta3">
                        <input type="text" placeholder="Resposta incorreta" class="textoResposta incorreta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>


                </div>

            </div>
        `;
    }

    secaoPerguntas.innerHTML += `
                <button onclick="mudaSecao('.perguntas-quizz',
                '.nivel-quizz',perguntaQuizz('.pergunta1'))">
                Prosseguir para criar níveis</button>
                `;

}

renderizaPerguntas();

function perguntaQuizz(elemento){
   if(validaPergunta(elemento)){
        if(checaCorFundo(elemento)){
            if(checaValidadeResposta(elemento)){
                /*if(pergunta.answers.length >= 2){ testando em outra funcao
                    return true;
                }*/
            }
        }
    }
}

function validaRespostas(classe){
    const elemento = document.querySelector(`.${classe}`);
    const correta = elemento.querySelector('.correta');
    //console.log (correta);
    const respostas = [];

    if (checaValidadeResposta(correta) && pergunta.answers.length === 0){
        resposta.isCorrectAnswer = true;
        pergunta.answers.push(resposta);
        console.log(resposta);
    }
    //console.log (pergunta.answers);
    
    //let respostaIncorreta = [];
    
    for(let i = 0; i < 3 ; i++){
        let incorreta = elemento.querySelector(`.incorreta${1+i}`);
        //testar apenas se tamanho das respostas for < 2
        if(checaValidadeResposta(incorreta)){
            resposta.isCorrectAnswer = false;
            respostas.push(resposta);
            console.log(resposta);
        }
        /*if(pergunta.answers.length < 2){
            respostaIncorreta = document.querySelector(incorreta);
            console.log(respostaIncorreta);       
        }*/
    }
    /*if (respostaIncorreta.length === 0){
        console.log('Sem respostas erradas!')
    }else{
        if(pergunta.answers.length > 0){
            for(let i = 0; i < respostaIncorreta.length ; i++){
                //console.log(respostaIncorreta[i]);
                if(respostaIncorreta[i]){
                    pergunta.answers.push(respostaIncorreta[i]);
                }
            }
        }
      //  console.log(respostaIncorreta.length);
    }*/
    //for(let i = 0; i < respostas.length ; i++){
        //console.log(respostaIncorreta[i]);
        //if(respostas[i]){
            pergunta.answers.push(respostas);
        //}
    //}
    console.log (pergunta.answers);
    
}


function checaPerguntas(){
    // enquanto não checar cada card de perguntas...
    for(let i = 0; i < numPerguntas; i++){
        
        let classePergunta = `.pergunta${i}`;
        let elemento = document.querySelector(classePergunta);

        if(!perguntaQuizz(elemento)){
            return false;
        }
    }
    return true;
}
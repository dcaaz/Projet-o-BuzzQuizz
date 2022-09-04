//Variáveis do layout3


//array de teste de criação;
let quizzTeste =[];

//só mudo de secao se as condições forem satisfeitas.
let mudarSecao = false;

//Quantidade de perguntas passados pelo usuário
let numPerguntas = 2;

let numNiveis;

// objeto resposta
/*let resposta = {
    text: '',
    image: '',
    isCorrectAnswer: true
};
*/
// objeto pergunta 
const pergunta = {
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




//passar classe bloco-resposta

function checaValidadeResposta(elemento){
    //elemento a ser devolvido
    let resposta = {
        text: '',
        image: '',
        isCorrectAnswer: true
    };

    const texto = elemento.querySelector('.textoResposta').value;
    const img = elemento.querySelector('.imgResposta').value;


    if(texto === '' || !(ehImagem(img))){
        //alert('Resposta Inválida!');
        return false;
    } else {
        resposta.text = texto; 
        resposta.image = img;
        if(elemento.classList.contains('correta')){
            resposta.isCorrectAnswer = true;
        }else{
            resposta.isCorrectAnswer = false;
        }
        return resposta;
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

                    <div class="bloco-resposta incorreta0">
                        <input type="text" placeholder="Resposta incorreta" class="textoResposta incorreta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>

                    <div class="bloco-resposta incorreta1">
                        <input type="text" placeholder="Resposta incorreta" class="textoResposta incorreta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>

                    <div class="bloco-resposta incorreta2">
                        <input type="text" placeholder="Resposta incorreta" class="textoResposta incorreta">
                        <input type="text" placeholder="URL da imagem" class="imgResposta">
                    </div>


                </div>

            </div>
        `;
    }

    secaoPerguntas.innerHTML += `
                <button onclick="mudaSecao('.perguntas-quizz',
                '.nivel-quizz',perguntaQuizz('.pergunta0'))">
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


function validaRespostas(elemento){
    const divResposta = elemento.querySelector('.card-content');
    console.log('card-content:',divResposta);

    let correta = divResposta.querySelector('.correta');
    console.log('resposta correta',correta);

    let respostas = [];

    respostas.push(checaValidadeResposta(correta));

    for(let i = 0; i < 3; i++){
        let incorreta = divResposta.querySelector(`.incorreta${i}`);
        console.log('resposta incorreta', incorreta);
        respostas.push(checaValidadeResposta(incorreta));
    }

    
    console.log('respostas:',respostas);
    
    if(respostas.length < 2 || respostas[0] === false){
        alert('Por favor, preencha as respostas de maneira correta!');
    } else{
        for(let i = 0; i < 4; i++){
            if(respostas[i]){
                pergunta.answers.push(respostas[i]);
            }
        }
        console.log('Salvo nas perguntas',pergunta.answers)
    }
    respostas = [];
    console.log('respostas:',respostas);

    
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
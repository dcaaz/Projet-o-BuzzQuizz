function entrarNoQuizz() {

    const layoutUm = document.querySelector('.layout1');
    const layoutDois = document.querySelector('.layout2');

    layoutUm.classList.add('esconde');
    layoutDois.classList.remove('esconde');

}

function novoQuizz() {

    const layoutUm = document.querySelector('.layout1');
    const layoutTres = document.querySelector('.layout3');
    console.log(layoutTres);
    layoutUm.classList.add('esconde');
    layoutTres.classList.remove('esconde');

}

function pegarQuizz() {

    const quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    quizzes.then(renderizarQuizzes);
    quizzes.catch(deuErro);

}
pegarQuizz();

function renderizarQuizzes(promessa) {

    const quizzes = promessa.data;
    
     console.log(quizzes);
    const quizzDaNet = document.querySelector('.outrosQuizzes .quizz');
    console.log(quizzDaNet);
    /*
    quizzDaNet.innerHTML = '';

    quizzes.forEach(element => {
         
        quizzDaNet.innerHTML += `
        
        <div class="umQuizz ${element.id}" onclick="entrarNoQuizz()">
            <div class="nomeDoQuizz">${element.title}</div>
        </div>

        `;

        const umQuizzDaNet = document.querySelector(`.outrosQuizzes .quizz .umQuizz`);

        umQuizzDaNet.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url('${element.image}')` ;

    }); */

}

function deuErro() {

    conslode.log("Erro");

}
/* const umQuizzDaNet = document.querySelector(`.outrosQuizzes .quizz .${element.id}`);
console.log(umQuizzDaNet);

quizzes.forEach(element => {
     
    umQuizzDaNet.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url('${element.image}')` ;

}); */
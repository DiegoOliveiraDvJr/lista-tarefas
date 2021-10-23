
const inputNovaTarefa = document.querySelector('.input-nova-tarefa');
const btnAddTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');


function criali(){
    const li = document.createElement('li');
    return li; 
}
function criaTarefa(textoInput){
    const li = criali();
    li.innerText = textoInput;
    criaBotao(li);
    tarefas.appendChild(li);
    limpaInput();
    salvarTarefas();
}
function limpaInput(){
    inputNovaTarefa.value = '';
    inputNovaTarefa.focus();
}

function criaBotao(li){
    li.innerText += ' ';
    const botao = document.createElement('button');
    botao.innerText = 'Apagar';
    botao.setAttribute('class', 'apagar');
    botao.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botao);
}

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    liTarefas.forEach(tarefa => {
        let tarefaText = tarefa.innerText;
        tarefaText = tarefaText.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaText);
    });
    
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    listaDeTarefas.forEach(tarefa => {
        criaTarefa(tarefa)
    });
}

inputNovaTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){

        if(!inputNovaTarefa.value) return;
        criaTarefa(inputNovaTarefa.value);
        // const event = new Event('click');
        // btnAddTarefa.dispatchEvent(event);
    }
})
btnAddTarefa.addEventListener('click', function(){
    if(!inputNovaTarefa.value) return;
    criaTarefa(inputNovaTarefa.value)
})
//ou document.addEventListener('click', function(e)...
tarefas.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
})

adicionaTarefasSalvas();
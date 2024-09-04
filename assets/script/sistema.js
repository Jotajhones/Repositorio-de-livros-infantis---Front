// Funções gerais de controle do menu e onteudos.
(function MenuVizualizar() {

    // MENU LI CLICADO
    const vizualizar = document.getElementById('vizualizar');
    const radio = document.getElementById('radio-vizualizar');

    //CHECKBOXES dos outros menu
    const radio_editar = document.getElementById('radio-editar');
    const radio_adicionar = document.getElementById('radio-adicionar');
    const radio_deletar = document.getElementById('radio-deletar');

    //OUTROS MENUS LI
    const editar = document.getElementById('editar');
    const adicionar = document.getElementById('adicionar');
    const deletar = document.getElementById('deletar');

    MenuOverOut(radio, vizualizar, radio_editar, radio_adicionar, radio_deletar, editar, adicionar, deletar);
    carregarLivros(vizualizar);
    ocultarForm(vizualizar);

})();

(function MenuEditar() {

    const editar = document.getElementById('editar');
    const radio = document.getElementById('radio-editar');

    const radio_vizualizar = document.getElementById('radio-vizualizar');
    const radio_adicionar = document.getElementById('radio-adicionar');
    const radio_deletar = document.getElementById('radio-deletar');

    const vizualizar = document.getElementById('vizualizar');
    const adicionar = document.getElementById('adicionar');
    const deletar = document.getElementById('deletar');

    MenuOverOut(radio, editar, radio_vizualizar, radio_adicionar, radio_deletar, vizualizar, adicionar, deletar);

    let titulo = 'Editar';
    exibirForm(editar, titulo);
    verificarCarregarlivros(editar);
    editarLivro();

})();

(function MenuAdicionar() {

    const adicionar = document.getElementById('adicionar');
    const radio = document.getElementById('radio-adicionar');

    const radio_vizualizar = document.getElementById('radio-vizualizar');
    const radio_editar = document.getElementById('radio-editar');
    const radio_deletar = document.getElementById('radio-deletar');

    const vizualizar = document.getElementById('vizualizar');
    const editar = document.getElementById('editar');
    const deletar = document.getElementById('deletar');

    MenuOverOut(radio, adicionar, radio_vizualizar, radio_editar, radio_deletar, vizualizar, editar, deletar);

    let titulo = 'Adicionar';
    exibirForm(adicionar, titulo);
    verificarCarregarlivros(adicionar);
    addLivro();

})();

(function MenuDeletar() {

    const deletar = document.getElementById('deletar');
    const radio = document.getElementById('radio-deletar');

    const radio_vizualizar = document.getElementById('radio-vizualizar');
    const radio_editar = document.getElementById('radio-editar');
    const radio_adicionar = document.getElementById('radio-adicionar');

    const vizualizar = document.getElementById('vizualizar');
    const editar = document.getElementById('editar');
    const adicionar = document.getElementById('adicionar');

    MenuOverOut(radio, deletar, radio_vizualizar, radio_editar, radio_adicionar, vizualizar, editar, adicionar);

    let titulo = 'Deletar';
    exibirForm(deletar, titulo);
    verificarCarregarlivros(deletar);
    deletarLivro(vizualizar, editar, adicionar);

})();

// Função para animações do menu;

function MenuOverOut(radioID, MenuItem, RadioMenu1, RadioMenu2, RadioMenu3, Menu1, Menu2, Menu3) {

    //OUVINTE CHANGE, PARA VERIFICAR A MARCAÇÂO DO CHECKBOX
    radioID.addEventListener('change', () => {

        //VALIDAÇÂO PARA CAPTAR O MENU CLICADO
        if (radioID.checked) {

            //OCORRE A ANIMAÇÂO DO MENU CLICADO ENQUANTO OS OUTRO SÂO DESCLICADOS FORCADAMENTE
            MenuItem.style.backgroundColor = '#E5E5E5';
            MenuItem.style.color = 'var(--cor1)';

            RadioMenu1.checked = false;
            Menu1.style.backgroundColor = 'var(--cor2)'
            Menu1.style.color = 'white';

            RadioMenu2.checked = false;
            Menu2.style.backgroundColor = 'var(--cor2)'
            Menu2.style.color = 'white';

            RadioMenu3.checked = false;
            Menu3.style.backgroundColor = 'var(--cor2)'
            Menu3.style.color = 'white';
        }
    })

    //LAÇO LOGICO PARA TRATA MENUS NÃO CLICADOS
    if (!radioID.checked) {

        //TODOS OS NÃO CLICADOS SAO FORÇADAMENTE RETORNADOS AO ESTADO INICIAL (REDUNDANCIA NECESSARIA)
        MenuItem.style.backgroundColor = 'var(--cor2)'
        MenuItem.style.color = 'white';

        //OUVINTE PARA SIMULAR O HOVER - ENTRADA DO MOUSE
        MenuItem.addEventListener('mouseover', () => {

            //REDUNDANCIA NECESSARIA DO CLICK NO COMECO DO LAÇO, PARA QUE O HOVER NÃO ATINJA O MENU CLICADO
            if (radioID.checked) {

                MenuItem.style.backgroundColor = '#E5E5E5';
                MenuItem.style.color = 'var(--cor1)';


            } else {

                // CASO O IF SEJA FALSO SEMPRE QUE O MOUSE ENTRAR EM UM LI A COR DE FUNDO MUDARÁ
                MenuItem.style.backgroundColor = 'var(--cor1)';
                MenuItem.style.color = 'rgb(173, 173, 173)';
            }
        });

        //OUVINTE MOUSE OUT
        MenuItem.addEventListener('mouseleave', () => {

            if (radioID.checked) {

                //REDUNDACIA NOVAMENTE NO LAÇO IF PARA GARANTIR QUE O MENU CLICADO NÃO SEJA ALTERADO
                MenuItem.style.backgroundColor = '#E5E5E5';
                MenuItem.style.color = 'var(--cor1)';

            } else {

                //O MENU RETORNA A COR ORIGINAL APOS A SAIDA DO MOUSE
                MenuItem.style.backgroundColor = 'var(--cor2)';
                MenuItem.style.color = 'white';
            }
        });
    }
}

function carregarLivros(MenuLi) {
    fetch('http://localhost:3000/livros')
        .then(res => res.json())
        .then(res => {
            const data = res

            MenuLi.addEventListener('click', () => {
                const main = document.getElementById('conteudoPrincipal');
                main.innerHTML = "";
                main.style.backgroundColor = '#E5E5E5';

                let id;
                let nome;
                let autor;
                let editora;
                let url;
                let capa;


                for (let i = 0; i < data.length; i++) {

                    id = data[i].id;
                    nome = data[i].titulo;
                    autor = data[i].autor;
                    editora = data[i].editora;
                    url = data[i].url;
                    capa = data[i].capa;

                    // CRIANDO ESTRUTURA HTML
                    // CARD
                    let divCard = document.createElement('div');
                    divCard.classList.add('cardLivros');

                    divCard.addEventListener('click', () => {

                        if (document.getElementById('tituloForm').textContent == 'Adicionar') {
                            return
                        } else {
                            if (document.getElementById('formArea').style.display === 'none') {
                                alert('Selecione uma opção no menu');
                            } else {
                                // alert(`${i}`);
                                preecherForm(data[i].id, data[i].titulo, data[i].autor, data[i].editora, data[i].url, data[i].capa);
                            }
                        }
                    })

                    criarCard(nome, id, autor, editora, url, capa, main, divCard)
                }
            })
        })
}

// FUNÇÃO PARA EXIBIR O FORMULARIO
function exibirForm(menuLi, string) {

    menuLi.addEventListener('click', () => {
        document.getElementById('formArea').style.display = 'block';
        document.getElementById('tituloForm').innerHTML = string;
        document.getElementById('botao').innerHTML = string;

        limparForm();;
    });
}

// FUNÇÃO PARA OCULTAR O FORMULARIO
function ocultarForm(menuLi) {
    menuLi.addEventListener('click', () => {
        document.getElementById('formArea').style.display = 'none';

        limparForm()
    });
}

// FUNÇÃO QUE PREENCHE O FORMULARIO EM CONJUNTO COM O OUVINTE DIVCARD
function preecherForm(id, nome, autor, editora, url, capa) {

    document.getElementById('inputID').value = id;
    document.getElementById('inputNome').value = nome;
    document.getElementById('inputAutor').value = autor;
    document.getElementById('inputEditora').value = editora;
    document.getElementById('inputUrl').value = url;
    document.getElementById('inputCapa').value = capa;
}

// FUNÇÃO PARQA LÇIMPAR TODOS OS FORMULARIOS
function limparForm() {

    document.getElementById('inputID').value = "";
    document.getElementById('inputNome').value = "";
    document.getElementById('inputAutor').value = "";
    document.getElementById('inputEditora').value = "";
    document.getElementById('inputUrl').value = "";
    document.getElementById('inputCapa').value = "";
}

// FUNÇÃO QUE VERIFICA SE ESTA NA PAGINA INICIAL, CASO JA TENHA OCORRIDO ALGUM CLICK NO MENU, CASO SIM, ELA EXECUTA O FETCH.
function verificarCarregarlivros(menuLi) {

    if (document.getElementById('imglogo')) {
        carregarLivros(menuLi);
    }
}

function addLivro() {
    const botao = document.getElementById('botao');
    botao.addEventListener('click', () => {
        if (botao.textContent == 'Adicionar') {

            const id = document.getElementsByClassName('cardLivros').length;
            const nome = document.getElementById('inputNome').value;
            const autor = document.getElementById('inputAutor').value;
            const editora = document.getElementById('inputEditora').value;
            const url = document.getElementById('inputUrl').value;
            const capa = document.getElementById('inputCapa').value;

            console.log(id, nome, autor, editora, url, capa);

            fetch('http://localhost:3000/livros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": id,
                    "titulo": nome,
                    "autor": autor,
                    "ano": "",
                    "editora": editora,
                    "idioma": "português",
                    "url": url,
                    "capa": capa
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (!res)
                        return;
                    console.log(`Deu certo`);
                    alert('Objeto adcionado com sucesso.')
                    location.reload();
                })
                .catch(() => {
                    console.log('Algo deu errado');
                })
        }
    })
}

function editarLivro() {
    const botao = document.getElementById('botao');
    botao.addEventListener('click', () => {
        if (botao.textContent == 'Editar') {

            const id = document.getElementById('inputID').value;
            const nome = document.getElementById('inputNome').value;
            const autor = document.getElementById('inputAutor').value;
            const editora = document.getElementById('inputEditora').value;
            const url = document.getElementById('inputUrl').value;
            const capa = document.getElementById('inputCapa').value;

            console.log(id, nome, autor, editora, url, capa);

            fetch('http://localhost:3000/livros', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": id,
                    "titulo": nome,
                    "autor": autor,
                    "ano": "",
                    "editora": editora,
                    "idioma": "português",
                    "url": url,
                    "capa": capa
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (!res)
                        return;
                    console.log(`Deu certo, resposta => ${res}`);
                    alert('Objeto editado com sucesso');
                    location.reload();
                })
                .catch(() => {
                    console.log('Algo deu errado');
                })
        }
    })
}

function deletarLivro(menuLi, menuLi1, menuLi2) {

    const deletar = document.getElementById('deletar');
    deletar.addEventListener('click', () => {

        if (deletar) {
            document.getElementById('inputID').disabled = true;
            document.getElementById('inputNome').disabled = true;
            document.getElementById('inputAutor').disabled = true;
            document.getElementById('inputEditora').disabled = true;
            document.getElementById('inputUrl').disabled = true;
            document.getElementById('inputCapa').disabled = true;
        }
    })

    const botao = document.getElementById('botao');
    botao.addEventListener('click', () => {
        if (botao.textContent == 'Deletar') {

            const id = document.getElementById('inputID').value;
            const nome = document.getElementById('inputNome').value;
            const autor = document.getElementById('inputAutor').value;
            const editora = document.getElementById('inputEditora').value;
            const url = document.getElementById('inputUrl').value;
            const capa = document.getElementById('inputCapa').value;

            console.log(id, nome, autor, editora, url, capa);
            alert('click');

            fetch('http://localhost:3000/livros', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": id,
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (!res)
                        return;
                    console.log(`Deu certo, resposta => ${res}`);
                    alert('O objeto foi deletado com sucesso');
                    location.reload();
                })
                .catch(() => {
                    console.log('Algo deu errado');
                })
        }
    });

    menuLi.addEventListener('click', () => {
        document.getElementById('inputID').disabled = false;
        document.getElementById('inputNome').disabled = false;
        document.getElementById('inputAutor').disabled = false;
        document.getElementById('inputEditora').disabled = false;
        document.getElementById('inputUrl').disabled = false;
        document.getElementById('inputCapa').disabled = false;
    })
    menuLi1.addEventListener('click', () => {
        document.getElementById('inputID').disabled = false;
        document.getElementById('inputNome').disabled = false;
        document.getElementById('inputAutor').disabled = false;
        document.getElementById('inputEditora').disabled = false;
        document.getElementById('inputUrl').disabled = false;
        document.getElementById('inputCapa').disabled = false;
    })
    menuLi2.addEventListener('click', () => {
        document.getElementById('inputID').disabled = false;
        document.getElementById('inputNome').disabled = false;
        document.getElementById('inputAutor').disabled = false;
        document.getElementById('inputEditora').disabled = false;
        document.getElementById('inputUrl').disabled = false;
        document.getElementById('inputCapa').disabled = false;
    })

}


(function buscador() {
    // Captura de elementos HTML
    let divIcones = document.getElementById('icones');
    let divIcon = document.getElementById('btnProcurar');
    const buscarIcon = document.getElementById('buscarIcon');
    const linha = document.createElement('div');
    linha.id = 'buscadorLine'

    // Criacao de elementos necessarios
    let divBusca = document.createElement('div');
    divBusca.id = 'divBusca';
    let txtBusca = document.createElement('input');
    txtBusca.id = 'txtBusca';
    txtBusca.placeholder = "Buscar...";
    let ImgBtnBusca = document.createElement('img');
    ImgBtnBusca.id = 'btnBusca';
    ImgBtnBusca.src = './assets/images/icons/procurar.png';

    // Ouvinte de click
    divIcon.addEventListener('click', () => {

        // Limppando campos, caso existam valores guardados.
        txtBusca.value = "";
        buscarIcon.alt = "";
        buscarIcon.src = "";
        buscarIcon.innerHTML = "";

        // Adicionando os elementos ao HTML
        divIcones.appendChild(divBusca);
        divBusca.appendChild(txtBusca);
        divBusca.appendChild(ImgBtnBusca);
        divBusca.appendChild(linha)

        // Removendo a div Paterna inicial
        divIcon.remove();
        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                procurar(txtBusca.value)
            }
        });
    });

    // Ouvinte da saida do mouse da div de pesquisa
    divBusca.addEventListener('mouseleave', () => {

        // Temporizador, para executar a funcao quando for detctada a primeira saida do mouse
        setTimeout(() => {

            // Resetando campos e divs
            txtBusca.placeholder = "Buscar...";
            divBusca.remove();

            // Readicionando o menu antigo
            divIcones.appendChild(divIcon);
            buscarIcon.src = './assets/images/icons/procurar.png';
            divIcon.appendChild(buscarIcon);

            //Zerando qualquer valor guardado no input
            txtBusca.value = "";
        }, 30000);
    });
})();

function procurar(input) {
    fetch('http://localhost:3000/livros')
        .then(res => res.json())
        .then(res => {
            const data = res;
            console.log(data);
            let c = 0

            if (!input) {

                alert('Por favor digite algo.');
                return
            } else if (input) {

                for (let i = 0; i < data.length; i++) {

                    nome = data[i].titulo.toUpperCase();
                    autor = data[i].autor.toUpperCase();
                    input = input.toUpperCase();

                    if (nome.includes(input) || autor.includes(input)) {
                        c++
                    }
                }
                console.log(c);
            }

            if (c > 0) {

                const main = document.getElementById('conteudoPrincipal');
                main.innerHTML = "";
                main.style.backgroundColor = '#E5E5E5';

                let id;
                let nome;
                let autor;
                let editora;
                let url;
                let capa;

                for (let i = 0; i < data.length; i++) {

                    nome = data[i].titulo.toUpperCase();
                    autor = data[i].autor.toUpperCase();
                    input = input.toUpperCase();

                    if (nome.includes(input) || autor.includes(input)) {

                        let divCard = document.createElement('div');
                        divCard.classList.add('cardLivros');

                        divCard.addEventListener('click', () => {

                            if (document.getElementById('tituloForm').textContent == 'Adicionar') {
                                return
                            } else {
                                if (document.getElementById('formArea').style.display === 'none') {
                                    alert('Selecione uma opção no menu');
                                } else {
                                    // alert(`${i}`);
                                    preecherForm(data[i].id, data[i].titulo, data[i].autor, data[i].editora, data[i].url, data[i].capa);
                                }
                            }
                        })

                        id = data[i].id;
                        nome = data[i].titulo;
                        autor = data[i].autor;
                        editora = data[i].editora;
                        url = data[i].url;
                        capa = data[i].capa;

                        console.log(input)
                        criarCard(nome, id, autor, editora, url, capa, main, divCard)
                    }
                }
            } else {
                alert('Não foram ncontrados itens para sua busca.')
            }
            c = 0;
        })
}

function criarCard(nome, id, autor, editora, url, capa, main, divCard) {
    // H1
    let h1 = document.createElement('h1');
    h1.innerHTML = nome;
    divCard.appendChild(h1);

    // h2
    let h2 = document.createElement('h2');
    h2.innerHTML = id;
    divCard.appendChild(h2);

    // autor
    let pAutor = document.createElement('p');
    pAutor.innerHTML = autor;
    divCard.appendChild(pAutor);

    // editora
    let pEditora = document.createElement('p');
    pEditora.innerHTML = editora;
    divCard.appendChild(pEditora);

    // url
    let pUrl = document.createElement('p');
    pUrl.innerHTML = url;
    divCard.appendChild(pUrl);

    // capa
    let pCapa = document.createElement('p');
    pCapa.innerHTML = capa;
    divCard.appendChild(pCapa);

    main.appendChild(divCard);
}

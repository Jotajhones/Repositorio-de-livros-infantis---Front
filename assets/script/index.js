let favoritos = [];

function card() {
    reqStorage();
    fetch('http://localhost:3000/livros')
        .then(res => res.json())
        .then(res => {
            const data = res

            for (let i = 0; i < data.length; i++) {
                criarCard(data[i], i);
                curtir(i, data);
                modal(i);
            }
            atualizarFavoritos();
            carregarFavoritos();
            forceFav();
        })
};

(function buscador() {
    // Captura de elementos HTML
    let divIcones = document.getElementById('icones');
    let divIcon = document.getElementById('btnProcurar');
    const buscarIcon = document.getElementById('buscarIcon');
    const btnMenu = document.getElementById('btnMenu');
    let imgMenu = document.getElementById('menuIcone');

    // Criacao de elementos necessarios
    let divBusca = document.createElement('div');
    divBusca.id = 'divBusca';
    let txtBusca = document.createElement('input');
    txtBusca.id = 'txtBusca';
    txtBusca.placeholder = "Buscar...";
    let ImgBtnBusca = document.createElement('img');
    ImgBtnBusca.id = 'btnBusca';
    ImgBtnBusca.src = 'assets/images/icons/procurar.png';
    const linha = document.createElement('div');
    linha.id = 'buscadorLine'

    // Ouvinte de click
    divIcon.addEventListener('click', () => {
        // Limppando campos, caso existam valores guardados.
        txtBusca.value = "";
        imgMenu.src = '';
        imgMenu.alt = '';
        buscarIcon.alt = "";
        buscarIcon.src = "";
        buscarIcon.innerHTML = "";

        // Adicionando os elementos ao HTML
        divIcones.appendChild(divBusca);
        divBusca.appendChild(linha);
        divBusca.appendChild(txtBusca);
        divBusca.appendChild(ImgBtnBusca);
        imgMenu.src = 'assets/images/icons/menu-aberto.png';
        divIcones.appendChild(btnMenu);
        btnMenu.appendChild(imgMenu);
        txtBusca.focus();
        // Removendo a div Paterna inicial
        divIcon.remove();

        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                procurar(txtBusca.value);
            }
            atualizarFavoritos();
            forceFav();
        });

        ImgBtnBusca.addEventListener('click', () => {
            procurar(txtBusca.value);
            atualizarFavoritos();
            forceFav();
        })
    });

    // Ouvinte da saida do mouse da div de pesquisa
    divBusca.addEventListener('mouseleave', () => {

        // Temporizador, para executar a funcao quando for detctada a primeira saida do mouse
        setTimeout(() => {

            // Resetando campos e divs
            txtBusca.placeholder = "Buscar...";
            divBusca.remove();
            imgMenu.src = '';
            imgMenu.alt = '';

            // Readicionando o menu antigo
            divIcones.appendChild(divIcon);
            buscarIcon.src = 'assets/images/icons/procurar.png';
            divIcon.appendChild(buscarIcon);
            imgMenu.src = 'assets/images/icons/menu-aberto.png';
            divIcones.appendChild(btnMenu);
            btnMenu.appendChild(imgMenu);

            //Zerando qualquer valor guardado no input
            txtBusca.value = "";
        }, 10000000);
    });
})();

function criarCard(data, i) {
    const imgSRC = 'assets/images/capa/'
    const curtiSRC = 'assets/images/icons/heart.png';
    const enviarSRC = "assets/images/icons/paper-plane.png";

    const main = document.getElementById('main')

    //Div Card
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    // imagem de capa
    const divImg = document.createElement('div');
    divImg.classList.add('imgCapa');
    const imgCapa = document.createElement('img');
    imgCapa.src = imgSRC + data.capa;
    divImg.appendChild(imgCapa);
    const link = document.createElement('a');
    link.href = data.url;
    link.target = "_blank";
    link.appendChild(divImg);

    // div conteudo, titulo e abbr 
    const divConteudo = document.createElement('div');
    divConteudo.classList.add('tituloBotoes')
    const h1 = document.createElement('h1');
    const abbr = document.createElement('abbr');
    abbr.innerText = data.titulo;
    abbr.title = data.titulo;
    h1.appendChild(abbr);
    divConteudo.appendChild(h1);

    // botoes
    const divBotoes = document.createElement('div');
    divBotoes.classList.add('botoes');
    // curtir
    const divCurtir = document.createElement('div');
    divCurtir.id = `curtir${i}`
    divCurtir.classList.add('curtir');
    const curtirImg = document.createElement('img');
    curtirImg.id = `curtirIMG${i}`
    curtirImg.src = curtiSRC;
    divCurtir.appendChild(curtirImg);
    const labelCurtir = document.createElement('label');
    labelCurtir.appendChild(divCurtir);
    divBotoes.appendChild(labelCurtir);

    // enviar
    const divEnviar = document.createElement('div');
    divEnviar.classList.add('enviar');
    divEnviar.id = `enviar${i}`
    const enviarImg = document.createElement('img');
    enviarImg.src = enviarSRC;
    divEnviar.appendChild(enviarImg);
    divBotoes.appendChild(divEnviar);
    divConteudo.appendChild(divBotoes);

    // add tudo
    divCard.appendChild(link);
    divCard.appendChild(divConteudo);
    main.appendChild(divCard);
}

function procurar(input) {
    fetch('http://localhost:3000/livros')
        .then(res => res.json())
        .then(res => {
            const data = res;

            let nome;
            let autor;
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
                        document.getElementById('main').innerHTML = "";
                    }
                }
            }

            if (c > 0) {
                for (let i = 0; i < data.length; i++) {

                    nome = data[i].titulo.toUpperCase();
                    autor = data[i].autor.toUpperCase();
                    input = input.toUpperCase();

                    if (nome.includes(input) || autor.includes(input)) {
                        criarCard(data[i], i);
                        curtir(i, data);
                        modal(i);
                    }
                }
                forceFav();
            } else {
                alert('Não foram ncontrados itens para sua busca.')
            }
            c = 0;
        })
}

function curtir(i, data) {
    const imgCoracao = document.getElementById(`curtirIMG${i}`);

    imgCoracao.addEventListener('click', (event) => {

        if (imgCoracao.src.includes('assets/images/icons/heart.png')) {

            imgCoracao.src = 'assets/images/icons/heart(1).png';
            favoritos.push({ id: data[i].id, titulo: data[i].titulo, capa: data[i].capa, url: data[i].url });
            salvarStorage();
        } else {

            for (let c = 0; c < favoritos.length; c++) {
                let teste = `curtirIMG${favoritos[c].id}`;

                if (teste == (event.target.id)) {
                    favoritos.splice(c, 1);
                    salvarStorage();
                }
                imgCoracao.src = 'assets/images/icons/heart.png';
            }
        }
    })
}

function salvarStorage() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function atualizarFavoritos() {

    for (let i = 0; i < favoritos.length; i++) {
        let curtirSRC = 'curtirIMG'

        if (favoritos.length > 0) {
            let img = document.getElementById(`curtirIMG${favoritos[i].id}`)
            img.src = 'assets/images/icons/heart(1).png';
        }
    }
}

function reqStorage() {

    let favStorage = localStorage.getItem("favoritos");
    if (favStorage) {
        favoritos = JSON.parse(favStorage);
    }
}

function carregarFavoritos() {

    const pageFavoritos = document.getElementById('pageFavoritos');
    pageFavoritos.addEventListener('click', () => {

        if (favoritos.length > 0) {

            document.getElementById('main').innerHTML = "";
            for (let i = 0; i < favoritos.length; i++) {
                document.querySelector('h1').innerText = 'Favoritos'
                criarCard(favoritos[i], favoritos[i].id);
                modal(favoritos[i].id);
            }

            atualizarFavoritos();
            forceFav();
        } else {
            alert("Não há itens aqui :'(");
        }
    })
};

function forceFav() {

    const k = document.getElementsByClassName('card');

    for (let i = 0; i < favoritos.length; i++) {

        for (let c = 0; c < k.length; c++) {

            if (favoritos[i].titulo == k[c].innerText) {
                let img = document.getElementById(`curtirIMG${favoritos[i].id}`)
                img.src = 'assets/images/icons/heart(1).png';
            }
        };
    };
}

function modal(i) {
    const evento = document.getElementById(`enviar${i}`);
    const body = document.querySelector('body');

    evento.addEventListener('click', () => {

        const main = document.querySelector('main');
        const fundoOpaco = document.createElement('div');
        fundoOpaco.style.display = 'flex';
        fundoOpaco.id = 'fundoOpaco';
        fundoOpaco.innerHTML = 'a'
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            transition: '0.5s'
        })
        body.style.overflow = 'hidden';
        main.appendChild(fundoOpaco);

        const divModal = document.createElement('div');
        divModal.id = 'modal';
        fundoOpaco.appendChild(divModal);

        const botaoFechar = document.createElement('div');
        botaoFechar.innerHTML = 'X';
        botaoFechar.id = 'botaoFechar';
        divModal.appendChild(botaoFechar);

        const tituloModal = document.createElement('h1');
        tituloModal.innerText = 'Compartilhe:';
        divModal.appendChild(tituloModal);

        const labelModal = document.createElement('label');
        const inputModal = document.createElement('input');
        const hr = document.createElement('hr');
        inputModal.placeholder = '(XX) XXXX-XXXX';
        inputModal.id = 'inputModal';
        inputModal.type = 'tel';
        inputModal.value = "";

        labelModal.innerHTML = "Insira o seu telefone: <br>";
        labelModal.appendChild(inputModal);
        labelModal.appendChild(hr)
        divModal.appendChild(labelModal);
        inputModal.focus();

        const botaoModal = document.createElement('div');
        botaoModal.innerText = 'Enviar';
        botaoModal.id = 'botaoModal';
        divModal.appendChild(botaoModal);
        let stringPhone = '';

        document.addEventListener('keyup', (event, value) => {
            handlePhone(event);
            phoneMask(value);
            stringPhone = inputModal.value
        });

        botaoModal.addEventListener('click', () => {
            wame(stringPhone, inputModal);
        });

        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                wame(stringPhone, inputModal); Z
            }
        })
        botaoFechar.addEventListener('click', () => {
            fundoOpaco.style.display = 'none';
            body.style.overflow = 'auto';
            inputModal.value = "";
        })
    })
}

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

function wame(stringPhone, inputModal) {
    if (stringPhone == "" || stringPhone.length > 15 || stringPhone.length < 15) {
        alert('Número invalido, digite novamente.')
    } else {
        stringPhone = stringPhone.replace(" ", "");
        stringPhone = stringPhone.replace("-", "");
        stringPhone = stringPhone.replace("(", "");
        stringPhone = stringPhone.replace(")", "");
        stringPhone = '55' + stringPhone

        window.open(`https://wa.me/${stringPhone}?text=http://127.0.0.1:5500/Projeto/index.html%20:%20Venha%20Conhecer%20o%20Mais%20novo%20repositorio%20de%20livros%20infantis.`, '_blank')
        console.log(stringPhone);

        alert('O link foi aberto em uma nova guia.');
        inputModal.value = "";
    }
}

window.onload = card;

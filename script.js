/* ==========================
   MATSU SUSHI DELIVERY
========================== */

let carrinho = [];

/* ==========================
   ADICIONAR ITEM
========================== */

function adicionar(nome, preco) {

    const item = carrinho.find(
        produto => produto.nome === nome
    );

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            nome,
            preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

/* ==========================
   ATUALIZAR CARRINHO
========================== */

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const contador =
        document.getElementById("contador");

    const totalBox =
        document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        quantidadeTotal += item.quantidade;

        lista.innerHTML += `

        <li class="item-carrinho">

            <div>
                <strong>${item.nome}</strong>
                <br>
                R$ ${item.preco.toFixed(2)}
            </div>

            <div class="controles">

                <button onclick="diminuir(${index})">
                    -
                </button>

                <span>
                    ${item.quantidade}
                </span>

                <button onclick="aumentar(${index})">
                    +
                </button>

            </div>

        </li>

        `;
    });

    contador.innerText = quantidadeTotal;

    totalBox.innerText =
        "R$ " + total.toFixed(2);
}

/* ==========================
   AUMENTAR
========================== */

function aumentar(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}

/* ==========================
   DIMINUIR
========================== */

function diminuir(index) {

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}

/* ==========================
   ABRIR CARRINHO
========================== */

function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("ativo");
}

/* ==========================
   FECHAR CARRINHO
========================== */

function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("ativo");
}

/* ==========================
   FINALIZAR PEDIDO
========================== */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Adicione itens ao carrinho.");

        return;
    }

    const endereco =
        document
            .getElementById("endereco")
            .value;

    if (!endereco.trim()) {

        alert("Digite o endereço de entrega.");

        return;
    }

    let total = 0;

    let mensagem =
        "🍣 *NOVO PEDIDO - MATSU SUSHI*%0A%0A";

    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        mensagem +=
            `• ${item.nome}%0A`;

        mensagem +=
            `Quantidade: ${item.quantidade}%0A`;

        mensagem +=
            `Subtotal: R$ ${subtotal.toFixed(2)}%0A%0A`;
    });

    mensagem +=
        "━━━━━━━━━━━━━━%0A";

    mensagem +=
        `💰 *TOTAL:* R$ ${total.toFixed(2)}%0A%0A`;

    mensagem +=
        `📍 *ENDEREÇO:* ${endereco}%0A%0A`;

    mensagem +=
        "Obrigado pela preferência! 🍣";

    window.open(
        `https://wa.me/5511941333956?text=${mensagem}`,
        "_blank"
    );
}

/* ==========================
   FECHAR CLICANDO FORA
========================== */

window.addEventListener(
    "click",
    function (e) {

        const carrinhoBox =
            document.getElementById(
                "carrinho"
            );

        const botao =
            document.querySelector(
                ".cart-btn"
            );

        if (
            carrinhoBox.classList.contains(
                "ativo"
            ) &&
            !carrinhoBox.contains(
                e.target
            ) &&
            !botao.contains(
                e.target
            )
        ) {
            fecharCarrinho();
        }
    }
);

/* ==========================
   MENU MOBILE
========================== */

function toggleMenu() {

    const menu =
        document.getElementById("menu");

    if (
        menu.style.display === "flex"
    ) {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";
        menu.style.flexDirection = "column";
        menu.style.position = "absolute";
        menu.style.top = "80px";
        menu.style.right = "20px";
        menu.style.padding = "20px";
        menu.style.borderRadius = "15px";
        menu.style.background = "#111";
        menu.style.gap = "15px";
    }
}

/* ==========================
   HEADER SCROLL
========================== */

window.addEventListener(
    "scroll",
    () => {

        const topo =
            document.querySelector(
                ".topo"
            );

        if (window.scrollY > 50) {

            topo.style.background =
                "rgba(0,0,0,.95)";

        } else {

            topo.style.background =
                "rgba(0,0,0,.85)";
        }
    }
);

/* ==========================
   INICIAR
========================== */

atualizarCarrinho();
import { useState } from "react"

//Array de objetos contendo o estado inicial do cardapio
const cardapio = [
    { id: 1, nome: "Combo-01", preco: 25.00, disponivel: true, quantidade: 0 },
    { id: 2, nome: "Combo-02", preco: 35.00, disponivel: true, quantidade: 0 },
    { id: 3, nome: "Combo-03", preco: 45.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: "Combo-04", preco: 55.00, disponivel: true, quantidade: 0 },
];

const Pedido = () => {

    //HOOK- useState- Manipula o estado da variavel
    //Estados para gerenciar a lista de items do cardápio
    const [items, setItems] = useState(cardapio);
    const [status, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    //Valor fixo adicionado ao total quando tiver items no carrinho
    const taxaEntrega = 5.00;

    //Função que altera a quantidade do pedido
    const AlterarQuantidade = (id, valor) => {
        setItems(alt =>
            //MAP: CRIA UM NOVO ARRRAY E PERCORRE OS ITEMS  SEM MODIFICAR O ORIGINAL(IMUTABILIDADE)
            alt.map(item =>
                //TERNARIO: verifica se o item da iteração atual é o que deve ser alterado
                //SPREAD (..item): manter os valores antigos e adiciona os novos 
                //MATH.MAX : objeto que garante que a quantidade nunca seja menor que 0
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
            )
        )
    }

    //FILTER: Seleciona apenas os produtos disponiveis no carrinho
    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    //REDUCE: Calcula a soma dos items (preco + quantidade ) e adiciona 
    // a taxa de entrega
    const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

    //SIMULAÇÃO DO CICLO DE VIDA DE ENTREGA USANDO TEMPORIZADOR ASSÍNCRONO

    const ConfirmarPedido = () => {
        setEnviar(true);
        setStatus("Restaurante Confirmou pagamento, preparando pedido");
        setTimeout(() => {
            setStatus("Seu pedido saiu para entrega")
            setEnviar(false);
        }, 5000)
        setTimeout(() => {
            setStatus("Seu Pedido foi entregue com suceso");
            setEnviar(false)
        }, 10000)
    }

    return (
        <div>
            <h2>Cardápio do Restaurante</h2>
            {produtosDisponiveis.map(produto => (
                <div>
                    <span>{produto.nome} R$ {produto.preco.toFixed(2)}</span>
                    <div>
                        <button onClick={() => AlterarQuantidade(produto.id, -1)}>-</button>
                        <span>{produto.quantidade}</span>
                        <button onClick={() => AlterarQuantidade(produto.id, +1)}>+</button>
                    </div>
                </div>
            ))}
            {/* linha */}
            <hr />

            <h3>Resumo da Entrega</h3>

            {carrinho.length === 0 ? (
                <p>Seu Carrinho está vazio</p>
            ) : (
                <>
                    <ul>
                        {carrinho.map(item => (
                            <li key={item.id}>
                                {item.quantidade} x {item.nome} -R${(item.preco * item.quantidade).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Subtotal: R$ {subTotal.toFixed(2)}</p>
                    <p>Taxa de Entrega:  R$ {taxaEntrega.toFixed(2)}</p>
                    <strong>
                        total a pagar: R$ {total.toFixed(2)}
                    </strong>

                    <button onClick={ConfirmarPedido}>
                        {enviar ? "Enviando" : "Confirmar Pedido"}
                    </button>
                </>
            )}
            {status && (
                <div>
                    <strong>Alerta:</strong>{status}
                </div>

            )}
        </div>
    )
}

export default Pedido;

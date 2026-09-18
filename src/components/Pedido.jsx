import { useState, UseState } from "react"

const cardapio=[
    {id:1,nome:"Combo-01",preco:25.00,disponivel:true,quantidade:0},
    { id: 2, nome: "Combo-01", preco: 35.00, disponivel: true, quantidade: 0 },
    { id: 3, nome: "Combo-01", preco: 45.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: "Combo-01", preco: 55.00, disponivel: true, quantidade: 0 },    
]

const Pedido = () => {

    const[Itens,setItems]=useState(cardapio);
    const[status,setStatus]= useState("");
    const[enviar,setEnviar] = useState(false);


    const taxaEntrega =5.00;
    
    const AlterarQuantidade =(id,valor)=>{
        setItems(alt =>
            alt.map(item=>
                item.id === id ? {...item,quantidades: Math.max(0,item.quantidade + valor)}:item
            )
        )
    }
    //filter: Seleciona apenas os produtos disponiveis no carrinho
    const produtosDisponiveis = Itens.filter(item => item.disponivel);
    const carrinho = item.filter(item => item.quantidade >0);

    const subTotal = carrinho.reduce((ac,item)=> ac+ item.preco * item.quantidade,0);
    const total =subTotal >0 ? subTotal + taxaEntrega: 0;
     
    const ConfimarPedido=()=>{
        setEnviar(true);
        setStatus("Restaurante Confirmou pagamento, preparando pedido");
        setTimeout(()=> {
            setStatus("Seu pedido saiu para entrega")
            setEnviar(false);
        },5000)
        setTimeout(()=>{
            setStatus("Seu Pedido foi entregue com sucesso");
            setEnviar(false)
        },10000)
    }
    


  return (
    <>
      
    </>
  )
}

export default Pedido

import imgSair from "../assets/sair.png"
import imgMais from "../assets/mais.png"
import imgMenos from "../assets/menos.png"
import { useContext, useState } from "react";
import UserContext from "../contexts/useContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


export default function Extrato() {

    const { dados, setName } = useContext(UserContext)
    const [extratoArr, setExtratoArr] = useState([])
    const [total, setTotal] = useState(0)
    const config = { headers: { Authorization: `Bearer ${dados.token}` } }
    let index = 0;

    function somaTotal(operacoes) {
        
        operacoes.map((o) => o.value >= 0 ? index + o.value : index - o.value);
        setTotal(index)
    }

    useEffect(() => {

        const promise = axios.get("http://localhost:5000/extrato", config)
        promise.then(res => {

            console.log(res.data);
            setExtratoArr(res.data)
            somaTotal(res.data)
        })

        promise.catch(err => console.log(err.response.data.message))

    }, [])

    useEffect(() => {
        if(extratoArr.length >= 0){
            extratoArr.forEach((t) => {
                if(t.type >= 0){
                    index -= Number(t.value)                   
                } else {
                    index += Number(t.value)
                }
            })
            return setTotal(index)  
        }
    }, [extratoArr])

    function ListaExtrato() {

        return extratoArr.map(e => {
            return (

                <div className="operacao">
                    <h2>{e.time}</h2>
                    <h1>- {e.description}</h1>
                    <p>R$ {Number(e.value).toFixed(2)}</p>
                </div>
            )
        })
    }

    return (

        <>
            <div className="headerExtrato">
                <h1>Olá, {setName.name}!</h1>
                <Link to="/">
                    <img src={imgSair} alt="ícone sair" />
                </Link>
            </div>
            <div className="conteudoExtrato">
                {extratoArr.length === 0 ? <h2>Não há registros de entrada ou saída</h2> : <ListaExtrato />}
            </div>
            <div className="saldo">
                <h1>SALDO</h1>
                <h2>R$ {Number(total).toFixed(2)}</h2>
            </div>
            <div className="conteudoFooter">
                <div className="novaEntrada">
                    <Link to="/entrada">
                        <img src={imgMais} alt="ícone mais" />
                    </Link>
                    <h1>Nova entrada</h1>
                </div>
                <div className="novaSaida">
                    <Link to="/saida">
                        <img src={imgMenos} alt="ícone menos" />
                    </Link>
                    <h1>Nova saida</h1>
                </div>
            </div>
        </>
    )
}
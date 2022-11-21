import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/useContext";

export default function Saidas() {

    const { dados } = useContext(UserContext)
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    function subtrair(e) {
        e.preventDefault();

        const body = {
            description,
            value,
        };

        const config = { headers: { Authorization: `Bearer ${dados.token}` } }

        const promise = axios.post("http://localhost:5000/saida", body, config);

        promise.then((res) => {
            navigate("/extrato")
            console.log(res.data);
        });

        promise.catch((err) => console.log(err.response.data.message));
    }

    return (
        <div className="containerOperacao">
            <h1>Nova saída</h1>
            <div className="containerInput">
                <form onSubmit={subtrair}>
                    <input placeholder="Valor" type="number" onChange={e => setValue(e.target.value)} required></input>
                    <input placeholder="Descrição" type="text" onChange={e => setDescription(e.target.value)} required></input>
                    <button type="submit" >Salvar saída</button>
                </form>
            </div>
        </div>
    )
}
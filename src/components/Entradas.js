import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/useContext";

export default function Entradas() {

    const { dados } = useContext(UserContext)
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    function somar(e) {
        e.preventDefault();

        const body = {
            description,
            value,
        };

        const config = { headers: { Authorization: `Bearer ${dados.token}` } }

        const promise = axios.post("http://localhost:5000/entrada", body, config);

        promise.then((res) => {
            navigate("/extrato")
            console.log(res.data);
        });

        promise.catch((err) => console.log(err.response.data.message));
    }

    return (
        <div className="containerOperacao">
            <h1>Nova entrada</h1>
            <div className="containerInput">
                <form onSubmit={somar}>
                    <input placeholder="Valor" type="number" onChange={e => setValue(e.target.value)} required></input>
                    <input placeholder="Descrição" type="text" onChange={e => setDescription(e.target.value)} required></input>
                    <button type="submit" >Salvar entrada</button>
                </form>
            </div>
        </div>
    )
}
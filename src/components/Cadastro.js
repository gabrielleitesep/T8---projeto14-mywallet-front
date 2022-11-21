import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import imgLogo from "../assets/MyWallet.png"

export default function Cadastro() {

    const navigate = useNavigate()
    const body = {

        name: "",
        email: "",
        password: ""
    }

    function cadastrar(e) {
        e.preventDefault()

        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", body)
        promise.then(res => {

            console.log(res.data);
            navigate("/")
        })
        promise.catch(err => {

            console.log(err.response.data.message)
            alert("Dados cadastrais inválidos!")
    })
    }
    
    return (
        <div className="containerCadastrar">
             <div className="containerLogoCadastro">
                <img src={imgLogo} alt="logo do site" />
            </div>
            <div className="containerInput">
                <form onSubmit={cadastrar}>
                    <input placeholder="Nome" type="text" onChange={e => body.name = e.target.value} required></input>
                    <input placeholder="E-mail" type="email" onChange={e => body.email = e.target.value} required></input>
                    <input placeholder="Senha" type="password" onChange={e => body.password = e.target.value} required></input>
                    <input placeholder="Confirme a senha" type="password" onChange={e => body.password = e.target.value} required></input>
                    <button type="submit" >Cadastrar</button>
                </form>
            </div>
            <div className="containerCadastro">
                <Link to="/">
                    <h1>Já tem uma conta? Entre agora!</h1>
                </Link>
            </div>
        </div>
    )
}
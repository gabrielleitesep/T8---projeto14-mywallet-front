import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Login'
import Cadastro from './Cadastro'
import Entradas from './Entradas'
import Saidas from './Saidas'
import Extrato from "./Extrato"
import UserContext from "../contexts/useContext"
import { useState } from "react"


export default function App() {

    const [dados, setDados] = useState('')
    const [name, setName] = useState('')

    return (

        <>
            <BrowserRouter>
                <UserContext.Provider value={{ dados, setDados, name, setName}}>
                    <Routes>
                        <Route path='/cadastro' element={<Cadastro />} />
                        <Route path='/' element={<Login />} />
                        <Route path='/entrada' element={<Entradas />} />
                        <Route path='/saida' element={<Saidas />} />
                        <Route path='/extrato' element={<Extrato />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BsFillHouseFill} from "react-icons/bs"
import {IoIosLogIn} from "react-icons/io"
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  flex-direction:column;
  background-image:url(https://sm.ign.com/ign_br/news/m/mars-astro/mars-astronauts-could-go-mad-on-the-journey_hgu4.jpg);
  background-size: cover;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  padding-bottom: 430px;
  padding-left: 15px;
  align-items: center;
  color: white;
`;

const Form = styled.form`
  align-items: center;
  justify-items:center;
  justify-content: center;

  input{
    display: flex;
    flex-direction:column;
    background-color: #d6d0d0;
    height: 3vh;
    width: 20vw;
    border-color: white;
    border-radius: 5em;
    border: 1px solid;

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 96vw;
    height: 9vh;
}
  }
`;

const DivFilho = styled.div`  
  display: flex;
  flex-direction: row;
  

  button{
  position: relative;
  border-color: white;
  border-radius: 10em;
  border: 1px solid;
  margin: 20px; 
  padding: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size:1em;
  font-weight: bold;
  text-align: center;
  color: white;
  cursor: pointer;
  margin-top: 50px;
  background-color: transparent;
  box-shadow: 0 0 40px 40px transparent inset, 0 0 0 0 white;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
    :hover {
     box-shadow: 0 0 10px 0 white inset, 0 0 10px 4px white;
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassoword(event.target.value);
  }

  const onSubmitLogin = () => {
    const url = 'https://us-central1-labenu-apis.cloudfunctions.net/labeX/natalia-amaral-hopper/login';
    const headers = {"Content-Type":"application/json"};
    const body = {
        "email": email,
        "password": password
    };

    axios
    .post(url, body, {headers})
    .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/trips/list");
    })
    .catch((error) => {
        console.log(error.response.data);
        alert("Por favor, digite seu email e senha!");
    });
  };

  return (
    <Div>
      <Header>
      <h1>Fazer login</h1>
      </Header>
      <Form>
        <input
          placeholder={"E-mail"}
          type={"email"}
          onChange={onChangeEmail}
          value={email}
          required
        /><br/>
        <input
          placeholder={"Senha"}
          type={"password"}
          value={password}
          onChange={onChangePassword}
          required
          pattern="^.{6,}$"
          title="Sua senha deve ter no mínimo 6 caracteres"
          /><br/>
      </Form>    
      <DivFilho>
          <button onClick={() => navigate("/")}>Home <BsFillHouseFill/></button>
          <button onClick={onSubmitLogin} type='submit'> Entrar <IoIosLogIn/></button>
       </DivFilho>  
    </Div>
  );
}

export default LoginPage;
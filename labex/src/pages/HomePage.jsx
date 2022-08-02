import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaUserCheck} from "react-icons/fa"
import {BsListUl} from "react-icons/bs"
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  background-image:url(https://cdn.pixabay.com/photo/2020/03/26/02/01/astronaut-4968983_960_720.jpg);
  background-size: cover;
  height: 100vh;
  
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

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    height: 8vh;
    margin-top: 450px;
}
  }

  
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  padding-bottom: 200px;
  padding-left: 40px;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Div>
      <Header>
      <h1>LabeX</h1>
      </Header>
      <DivFilho>
      <button onClick={()=> navigate("/trips/list")}>Ver viagens <BsListUl/></button>
      <button onClick={() => navigate("/login")}>Login <FaUserCheck/></button>
      </DivFilho>
    </Div>
  );
}

export default HomePage;
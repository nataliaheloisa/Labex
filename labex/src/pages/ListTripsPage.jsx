import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BsFillHouseFill } from "react-icons/bs"
import styled from 'styled-components'
import axios from 'axios'
import {IoIosPersonAdd} from 'react-icons/io'

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  flex-direction:column;
  background-image:url(https://super.abril.com.br/wp-content/uploads/2022/04/A-nova-mensagem-que-cientistas-querem-enviar-ao-espaco.jpg);
  background-size: cover;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  padding-bottom: 200px;
  flex-direction: column;
  align-items: center;
  color: white;

  div{
  text-align: center;
  position: relative;
  top: 5%;
  overflow-y: scroll;
  width: 40vw;
  border:solid 1px white;
  height: 35vh;
  padding-right: 10px;
  padding-bottom: 10px;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    height: 50vh;
    width: 90vw;
}
  }

`;

const DivList = styled.div`
border:solid 1px #3E86F5;
padding:10px;
margin-left: 5px;
margin-top: px;
border-radius: 30px;
font-size: 15px;  
`;

const DivFilho = styled.div`  
  display: flex;
  flex-direction: row;
  padding-top: 350px;

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
    margin-top: 100px;
}
  }
`;

const ListTripsPage = () => {
  const navigate = useNavigate();
  const [nameTrips , setTrips] = useState([])

  useEffect(() => {getTrips()}, []);

  const getTrips = () => {
    axios
    .get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/natalia-amaral-hopper/trips`)
    .then((res) => { setTrips(res.data.trips);
      console.log(res)
    })
    .catch((err) => {console.log(err);

    })
};

const listaDeViagem = nameTrips.map((trip) => {
  return(
    <DivList key={trip.id}>
      <p><strong>Nome: </strong>{trip.name}</p>
      <p><strong>Descrição: </strong>{trip.description}</p>
      <p><strong>Planeta: </strong>{trip.planet}</p>
      <p><strong>Duração: </strong>{trip.durationInDays}</p>
      <p><strong>Data: </strong>{trip.date}</p>
    </DivList>
  )
});


return (
    <Div>
       <Header>
          <h1>Lista de viagens</h1>
          <div>{listaDeViagem}</div>
        </Header>
        <DivFilho>
          <button onClick={() => navigate("/")}>Home <BsFillHouseFill/></button>
          <button onClick={() => navigate("/trips/application")}>Inscreva-se <IoIosPersonAdd/></button>
        </DivFilho>
    </Div>
  );
}

export default ListTripsPage;
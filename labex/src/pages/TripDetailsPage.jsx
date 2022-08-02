import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillPersonXFill } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import {IoIosLogOut} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import useProtectedPage from '../hooks/useProtectedPages';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  flex-direction:column;
  background-image:url(https://paginanews.com.br/wp-content/uploads/2021/04/capturadepantall-5d810b602e90bd9af8d5719262f312fe-1200x600.jpg);
  background-size: cover;
  height: 100vh;

  header{
  display: flex;
  position: absolute;
  padding-bottom: 900px;
  padding-left: 40px;
  flex-direction: column;
  align-items: center;
  color: white;
  }

  div{
  align-items: center;
  justify-items:center;
  justify-content: center;
  padding-left: 10px;
  color: white;
  position: relative;
  top: 5%;
  overflow-y: scroll;
  width: 50vw;
  border:solid 1px white;
  height: 250px;
  padding-right: 10px;
  padding-bottom: 10px; 

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 85vw;
}
  }

  h3{
    text-align: center;

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    margin-top: -40px;
}
  }

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    height: 150vh;
}
`;
const Button = styled.button`
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
  margin-top: 100px;
}
`;

const TripDetailsPage = () => {
  const [ id, setId ] = useState(localStorage.getItem("id"));
  const [ tripDetails, setTripDetails ] = useState({});
  const [candidateTrip, setCandidateTrip] = useState([])
  const [approvedCandidate, setApproved] = useState()
  const navigate = useNavigate();
  useProtectedPage();

  useEffect(() => {getCandidate()}, []);


  const getCandidate = () => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/:natalia-amaral-hopper/trip/${id}`;
    axios
      .get(`${url}`, {
        headers: {
          auth: localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTripDetails(res.data.trip);
        setCandidateTrip(res.data.trip.candidates);
        setApproved(res.data.trip.approved);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  
  const putApprovedCandidate = (candidateId) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/natalia-amaral-hopper/trips/${id}/candidates/${candidateId}/decide`
    const body = {
      approve: true,
    }
    axios.put(url, body, {
      headers: {
        auth: localStorage.getItem('token')
      }
    })
    .then((res) => {
      getCandidate()
    })
    .catch((err) => {
      alert('Candidato não foi aprovado!')
      console.log(err.response);
    })
  }
  
  const putDisaPproveCandidate = (reproveId) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/natalia-amaral-hopper/trips/${id}/candidates/${reproveId}/decide`
    const body = {
      approve: false
    }
    axios.put(url, body, {
      headers: {
        auth: localStorage.getItem('token')
      }
    })
    .then((res) => {
      alert("Removido na viagem!")
      getCandidate();
    })
    .catch((err) => {
      alert('Candidato não foi aprovado!')
    })
  
  }
  


  return(
    <Div>
      <header>
          <h3>Lista de Viagem</h3>
      </header>    
            <div>
              <div>
                <p><strong>Nome: </strong>{tripDetails.name}</p>
                <p><strong>Descrição: </strong>{tripDetails.description}</p>
                <p><strong>Planeta: </strong>{tripDetails.planet}</p>
                <p><strong>Duração: </strong>{tripDetails.durationInDays}</p>
                <p><strong>Data: </strong>{tripDetails.date}</p>
              </div>
            </div>
        <div>
          <h3>Lista de candidatos Pendentes</h3>
            <div>
            
            {candidateTrip && candidateTrip.length > 0 ? candidateTrip.map((item) => {
              return <div key={item.id}>
            <p><strong>Nome: </strong>{item.name}</p>
            <p><strong>Descrição: </strong>{item.applicationText}</p>
            <p><strong>Profissão: </strong>{item.profession}</p>
            <p><strong>Idade: </strong>{item.age}</p>
            <p><strong>País: </strong>{item.country}</p>
          <div>
          <button onClick={()=>{putApprovedCandidate(item.id)}}><FaUserPlus/></button>
          
          <button onClick={()=>{putDisaPproveCandidate(item.id)}}><BsFillPersonXFill/></button>
          </div>
          </div>}) : <p>Não tem candidatos pendente</p>}
            
            </div>
          </div>

          <div>
          <h3>Lista de candidatos Aprovados</h3>
            <div>
              {approvedCandidate && approvedCandidate.length > 0 ? approvedCandidate.map((item) => {
                return <div key={item.id}>
              <p><strong>Nome: </strong>{item.name}</p>
              <p><strong>Idade: </strong>{item.age}</p>
              <p><strong>País: </strong>{item.country}</p>
            </div>}) : <p>Não tem candidatos pendente</p>}
          </div>
      </div>
      <Button onClick={() => navigate("/login")}>Logout <IoIosLogOut/></Button>
  </Div>
  );
}
export default TripDetailsPage;

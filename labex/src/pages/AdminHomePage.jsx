import React from 'react'
import { useNavigate } from 'react-router-dom'
import useProtectedPages from '../hooks/useProtectedPages'
import { deleteTrip, useGetTrips } from '../hooks/useRequestApi'
import {IoTrashSharp} from 'react-icons/io5'
import {IoIosLogOut,} from 'react-icons/io'
import {BsFillPlusCircleFill} from "react-icons/bs"
import {BsFillHouseFill} from "react-icons/bs"
import styled from 'styled-components'

const DivList = styled.div`
  text-align:center;
  position: relative;
  top: 5%;
  overflow-y: scroll;
  width: 50vw;
  border:solid 1px white;
  height: 60vh;

  button{
  height: 4vh;
  width: 3vw;
  border-color: white;
  border-radius: 10em;
  border: 1px solid;
  margin: 20px; 
  padding-left: 2em;
  padding-right: 3em;
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
    width: 5vw
}
  }

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 90vw;
    margin-top: 45px;
    margin-bottom: -45px;
}
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items:center;
  justify-content: center;
  background-image:url(https://files.lafm.com.co/assets/public/2019-11/un_astronauta_en_el_espacio_5_0.jpg);
  background-size: cover;
  height: 100vh;
  color: white;
`;

const DivFilho = styled.div`  
  text-align: center;
  align-items: center;
  margin-top: 45px ;

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
    width: 50vw;
    padding-bottom: 0px;
    padding-top: 5px;
}
  }
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  padding-bottom: 900px;
  padding-left: 40px;
  flex-direction: column;
  align-items: center;
  color: white;

  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    padding-bottom: 650px;
    padding-top: 5px;
}
`;


const AdminHomePage = () => {
useProtectedPages()
const navigate = useNavigate()
const trips = useGetTrips()

return (
  <Div>
      <Header>
      <h1>Painel Administrativo</h1>
      </Header>
    
    <DivList>
      {trips.length !== 0 ? (
        trips.map(trip => {
          return (
            <div key={trip.id}>
              <div onClick={() => {navigate(`/admin/trips/${trip.id}`)}}>
              {' '}
              <strong></strong> {trip.name}
              </div>
              <button onClick={() => deleteTrip(trip.id)}><IoTrashSharp/></button>
            </div>
          )
        })
      ) : (
        <p> Não há viagens disponíveis </p>
      )}
    </DivList>
    <DivFilho>
      <button onClick={() => navigate("/")}>Home <BsFillHouseFill/></button>
      <button onClick={() => navigate('/admin/trips/create')}>Criar nova viagem <BsFillPlusCircleFill/></button>
      <button onClick={() => navigate("/login")}>Logout <IoIosLogOut fontSize={20}/></button>
    </DivFilho>
  </Div>
 );
}

export default AdminHomePage;
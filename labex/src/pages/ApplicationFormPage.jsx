import React, { useState } from 'react'
import { countries } from '../hooks/Countries';
import {BsListUl} from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import {IoIosArrowDropdown} from 'react-icons/io'
import styled from 'styled-components';
import useForm from '../hooks/UseForm';
import { applyToTrip, useGetTrips } from '../hooks/useRequestApi';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  flex-direction:column;
  background-image: url(https://paginanews.com.br/wp-content/uploads/2021/04/capturadepantall-5d810b602e90bd9af8d5719262f312fe-1200x600.jpg);
  background-size: cover;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  padding-bottom: 600px;
  color: white;
`;

const Form = styled.form`
 
  input{
    display: flex;
    flex-direction:column;
    background-color: #d6d0d0;
    height: 4vh;
    width: 21vw;
    border-color: white;
    border-radius: 1em;
    border: 1px solid;

    
  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 96vw
}
  }

  select{
    display: flex;
    flex-direction:column;
    background-color: #d6d0d0;
    height: 4vh;
    width: 21vw;
    border-color: white;
    border-radius: 1em;
    border: 1px solid;

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 96vw
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

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    height: 8vh;
    margin-top: 80px;
}
  }
`;

const ApplicationFormPage = () => {

  const { form, onChange, cleanFields } = useForm({
    applicationText: '',
    profession: '',
    country: '',
    age: '',
    name: '',
    id: ''
  });

  const navigate = useNavigate()
  const trips = useGetTrips()

  const register = event => {
    event.preventDefault()
    applyToTrip(form)
    cleanFields()
  }
  
  return (
    <Div>
      <Header>
      <h3>Se inscreva para uma viagem</h3>
      </Header>
      <Form onSubmit={register}>
        <select defaultValue="" onChange={onChange} name={'nome'}>
          <option value="" disabled>
            Escolha uma Viagem
          </option>
          {trips.map(nome=>{
          return <option key={nome.id} value={nome.id}>{nome.name}</option>
          })}
        </select><br/>
        <input
          placeholder={'Nome'}
          name={'name'}
          value={form.name}
          onChange={onChange}
          pattern={'^.{3,}$'}
          title={'O nome deve ter no mínimo 10 caracteres'}
          required
        /><br/>
        <input
          placeholder={'Idade'}
          type={'number'}
          name={'age'}
          value={form.age}
          onChange={onChange}
          required
          min={18}
        /><br/>
        <input
          placeholder={'Texto de Candidatura'}
          name={'applicationText'}
          value={form.applicationText}
          onChange={onChange}
          required
          pattern={'^.{30,}$'}
          title={'O texto deve ter no mínimo 30 caracteres'}
        /><br/>
        <input
          placeholder={'Profissão'}
          name={'profession'}
          value={form.profession}
          onChange={onChange}
          required
          pattern={'^.{10,}$'}
          title={'A profissão deve ter no mínimo 10 caracteres'}
        /><br/>
        <select
          placeholder={'País'}
          name={'country'}
          value={form.country}
          onChange={onChange}
          required
        >
          <option value={''} disabled>
            Escolha um País
          </option><br/>
          {countries.map(country => {
            return (
              <option value={country} key={country}>
                {country}
              </option>
            )
          })}
        </select>
        <DivFilho>
          <button onClick={()=> navigate("/trips/list")}>Ver viagens <BsListUl/></button>
          <button type={'submit'}>Enviar <IoIosArrowDropdown fontSize={20}/></button>
        </DivFilho>
      </Form>
    </Div>
  )
}

export default ApplicationFormPage;
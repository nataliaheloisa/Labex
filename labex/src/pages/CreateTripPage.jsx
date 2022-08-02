import React from 'react'
import { useNavigate } from 'react-router-dom';
import { planets } from '../hooks/Planets';
import {BsFillHouseFill} from "react-icons/bs"
import {BsFillPlusCircleFill} from "react-icons/bs"
import styled from 'styled-components';
import useForm from '../hooks/UseForm';
import useProtectedPage from '../hooks/useProtectedPages';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  flex-direction:column;
  background-image:url(https://www.eusemfronteiras.com.br/wp-content/uploads/2019/03/44449792_m.jpg);
  background-size: cover;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  position: absolute;
  padding-bottom: 470px;
  padding-left: 15px;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-items:center;
  justify-content: center;
  flex-direction:column;

  input{
    background-color: #d6d0d0;
    height: 3vh;
    width: 20vw;
    border-color: #c07575;
    border-radius: 5em;
    border: 1px solid;

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 96vw;
    
}
  }

  select{
    background-color: #d6d0d0;
    height: 3vh;
    width: 20vw;
    border-color: #c07575;
    border-radius: 5em;
    border: 1px solid;

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 96vw;
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
    width: 85px;
    padding-left: 8px ;
}
  }
`;

const CreateTripPage = () => {
  const navigate = useNavigate();
  useProtectedPage();

  const { form, onChange, cleanFields } = useForm({
    name: "",
    description: "",
    planet: "",
    durationInDays: "",
    date:""
  });

  const date = new Date()
  const minDate =
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).substr(-2) +
    '-' +
    ('0' + date.getDate()).substr(-2)

  const submitCreationTrip = event => {
    event.preventDefault()
    CreateTripPage(form, cleanFields)
    alert('Viagem criada com sucesso!', form)
  };

  return (
    <Div>
      <Header>
      <h1>Criar viagem</h1>
      </Header>
      <Form onSubmit={submitCreationTrip}>
        <input
          name={"name"}
          value={form.name}
          placeholder="Nome da viagem"
          onChange={onChange}
          required
          pattern={"^.{3,}"}
          title={"O nome deve ter no mínimo 3 letras"}
          /><br/>
        <select
          name={"planet"}
          value={form.planet}
          placeholder="Planeta"
          onChange={onChange}
          required
          >
          <option value={''} disabled>
            Escolha um Planeta
          </option>
          {planets.map(planet => {
            return (
              <option value={planet} key={planet}>
                {planet}
              </option>
            )
          })}
          </select><br/>
          <input
          placeholder={'Data'}
          type={'date'}
          name={'date'}
          value={form.date}
          onChange={onChange}
          required
          min={minDate}
         /><br/>
         <input
          placeholder={'Descrição'}
          name={'description'}
          value={form.description}
          onChange={onChange}
          required
          pattern={'^.{30,}$'}
          title={'O nome deve ter no mínimo 30 caracteres'}
         /><br/>
         <input
          placeholder={'Duração em dias'}
          type={'number'}
          name={'durationInDays'}
          value={form.durationInDays}
          onChange={onChange}
          required
          min={50}
         />
        <DivFilho>
          <button onClick={() => navigate("/")}>Home <BsFillHouseFill/></button>
          <button type={'submit'} >Criar <BsFillPlusCircleFill/></button>
          <button onClick={() => navigate("/admin/trips/:id")}> Detalhes </button>
        </DivFilho>
      </Form>
    </Div>
  );
}

export default CreateTripPage;
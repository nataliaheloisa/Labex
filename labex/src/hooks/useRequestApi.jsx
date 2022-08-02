import axios from "axios";
import { useState, useEffect } from 'react'
import { BASE_URL } from "../services/Url";


export const getTrips = async () => {
  try{
    const { data } = await axios.get(`${BASE_URL}/trips`)
    return data.trips;
  }catch (error){
    console.log(error.response);
  }
}  
export function useGetTrips() {
  const [trips, setTrips] = useState([])
  const URL = `${BASE_URL}/trips`

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setTrips(response.data.trips)
      })
      .catch(error => {
        alert(error.response.data.message)
        console.log(error)
      })
  }, [trips])

  return trips
}

export const applyToTrip = form => {
  const URL = `${BASE_URL}/trips/${form.trip}/apply`
  const body = {
    name: form.name,
    age: form.age,
    applicationText: form.applicationText,
    profession: form.profession,
    country: form.country
  }

  axios
    .post(URL, body)
    .then(() => {
      alert('Inscrição feita com sucesso')
    })
    .catch(error => {
      alert(error.response.data.message)
    })
}

export const createTrip = (body, clear) => {
  const URL = `${BASE_URL}/trips/`
  const headers = {
    headers: { auth: localStorage.getItem('token') }
  }

  axios
    .post(URL, body, headers)
    .then(() => {
      alert('Viagem adicionada com sucesso!')
      clear()
    })
    .catch(err => console.log(err))
}


export const decideCandidate = (tripId, candidateId, decision, getTripDetails) => {
  const body = {
      approve: decision
  }

  axios.put(`${BASE_URL}/trips/${tripId}/candidates/${candidateId}/decide`, body, {
      headers: {auth: localStorage.getItem("token")}
  })
  .then(() => {
      alert("Decisão registrada com sucesso!")
      getTripDetails()
  })
  .catch((err) => alert(err.response.data.message))
}
 
export const deleteTrip = id => {
  const URL = `${BASE_URL}/trips/${id}`
  const headers = {
    headers: { auth: localStorage.getItem('token') }
  }

  axios
    .delete(URL, headers)
    .then(() => {
      window.confirm('Deseja realmente excluir essa viagem?')
    })
    .catch(error => {
      alert(error.response.data.message)
    })
}
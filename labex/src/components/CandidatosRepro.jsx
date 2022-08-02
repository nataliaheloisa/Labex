import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/Url'


const CandidatosRepro = (props) => {
  const candidates = props.trip.candidates


  const decideCandidate = (id, bool) => {
    const URL = `${BASE_URL}/trips/${props.trip.id}/candidates/${id}/decide`
    const body = { approve: bool }

    axios
      .put(URL, body, props.headers)
      .then(() => {
        if (bool) {
          alert('Candidato aceito')
        } else {
          alert('Candidato recusado')
        }
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }

  return (
    <div>
      {candidates ? (
        candidates.map(candidate => {
          return (
            <div className="lista-de-candidatos" key={candidate.id}>
              <p>
                <strong>Nome:</strong> {candidate.name}{' '}
              </p>
              <p>
                <strong>Idade:</strong> {candidate.age}{' '}
              </p>
              <p>
                <strong>Profissão:</strong> {candidate.profession}{' '}
              </p>
              <p>
                <strong>País:</strong> {candidate.country}
              </p>
              <p>
                <strong>Texto de Candidatura:</strong>{' '}
                {candidate.applicationText}
              </p>

              <div>
                <button
                  onClick={() => decideCandidate(candidate.id, true)}
                >
                  Aprovar
                </button>

                <button
                  onClick={() => decideCandidate(candidate.id, false)}
                >
                  Reprovar
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <p>Não há Candidatos pendentes</p>
      )}
    </div>
  );
}

export default CandidatosRepro;
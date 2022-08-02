import React from 'react'

const CandidatosAprov = (props) => {
  const candidates = props.trip.approved

  return (
    <div>
      {candidates ? (
        candidates.map(candidate => {
          return (
            <div key={candidate.id}>
              <p>
                <strong>Nome:</strong> {candidate.name}{' '}
              </p>
            </div>
          )
        })
      ) : (
        <p>Não há candidatos aprovados</p>
      )}
    </div>
  );
}

export default CandidatosAprov;
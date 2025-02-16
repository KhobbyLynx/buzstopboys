import React from 'react'

interface Params {
  patronID: string;
}

function PatronDetails({params}: {params: Params}) {
  return (
    <div>
      {`${params.patronID} details`}
    </div>
  )
}

export default PatronDetails
import React, { useState} from 'react'

const Query = ({pingPong, isQuery}) => {
const [name, setName] = useState();
const [args, setArgs] = useState();
const [cache, setCache] = useState(false);
const [custom, setCustom] = useState(null);
const [poll, setPoll] = useState(1);
    
const handleChange = (e,fn) => { fn(e.target.value)}
const handleCheckboxChange = event => {
    setCache(!cache)
}


  return (
    <>
    {isQuery ?
      <>
    <h3>Query</h3>
    <form onSubmit={(e)=>{pingPong(e, {name, args, cache, custom, poll})}}>
  <label>
    Query Name:
    <input type="text" name="query name" value={name} onChange={(e)=>handleChange(e, setName)}/>
  </label>
   <label>
    Args:
    <input type="text" name="args" onChange={(e)=>handleChange(e,setArgs)}/>
  </label>
   <label>
    Cache:
    <input type="checkbox" name="cache" onChange ={(e)=> handleCheckboxChange()}/>
  </label>
   <label>
    Custom Response:
    <input type="text" name="custom" onChange={(e)=>handleChange(e,setCustom)}/>
  </label>
  <label>
    Poll:
    <input type="text" name="poll" onChange={(e)=>handleChange(e,setPoll)}/>
  </label>
  <input type="submit" value="Submit" />
</form>
</>
:
<>
<h3>Mutation</h3>
<form onSubmit={(e)=>{pingPong(e, {name, args, cache, custom, poll})}}>
  <label>
    Query Name:
    <input type="text" name="query name" value={name} onChange={(e)=>handleChange(e, setName)}/>
  </label>
   <label>
    Args:
    <input type="text" name="args" onChange={(e)=>handleChange(e,setArgs)}/>
  </label>
   <label>
    Cache:
    <input type="checkbox" name="cache" onChange ={(e)=> handleCheckboxChange()}/>
  </label>
   <label>
    Custom Response:
    <input type="text" name="custom" onChange={(e)=>handleChange(e,setCustom)}/>
  </label>
  <label>
    Poll:
    <input type="text" name="poll" onChange={(e)=>handleChange(e,setPoll)}/>
  </label>
  <input type="submit" value="Submit" />
</form>
</>
}
</>
    
  )
}

export default Query
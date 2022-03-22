import React, { useState, useRef} from 'react'

const Query = ({pingPong, isQuery, trans}) => {
const [name, setName] = useState();
const [args, setArgs] = useState(null);
const [cache, setCache] = useState(false);
const [custom, setCustom] = useState(null);
const [poll, setPoll] = useState(1);
let argsPlaceHolder = useRef(null);
    
const handleChange = (e,fn) => { fn(e.target.value)}
const handleCheckboxChange = event => {
    setCache(!cache)
}
const handleArgsChange = (e) => { 
  setName(e.target.value)
  console.log(e.target.value)
  if(trans.gql[e.target.value]){
      const pattern = /[$].+[)]/gm;
			let queryString = pattern.exec(trans.gql[e.target.value])
      console.log(typeof queryString[0])
      return argsPlaceHolder.current = queryString[0].slice(0, queryString[0].length-1)
      
    }
    argsPlaceHolder.current = null
}


  return (
    <>
    {isQuery ?
      <>
    <h3>Query</h3>
    <form onSubmit={(e)=>{pingPong(e, {name, args, cache, custom, poll})}}>
  <label>
    Query Name:
    <input type="text" name="query name" value={name} placeholder='getUsers' onChange={(e)=>handleArgsChange(e)}/>
  </label>
   <label>
    Args:
    <input type="text" name="args" value={args} placeholder={argsPlaceHolder.current ? argsPlaceHolder.current : 'enter args, ex) name: value'} onChange={(e)=>handleChange(e, setArgs)}/>
  </label>
   <label>
    Cache:
    <input type="checkbox" name="cache" onChange ={(e)=> handleCheckboxChange()}/>
  </label>
   <label>
    Custom Response:
    <input type="text" name="custom" placeholder='age height firstName' onChange={(e)=>handleChange(e,setCustom)}/>
  </label>
  <label>
    Poll:
    <input type="text" name="poll" placeholder='1' onChange={(e)=>handleChange(e,setPoll)}/>
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
   {/* <label>
    Cache:
    <input type="checkbox" name="cache" onChange ={(e)=> handleCheckboxChange()}/>
  </label> */}
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
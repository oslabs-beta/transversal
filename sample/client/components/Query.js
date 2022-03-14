import React from 'react'

const Query = () => {
const [name, setName] = useState();
const [args, setArgs] = useState();
const [cahce, setCache] = useState();
const [custom, setCustom] = useState(null);
const [poll, setPoll] = useState(1);
    
  return (
    <>
    <h1>Query Tool</h1>
    <form>
  <label>
    Query Name:
    <input type="text" name="query name" />
  </label>
   <label>
    Args:
    <input type="text" name="args" />
  </label>
   <label>
    Cache:
    <input type="checkbox" name="cache" />
  </label>
   <label>
    Custom Response:
    <input type="text" name="custom" />
  </label>
  <label>
    Poll:
    <input type="text" name="poll" />
  </label>
  <input type="submit" value="Submit" />
</form>
    </>
  )
}

export default Query
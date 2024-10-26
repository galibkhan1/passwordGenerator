import { useCallback, useEffect, useState, useRef} from 'react'



function App() {
  const [length , setlength] = useState(8);
  const [numberAllowed , setnumber] = useState(false)
  const [characterAllowed, setcharacter] = useState(false)
  const [password, setpassword] = useState()
  //use to copy the value 
  const passwordRef =useRef(null)
  const passwordGenerator =  useCallback(()=>{
    let pass = ""
    let strr ="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) strr +="0123456789"
    if(characterAllowed) strr +="!@#$%&*^[]{}~"
    
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * strr.length + 1)
      pass += strr.charAt(char)
    }
    setpassword(pass)
    
  } ,[length , numberAllowed, characterAllowed, setpassword])
 const copyPasswordtoClipboard = useCallback(()=>{
  window.navigator.clipboard.writeText(password)
 },
[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-gray-800 bg-gray-400 justify-center'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3 m-x2'
        placeholder='password'
        readOnly
        ref ={passwordRef}
        />
        <button 
        onClick={copyPasswordtoClipboard}
        className='outline-none text-white px-3 py- shrink-0 bg-blue-500 hover:bg-red-400 hover:text-black '>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input type="range" 
          min={8}
          max ={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>{
            setlength(e.target.value)
          }}
      />
      <label>Length: {length}</label>
        </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setnumber((prev) => !prev)
              }}
              />
              <label>Number</label>

            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={characterAllowed}
              id="numberInput"
              onChange={()=>{
                setcharacter((prev) => !prev)
              }}
              />
              <label>Character</label>

            </div>
      </div>
      </div>
    </>
  )
}

export default App
 
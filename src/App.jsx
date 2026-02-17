import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [userData, setuserData] = useState([]);


  const [index, setindex] = useState(1);

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=18`)
    setuserData(response.data)
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className='text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</h3>;

  if(userData.length > 0){
    printUserData = userData.map(function (elem, idx){

      return <div key={idx} target ='_blank'>
        <a href={elem.url}>
        <div className='h-40 w-44 overflow-hidden rounded-xl'>
          <img className= 'h-full  w-full object-cover' src={elem.download_url} alt = "" />
        </div>
        <h2 className='font-bold text-lg'>{elem.author}</h2>
        </a>
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen text-white'>
      <div className='flex flex-wrap gap-5 ml-50 mt-10'>
        {printUserData}
      </div>

      <div className='flex justify-center items-center p-4 gap-10 mt-2'>
        <button 
        style={{opacity:index == 1 ? 0.5 : 1}}
        className='bg-amber-400 text-black cursor-pointer active:scale-95 rounded px-4 py2'
        onClick={() => {
          if(index > 1){
            setindex(index - 1)
            setuserData([])
          }
        }}
        >
          Prev
          </button>
          <h2>Page {index}</h2>
        <button className='bg-amber-400 text-black cursor-pointer active:scale-95 rounded px-4 py2'
        onClick={ () =>{
          setindex(index + 1)
          setuserData([])
        }}
        >
          Next
          </button>
          
      </div>
    </div>
  )
}

export default App

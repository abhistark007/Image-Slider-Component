
import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from 'react-icons/bs'

function App() {
  
  const api_url="https://picsum.photos/v2/list?page=1&limit=10";

  const [images,setImages]=useState(null);
  const [currentSlide,setCurrentSlide]=useState(0);
  const [errorMsg,setErrorMsg]=useState(null);
  const [loading,setLoading]=useState(false);

  async function fetchImages(){
    try{
      setLoading(true);
      const response=await fetch(api_url);
      const data=await response.json();
      if(data){
        setImages(data);
      }
      setLoading(false);
    }catch(e){
      setLoading(false);
      setErrorMsg(e.message);
    }
  }

  function handleNext(){
    setCurrentSlide(currentSlide===images.length-1?0:currentSlide+1)
  }
  function handlePrevious(){
    setCurrentSlide(currentSlide===0?images.length-1:currentSlide-1)
  }

  useEffect(()=>{
    fetchImages();
  },[])

  if(loading){
    return <div>Loading data please wait</div>
  }

  if(errorMsg!==null){
    return <div>Error Occurred ! {errorMsg}</div>
  }

  return (
   <div className='flex relative justify-center gap-3 items-center w-full
   h-[450px]'>
    <div className='relative justify-center items-center flex w-[600px]'>
    <BsArrowLeftCircleFill 
    onClick={handlePrevious}
    className='absolute drop-shadow-md left-[1rem] w-[2rem] h-[2rem] text-white'/>
    {
      images && images.length ?
      images.map((imgItem,index)=>(
        <img key={imgItem.id} 
        src={imgItem.download_url} 
        alt=""  
        // className='rounded-[0.5rem] w-full h-full'
        className={currentSlide===index?" rounded-[0.5rem] w-full h-full":"hidden"}
        />
      )):null
    }
    <BsArrowRightCircleFill 
    onClick={handleNext}
    className='absolute drop-shadow-md right-[1rem] w-[2rem] h-[2rem] text-white'/>
    <span className='absolute bottom-[1rem] flex gap-3'>
      {
        images && images.length?
        images.map((_,index)=><button
        key={index}
        // className='bg-white h-[15px] w-[15px] rounded-full border-none'
        className={currentSlide===index?"bg-purple-600 h-[15px] w-[15px] rounded-full border-none":"bg-white h-[15px] w-[15px] rounded-full border-none"}
        ></button>):null
      }
    </span>
    </div>
   </div>
  )
}

export default App

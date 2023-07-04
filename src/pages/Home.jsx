import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [tittle,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [loading,setLoading]=useState(false);
  const [tasks,setTasks]=useState([]);
  const [refresh,setRefresh]=useState(false);
  const  {isAuthenticated}=useContext(Context);
  

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
     try {
      
      const {data}=await axios.post(`${server}/task/new`,{
        tittle,description,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        },
      })
       console.log("suceess");
      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(prev=>!prev);
     } catch (error) {
          toast.error(error.response.data.message)
          setLoading(false);
     }
  }

  useEffect(() => {
   axios.get(`${server}/task/my`,{
    withCredentials:true
   }).then((res)=>{
          setTasks(res.data.task);
   }).catch((error)=>{
      toast.error(error.response.data.message)
   })
  }, [refresh])

if(!isAuthenticated)  return <Navigate to={"/login"}/> 


  const updateHandler=async(id)=>{
    try {
     const {data} = await axios.put(`${server}/task/${id}`,
       {},
       {
        withCredentials:true,
       })
       toast.success(data.message)
      setRefresh(prev=>!prev);

    } catch (error) {
          toast.error(error.response.data.message)
    }

  }

  const deleteHandler=async(id)=>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,
        {
         withCredentials:true,
        })
        toast.success(data.message)
      setRefresh(prev=>!prev);
     } catch (error) {
           toast.error(error.response.data.message)
     }
 
  }
  

  return (
    <div className='container'>

      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
            <input required value={tittle} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Title'></input>
            <input required value={description} onChange={(e) => setDescription(e.target.value)} type='text' placeholder='Description'></input>
            <button disabled={loading} type='submit'>Add Task</button>
            
          </form>
        </section>
      </div>

      <section className='todosContainer'>
        {
          tasks.map((i)=>(
            <TodoItem 
            title={i.tittle} 
            description={i.description} 
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
            />
          ))
        }
      </section>
    </div>
  )
}

export default Home
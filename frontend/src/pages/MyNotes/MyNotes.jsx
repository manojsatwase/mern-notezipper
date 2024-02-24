import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import MainHeading from "../../components/MainHeader/MainHeading"
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import axios from 'axios';

import "./MyNotes.css";

const MyNotes = () => {
  const [notes,setNotes] = useState([]);
  // const [toggle,setToggle] = useState(false);
  const [count,setCount] = useState(0);

  const deleteHandler = id=>{
    if(window.confirm("Are You Sure ?")){
      const deleteNotes = notes.filter(note=>note._id !== id);
      setNotes(deleteNotes);
    }
  }
// const handleToggle = () => setToggle(prevState=>!prevState);

const fetchNotes = async () => {
   try{
    const {data} = await axios.get('/api/notes');
    setNotes(data);
   }catch(err){
    console.log(err);
   }
}

  useEffect(()=>{
    fetchNotes();
  },[]);
 
  return (
    <MainHeading title="Welcome Back Manoj Satwase...">
        <Link to="createnotes">
            <Button style={{marginLeft:10,marginBottom:6}} size="lg">
                Create New Note
            </Button>
         </Link>
         {!notes.length && <div>Loading...</div>}
            {
              notes.map(note=>(
              <Accordion key={note._id}>
              <Accordion.Item eventKey="0">
             <Card style={{margin:10}}>
              <Card.Header style={{display:'flex'}}>
                 <span style={{
                  color:"black",
                  textDecoration:"none",
                  flex:1,
                  cursor:"pointer",
                  alignSelf:"center",
                  fontSize:18
                 }}>
                   <Accordion.Header as={Card.Text} variant="link">
                   {note.title}
                   </Accordion.Header>
                  </span>
              <div>
                <Button href={`/note/${note._id}`}>
                    Edit
                </Button>
                <Button
                variant="danger" 
                className="mx-2"
                onClick={()=>deleteHandler(note._id)} 
                >Delete</Button>
              </div>
              </Card.Header>
                <Accordion.Body>
              <Card.Body>
                  <h4>
                    <Badge bg="success" text="light">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus distinctio voluptatum at itaque, voluptatem mollitia autem dignissimos
                     dolorem ipsum molestias eius sequi ab quia praesentium. 
                     Sunt impedit aperiam voluptatem. Reprehenderit?</p>
                     <footer>
                     <title className="blockquote-footer" title="Source Title">Created On - date</title>
                     </footer>   
                </blockquote>
              </Card.Body>
              </Accordion.Body>
              
            </Card>
            </Accordion.Item>
             </Accordion>
              ))
            }
    </MainHeading>
  )
}

export default MyNotes
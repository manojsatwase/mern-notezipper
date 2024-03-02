import { useEffect, } from "react";
import {Link, useNavigate} from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";

import "./MyNotes.css";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../../constant";
import { useCallAPI } from "../../customHooks/useCallAPI";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
  // const [toggle,setToggle] = useState(false);
  const userInfo = useSelector(state=>state.createUser?.userInfo);
  const searchText = useSelector(state => state.searchText.search);
 const navigate = useNavigate();


const {loading,error,fetchNotes,notes,notesId,deleteNoteAPI} = useCallAPI();
const createnote = useSelector(state=>state.noteCreate.createnote);

  const deleteHandler = id=>{
    if(window.confirm("Are You Sure ?")){
      // const deleteNotes = notes.filter(note=>note._id !== id);
      // setNotes(deleteNotes);
      deleteNoteAPI(id);
    } 
  }
// const handleToggle = () => setToggle(prevState=>!prevState);


useEffect(() => {
  fetchNotes();
}, [notesId]); // Only fetch notes when createnote changes

useEffect(() => {
  if (!userInfo) {
    navigate("/");
  }
}, [userInfo, navigate]); // Navigate to "/" only when userInfo changes

 const filteredNoteNotes = filteredNote => filteredNote.title.toLowerCase().includes(searchText?.toLowerCase())
 const reversedNotes = notes ? [...notes].reverse().filter(filteredNoteNotes) : [];

  return (
    <MainScreen title={`Welcome Back ${capitalize(userInfo?.name)}`}>
        <Link to="createnote">
            <Button style={{marginLeft:10,marginBottom:6}} size="lg">
                Create New Task
            </Button>
         </Link>
         {error && <ErrorMessage variant="danger">
           {error}
          </ErrorMessage>}
        
         {loading && <Loading/>}
            {
              reversedNotes?.map(note=>(
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
                <Button href={`/notes/${note._id}`}>
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
                  <p>{note?.content}</p>
                     <footer>
                     <title className="blockquote-footer" title="Source Title">Created On - {note?.createdAt.substring(0,10)}</title>
                     </footer>   
                </blockquote>
              </Card.Body>
              </Accordion.Body>
              
            </Card>
            </Accordion.Item>
             </Accordion>
              ))
            }
    </MainScreen>
  )
}

export default MyNotes
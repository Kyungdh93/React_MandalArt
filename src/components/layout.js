import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/layout.css';
import {useState, useEffect} from "react";
import {database} from '../components/firebase';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';

let cnt = 0;
let cnt1 = 0;
const Layout = () => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(database, "mandal");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            // console.log(data);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getUsers();
    }, []);
    
    const updateContent = async (id, argContent, argKey) => {
        const userDoc = doc(database, "mandal", id);
        const newFields = { [argKey]: argContent};
        // for(let i=0; i<users.length; i++){
        //     if(users[i].id === id){
        //         users[i][argKey] = argContent;
        //     }
        // }
        // setUsers({
        //     ...users
        // });
        // const data = await getDocs(usersCollectionRef);
        // setUsers(data.docs.map((doc) => ({ ...doc.data(), [argKey]: argContent})));

        await updateDoc(userDoc, newFields);
    }

    const on = async(argIdx, e) => {
        addClass(e);

        let contentText = '';
        const data = await getDocs(usersCollectionRef);
        for(let i=0; i<data.docs.length; i++){
            if(data.docs[i].id === argIdx.split(" ")[0]){
                if(data.docs[i]._document.data.value.mapValue.fields['content'+argIdx.split(" ")[1]] === undefined){
                    contentText = '';            
                }else{
                    contentText = data.docs[i]._document.data.value.mapValue.fields['content'+argIdx.split(" ")[1]].stringValue;            
                }
            }
        }

        document.getElementById("overlay").style.display = "block";
        document.getElementById("input1").value = contentText;
        document.getElementById("input1").hdnValue0 = argIdx.split(" ")[0];
        document.getElementById("input1").hdnValue1 = 'content'+argIdx.split(" ")[1];
        document.getElementById("input1").focus();
    }
    
    const off = (e) => {
        removeClass();
        updateContent(document.getElementById(e.target.id).hdnValue0, e.target.value, document.getElementById(e.target.id).hdnValue1);
        document.getElementById("overlay").style.display = "none";
    }

    const addClass = (e) => {
        e.target.classList.add('focus');
    }

    const removeClass = () => {
        const div = document.querySelectorAll('div');
        for(let i=0; i<div.length; i++){
            if(div[i].classList.contains('focus')){
                div[i].classList.remove('focus');
            }
        }
    }

    return(
        <>
        <div id="overlay">
            <input type="text" id="input1" onBlur={off}/>
        </div>
        <Container>
            <Row>
                    {/* {users.map((user) => {
                        const rendering = () => {
                            const result = [];
                            for(let i=0; i<Object.keys(user).length-1; i++){
                                result.push(<Col className="cell0" onClick={()=>on(user["id"]+" "+i)} key={user["id"]+i}>{user["content"+i]}</Col>);
                            }
                            return result;
                        };

                        return <Row key={cnt++}>{rendering()}</Row>
                    })} */}

                    {users.map((user) => {
                        return(
                        <Col key={cnt++} className='col0'>
                            <Row key={cnt1++}>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+0, e)} key={user["id"]+0}>{user["content"+0]}</Col>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+1, e)} key={user["id"]+1}>{user["content"+1]}</Col>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+2, e)} key={user["id"]+2}>{user["content"+2]}</Col>
                            </Row>
                            <Row key={cnt1++}>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+3, e)} key={user["id"]+3}>{user["content"+3]}</Col>
                                <Col className="cell1" onClick={(e)=>on(user["id"]+" "+4, e)} key={user["id"]+4}>{user["content"+4]}</Col>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+5, e)} key={user["id"]+5}>{user["content"+5]}</Col>
                            </Row>
                            <Row key={cnt1++}>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+6, e)} key={user["id"]+6}>{user["content"+6]}</Col>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+7, e)} key={user["id"]+7}>{user["content"+7]}</Col>
                                <Col className="cell0" onClick={(e)=>on(user["id"]+" "+8, e)} key={user["id"]+8}>{user["content"+8]}</Col>
                            </Row>
                        </Col>
                        )
                    })}
                <Col>
                    <Row>
                        <Col>7 of</Col>
                        <Col>8 of</Col>
                        <Col>9 of</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    );
}



export default Layout;
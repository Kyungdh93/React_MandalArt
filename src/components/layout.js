import {useState, useEffect} from "react";

import {database} from '../components/firebase';
import {collection, getDocs, updateDoc, doc, setDoc} from 'firebase/firestore';

import {useSelector} from 'react-redux';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './loading';

import '../css/layout.css';

let colCnt = 0;
let rowCnt = 0;
const Layout = () => {
    const [mData, setDatas] = useState([]);
    const [isOnline, setIsOnline] = useState(null);

    const getUserInfo = useSelector((state) => state);
    const test = getUserInfo.userUid === "" ? "mandal" : getUserInfo.userUid;
    console.log("test = ",test)
    
    const usersCollectionRef = collection(database, test);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            if(data.docs.length === 0){
                for(let k=0; k<3; k++){
                    let dataObj = {};
                    for(let i=0; i<9; i++){
                        dataObj['content'+i] = "";
                    }
                    // await setDoc(doc(database, test, "mandal"+k), {
                    //     content0: "",
                    //     content1: "",
                    //     content2: "",
                    //     content3: "",
                    //     content4: "",
                    //     content5: "",
                    //     content6: "",
                    //     content7: "",
                    //     content8: "",
                    // });
                    await setDoc(doc(database, test, "mandal"+k), dataObj);
                }
            }else{
                setDatas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            }
            setIsOnline({isOnline:true});
        };
        getUsers();
    }, [getUserInfo]);
    
    const updateContent = async (id, argContent, argKey) => {
        const userDoc = doc(database, test, id);
        const newFields = { [argKey]: argContent};
        // for(let i=0; i<users.length; i++){
        //     if(users[i].id === id){
        //         users[i][argKey] = argContent;
        //     }
        // }
        // setDatas({
        //     ...users
        // });
        // const data = await getDocs(usersCollectionRef);
        // setDatas(data.docs.map((doc) => ({ ...doc.data(), [argKey]: argContent})));

        await updateDoc(userDoc, newFields);
    }

    const openInput = async(cellInfo, e) => {
        addClass(e);

        let contentText = '';
        const data = await getDocs(usersCollectionRef);
        for(let i=0; i<data.docs.length; i++){
            if(data.docs[i].id === cellInfo.split(" ")[0]){
                if(data.docs[i]._document.data.value.mapValue.fields['content'+cellInfo.split(" ")[1]] === undefined){
                    contentText = '';            
                }else{
                    contentText = data.docs[i]._document.data.value.mapValue.fields['content'+cellInfo.split(" ")[1]].stringValue;            
                }
            }
        }

        document.getElementById("overlay").style.display = "block";
        document.getElementById("inputData").value = contentText;
        document.getElementById("inputData").hdnValue0 = cellInfo.split(" ")[0];
        document.getElementById("inputData").hdnValue1 = 'content'+cellInfo.split(" ")[1];
        document.getElementById("inputData").focus();
    }
    
    const closeInput = (e) => {
        removeClass();
        updateContent(document.getElementById(e.target.id).hdnValue0, e.target.value, document.getElementById(e.target.id).hdnValue1);
        document.getElementById("overlay").style.display = "none";
    }

    const keyDownInput = (e) => {
        if(e.key == "Enter"){
            closeInput(e);
        }else{
            return;
        }
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

    const makeRender = (argObj) => {
        const tmpArray = [["content0","content1","content2"],["content3","content4","content5"],["content6","content7","content8"]];
        return (
            tmpArray.map((v, idx) => {
                return(
                    <Row key={rowCnt++}>
                        <Col className="cell0" onClick={(e)=>openInput(argObj["id"]+" "+((idx*3)+0), e)} key={argObj["id"]+0}>{argObj["content"+((idx*3)+0)]}</Col>
                        {
                            (idx*3)+1 === 4 ? 
                            <Col className="cell1" onClick={(e)=>openInput(argObj["id"]+" "+((idx*3)+1), e)} key={argObj["id"]+1}>{argObj["content"+((idx*3)+1)]}</Col> :
                            <Col className="cell0" onClick={(e)=>openInput(argObj["id"]+" "+((idx*3)+1), e)} key={argObj["id"]+1}>{argObj["content"+((idx*3)+1)]}</Col>
                        }
                        <Col className="cell0" onClick={(e)=>openInput(argObj["id"]+" "+((idx*3)+2), e)} key={argObj["id"]+2}>{argObj["content"+((idx*3)+2)]}</Col>
                    </Row>
                )
            })
        )
    }

    if (isOnline === null) {
        return (
            <Loading></Loading>
        )
    }

    return(
        <>
        <div id="overlay">
            <input type="text" id="inputData" onBlur={closeInput} onKeyDown={keyDownInput}/>
        </div>
        <Container>
            <Row>
                {mData.map((mInfo) => {
                    return(
                    <Col key={colCnt++} className='col0'>
                        {makeRender(mInfo)}
                    </Col>
                    )
                })}
            </Row>
        </Container>
        </>
    );
}



export default Layout;
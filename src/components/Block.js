import {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import {database} from './Auth';
import {collection, getDocs, doc, setDoc} from 'firebase/firestore';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/block.css';
import Loading from './Loading';
import Popup from './Popup';

let colCnt = 0;
let rowCnt = 0;
let blockCnt = 0;
let data;
const Block = () => {
    const [mData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [popObj, setPopObj] = useState(null);
    const [isOpen, handlePopup] = useState(false);
    const storeInfo = useSelector((state) => state);
    const collectionName = storeInfo.userUid === "" ? "mandal" : storeInfo.userUid;
    const usersCollectionRef = collection(database, collectionName);

    useEffect(() => {
        const getUsers = async (_storeInfo) => {
            data = await getDocs(usersCollectionRef);
            if(data.docs.length < 9){
                for(let k=data.docs.length; k<9; k++){
                    let dataObj = {};
                    for(let i=0; i<9; i++){
                        dataObj['content'+i] = "";
                    }
                    await setDoc(doc(database, collectionName, "mandal"+k), dataObj);
                }
            }else{
                setData(data.docs.map(doc => {
                    return doc.id === _storeInfo.contentId ? { ...doc.data(), id: doc.id, [_storeInfo.contentName]: _storeInfo.contentValue } : { ...doc.data(), id: doc.id };
                }));
            }
            setIsLoading({isLoading:true});
        };
        getUsers(storeInfo);
        // WARINING 무시 : React Hook useEffect has missing dependencies 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeInfo]);

    const openPopup = async(cellInfo, e) => {        
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

        setPopObj({
            data0:contentText,
            data1:cellInfo.split(" ")[0],
            data2:'content'+cellInfo.split(" ")[1]
        })
        handlePopup(true);
    }

    const addClass = (e) => {
        e.target.classList.add('focus');
    }

    const createRow = (mObj) => {
        const contentArray = [["content0","content1","content2"],["content3","content4","content5"],["content6","content7","content8"]];
        return (
            contentArray.map((v, idx) => {
                return(
                    <Row key={(rowCnt++)}>
                        {
                            isCenterBlock(mObj["id"], v[0]) ? 
                                <Col className="coreGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+0), e)} key={mObj["id"]+0}>{mObj[v[0]]}</Col> :
                                <Col className="detailGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+0), e)} key={mObj["id"]+0}>{mObj[v[0]]}</Col>
                        }
                        {
                            isCenterBlock(mObj["id"], v[1]) ? 
                                <Col className="coreGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+1), e)} key={mObj["id"]+1}>{mObj[v[1]]}</Col> :
                                isCenterBlockContent(mObj["id"], v[1]) ? 
                                    <Col className="detailGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+1), e)} key={mObj["id"]+1}>{mObj[v[1]]}</Col> :
                                    isCenterContent(v[1]) ? 
                                        <Col className="coreGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+1), e)} key={mObj["id"]+1}>{mObj[v[1]]}</Col> :
                                        <Col className="detailGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+1), e)} key={mObj["id"]+1}>{mObj[v[1]]}</Col>
                        }
                        {
                            isCenterBlock(mObj["id"], v[2]) ? 
                                <Col className="coreGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+2), e)} key={mObj["id"]+2}>{mObj[v[2]]}</Col> :
                                <Col className="detailGoal" onClick={(e)=>openPopup(mObj["id"]+" "+((idx*3)+2), e)} key={mObj["id"]+2}>{mObj[v[2]]}</Col>
                        }
                    </Row>
                )
            })
        )
    }

    const isCenterBlockContent = (mObjId, contentNum) => {
        return (mObjId === "mandal4") && (contentNum === "content4") ? true : false;
    }

    const isCenterContent = (contentNum) => {
        return (contentNum === "content4") ? true : false;
    }

    const isCenterBlock = (mObjId, contentNum) => {
        return (mObjId === "mandal4") && (contentNum !== "content4") ? true : false;
    }

    const createBlock = () => {
        const rowArray = [];
        for(let k=0; k<3; k++){
            rowArray.push(
                <Row key={(blockCnt++)}>
                    {mData.map((mInfo, index) => {
                        if(index === k*3 || index === (k*3)+1 || index === (k*3)+2) return <Col key={colCnt++} className='goalBlock'>{createRow(mInfo)}</Col>
                    })}
                </Row>
            );
        }
        return rowArray;
    }

    return(
        <>
            {isLoading === false ? <Loading></Loading> : ""}
            {isOpen && <Popup dataObj={popObj} onClose={handlePopup}/>}
            <Container>{createBlock()}</Container>
        </>
    );
}

export default Block;
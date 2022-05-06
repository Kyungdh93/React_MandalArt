import {useState,useEffect} from "react";
import {database} from './Auth';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/block.css';
import store from "../store";
import Input from './Input';

let data;
const Popup = (dataObj) => {
    const [strLength, setLength] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [hdnValue0, setHdnValue0] = useState("");
    const [hdnValue1, setHdnValue1] = useState("");
    const getUserInfo = useSelector((state) => state);
    const storeInfo = getUserInfo.userUid === "" ? "mandal" : getUserInfo.userUid;
    const usersCollectionRef = collection(database, storeInfo);

    useEffect(() => {
        // console.log(dataObj)
        if(dataObj.dataObj !== null){
            setInputValue(dataObj.dataObj.data0);
            setHdnValue0(dataObj.dataObj.data1);
            setHdnValue1(dataObj.dataObj.data2);
            setLength(dataObj.dataObj.data0.length);
        } 

    }, [dataObj]);

    const updateData = async (argId, argContent, argKey) => {
        const userDoc = doc(database, storeInfo, argId);
        const newFields = { [argKey]: argContent};
        data = await getDocs(usersCollectionRef);

        await updateDoc(userDoc, newFields);
    }
    
    const closePopup = async (e) => {
        updateStore(e);
        updateData(hdnValue0, e.target.value, hdnValue1);
        if(isLinked()) updateStore2(e);
        dataObj.onClose(false);
    }

    const updateStore = (e) => {
        store.dispatch({
            type:'BLOCKDATA', 
            value:hdnValue0,
            value1:e.target.value,
            value2:hdnValue1
        });
    }

    const updateStore2 = (e) => {
        const strMandal = "mandal";
        const strContent = "content";
        const hdnValue2 = strMandal + hdnValue1.split(strContent)[1];
        const hdnValue3 = strContent + hdnValue0.split(strMandal)[1];
        setTimeout(() => {
            store.dispatch({
                type:'BLOCKDATA1', 
                value:hdnValue2,
                value1:e.target.value,
                value2:hdnValue3
            });
        }, 1000);

        updateData(hdnValue2, e.target.value, hdnValue3);
    }

    const isLinked = () => {
        if(hdnValue0 === "mandal4" && hdnValue1 !== "content4") return true;
        if(hdnValue0 !== "mandal4" && hdnValue1 === "content4") return true;
        return false;
    }

    const keyUpInput = (e) => {
        setLength(length => e.target.value.length);
    }

    const keyDownInput = (e) => {
        if(e.key === "Enter" || e.key === "Escape"){
            closePopup(e);
        }else{
            return;
        }
    }

    return(
        <div className="overlay" style={{display:"block"}}>
            <Input className="inputData" focus={true} value={inputValue} blur={closePopup} keydown={keyDownInput} keyup={keyUpInput} maxlength={20}></Input>
            <Input className="inputData1" value="20글자 미만으로 입력해주세요." readonly={true}></Input>
            <Input className="inputData2" value={strLength} readonly={true}></Input>
        </div>
    );
}

export default Popup;
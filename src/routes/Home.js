import Block from "../components/Block";
import Main from "./Main";
import {useSelector} from 'react-redux';
import {useState, useEffect} from "react";

const Home = () => {
    const getUserInfo = useSelector((state) => state);
    const [isLogon, setLogon] = useState(false);

    useEffect(() => {
        const getUsers = async (_getUserInfo) => {
            setLogon(_getUserInfo.userLogon);
        };
        getUsers(getUserInfo);
    }, [getUserInfo]);

    return(
        <>
            {isLogon ? <Block></Block> : <Main></Main> }
        </>
    );
};

export default Home;
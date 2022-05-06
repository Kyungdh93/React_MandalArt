import {createStore} from 'redux';

const reducer = (state, action) =>{
    if(state === undefined){
        return {userName:"", userLogon:false, userUid:""}
    }
    if(action.type === 'USERAUTH'){
        return {...state, userName:action.value, userLogon:action.value1, userUid:action.value2};
    }
    else if(action.type === 'BLOCKDATA'){
        return {...state, contentId:action.value, contentValue:action.value1, contentName:action.value2};
    }
    else if(action.type === 'BLOCKDATA1'){
        return {...state, contentId:action.value, contentValue:action.value1, contentName:action.value2};
    }
    return state;
}
let store = createStore(reducer);

export default store;
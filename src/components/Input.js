import { useEffect, useRef, useState } from "react";

const Input = (inputObj) => {
    const [passwordHide, setPasswordHide] = useState(true);

    const {children, className, placeholder, change, maxlength, readonly, hidden, type, keyup, keydown, blur, value, focus } = inputObj;
    
    const inputFocus = useRef(null);
    useEffect(() => {
        if(focus === true) inputFocus.current.focus();
    },[inputObj])

    const autoSkip = (e) => {
        if(typeof(maxlength) != 'undefined'){
            var target = e.target;
            var maxLength = maxlength;
            var myLength = target.value.length;
            if (myLength >= maxLength) {
                var next = target;
                while ((next = next.nextSibling)) {
                    if (next === null)
                        break;
                    if (typeof(next.tagName) === 'undefined')
                        break;
                    if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                    }
                }
            }
        }
    }

    const inputKeyUp = (parentEvent, inputType, e) => {
        if(e.code === "Tab" || e.code === "ShiftLeft") {
            return;
        }

        autoSkip(e);

        if(typeof(parentEvent) !== "undefined")
        parentEvent(e);
    }

    const inputBlur = (parentEvent, inputType, e) => {
        const parentValue = e.target.value;
        const parentType = inputType;
        if(parentType === "email" && (parentValue.indexOf("@") === -1 || parentValue.indexOf(".") === -1)){
            return alert("이메일 형식이 아닙니다!");
        }

        if(typeof(parentEvent) !== "undefined")
        parentEvent(e);
    }

    const changePasswordHide = (e) => {
        const targetText = e.target.textContent;
        if(targetText === "SHOW"){
            e.target.previousSibling.type = '';
            setPasswordHide(false);
        }else if(targetText === "HIDE"){
            e.target.previousSibling.previousSibling.type = 'password';
            setPasswordHide(true);
        }
    }

    const inputKeyDown = (parentEvent, inputType, e) => {
        if(e.code === "Tab" || e.code === "ShiftLeft") {
            return;
        }

        autoSkip(e);

        if(typeof(parentEvent) !== "undefined")
        parentEvent(e);
    }

    return (
        <div>
            {readonly === true ? 
            <input 
                className={className}
                onChange={change}
                onBlur={(e)=>inputBlur(blur,type,e)}
                placeholder={placeholder}
                maxLength={maxlength}
                readOnly={readonly}
                hidden={hidden}
                onKeyUp={(e)=>inputKeyUp(keyup,type,e)}
                onKeyDown={(e)=>inputKeyDown(keydown,type,e)}
                type={type}
                value={value}
                ref={inputFocus}
            >{children}
            </input> 
            : 
            <input 
                className={className}
                onChange={change}
                onBlur={(e)=>inputBlur(blur,type,e)}
                placeholder={placeholder}
                maxLength={maxlength}
                readOnly={readonly}
                hidden={hidden}
                onKeyUp={(e)=>inputKeyUp(keyup,type,e)}
                onKeyDown={(e)=>inputKeyDown(keydown,type,e)}
                type={type}
                defaultValue={value}
                ref={inputFocus}
            >{children}
            </input>            
            }
            
            {type === 'password' ? 
                <>
                    <span onClick={changePasswordHide} hidden={!passwordHide}>SHOW</span>
                    <span onClick={changePasswordHide} hidden={passwordHide}>HIDE</span>
                </> 
            : ''}
        </div>
    )
}

export default Input;
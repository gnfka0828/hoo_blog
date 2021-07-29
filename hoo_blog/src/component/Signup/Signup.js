import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

const Signup = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const idInputEl = useRef(null);
    const inputForm = useRef(null);

    useEffect(() => {
        inputForm.current.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }, []);

    const controlLogin = async(event) => {
        if ( id === "" || pw === "" || confirmPw === "" ) {
            ( id === "" ) ? alert("ID를 입력해 주십시오.") : alert("PASSWORD를 입력해 주십시오.");
            initInputs();
            return;
        } else if ( pw !== confirmPw ) {
            alert("PASSWORD와 CONFIRM PASSWORD의 내용이 일치하지 않습니다.");
            initInputs();
            return;
        } else {
            ;
        }
    };

    const handleChange = (e) => {
        const notAllowedIDRegex = /[ㄱ-ㅎ|가-힣]+/;

        if ( e.target.id === "id" ) {
            if ( notAllowedIDRegex.test(e.target.value) ) {
                alert("허용되지 않는 문자를 입력하셨습니다.");
                return;
            }
            setID(e.target.value);
        } else if ( e.target.id === "pw" ) {
            setPW(e.target.value);
        } else if ( e.target.id === "confirmPw" ) {
            setConfirmPw(e.target.value);
        } else {
            ;
        }
    }

    const handleBack = () => {
        props.history.goBack();
    };

    const initInputs = () => {
        setID("");
        setPW("");
        setConfirmPw("");
        idInputEl.current.focus();
    }

    return (
        <section>
            <div>
                <section className="login">
                    <form onSubmit={controlLogin} ref={inputForm}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">ID</label>
                                <input ref={idInputEl} type="text" name="id" id="id" autoComplete="off" value={id} onChange={handleChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email">PASSWORD</label>
                                <input type="password" name="pw" id="pw" autoComplete="off" value={pw} onChange={handleChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email">CONFIRM PASSWORD</label>
                                <input type="password" name="confirmPw" id="confirmPw" autoComplete="off" value={confirmPw} onChange={handleChange} />
                            </div>
                        </div>
                        <ul className="actions">
                            <li className="primary"><input type="submit" value="Sign Up" disabled={disabled}/></li>
                            <li><div className="button fit" onClick={handleBack}>Go Home</div></li>
                        </ul>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default Signup;
import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');
    const idInputEl = useRef(null);
    const inputForm = useRef(null);

    useEffect(() => {
        inputForm.current.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }, []);
   
    const _getPW = async(resolve, reject) => {
        const getPW = await axios.get('/api/getPW/' + id );
        const hashPW = await axios.get('/api/getHash/' + id + '/' + pw );
        
        const res = ( getPW.data && getPW.data[0] && hashPW.data ) ?
        {
            getPW: getPW.data[0].pw,
            hashPW: hashPW.data
        } : {}

        resolve(res);
    };

    const controlLogin = async(event) => {
        if ( id === "" || pw === "" ) {
            ( id === "" ) ? alert("ID를 입력해 주십시오.") : alert("PASSWORD를 입력해 주십시오.");
            initInputs();
            return;
        }

        setDisabled(true);
        await new Promise((resolve, reject) => {
            _getPW(resolve, reject);
        }).then(res => {
            setDisabled(false);

            if ( res.getPW && res.hashPW && ( res.getPW === res.hashPW ) ) {
                alert("Yes!");
                props.history.push('/');
            } else {
                alert("ID나 PASSWORD를 잘못 입력하였습니다. 다시 입력하여 주십시오.");
                initInputs();
            }
        });
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
                        </div>
                        <ul className="actions">
                            <li className="primary"><input type="submit" value="Login" disabled={disabled}/></li>
                            <li><div className="button fit" onClick={handleBack}>Go Home</div></li>
                        </ul>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default Login;
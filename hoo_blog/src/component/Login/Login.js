import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');

    const _getUser = async(resolve, reject) => {
        const res = await axios.get('/api/getUser/' + id );

        if ( res.data ) {
            resolve(res.data);
        }
    };

    const controlLogin = async(event) => {
        if ( id === "" ) {
            alert("ID를 입력해 주십시오.");
            return;
        }

        setDisabled(true);
        event.preventDefault();
        await new Promise((resolve, reject) => {
            //setTimeout(_getUser, 3000);
            _getUser(resolve, reject);
        }).then(res => {
            setDisabled(false);

            if ( res[0] && res[0].pw === pw ) {
                alert("Yes!");
                props.history.push('/');
            } else {
                alert("ID나 PASSWORD를 잘못 입력하였습니다. 다시 입력하여 주십시오.");
                setID("");
                setPW("");
            }
        });
    };

    const handleChange = (e) => {
        if ( e.target.id === "id" ) {
            setID(e.target.value);
        } else if ( e.target.id === "pw" ) {
            setPW(e.target.value);
        } else {
            ;
        }
    }

    return (
        <section>
            <div>
                <section className="login">
                    <form onSubmit={controlLogin}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">ID</label>
                                <input type="text" name="id" id="id" autoComplete="off" value={id} onChange={handleChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email">PASSWORD</label>
                                <input type="password" name="pw" id="pw" autoComplete="off" value={pw} onChange={handleChange} />
                            </div>
                        </div>
                        <ul className="actions">
                            <li className="primary"><input type="submit" value="Login" disabled={disabled}/></li>
                        </ul>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default Login;
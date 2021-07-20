import React, { useState, useRef } from "react";
import axios from 'axios';

const Signup = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');
    const idInputEl = useRef(null);

    // const handleChange = (e) => {
    //     if ( e.target.id === "id" ) {
    //         setID(e.target.value);
    //     } else if ( e.target.id === "pw" ) {
    //         setPW(e.target.value);
    //     } else {
    //         ;
    //     }
    // }

    return (
        <section>
            <div>
                <section className="login">
                    <form /*onSubmit={controlLogin}*/>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">ID</label>
                                <input ref={idInputEl} type="text" name="id" id="id" autoComplete="off" value={id} /*onChange={handleChange}*/ />
                            </div>
                            <div className="field">
                                <label htmlFor="email">PASSWORD</label>
                                <input type="password" name="pw" id="pw" autoComplete="off" value={pw} /*onChange={handleChange}*/ />
                            </div>
                        </div>
                        <ul className="actions">
                            <li className="primary"><input type="submit" value="Sign Up" disabled={disabled}/></li>
                        </ul>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default Signup;
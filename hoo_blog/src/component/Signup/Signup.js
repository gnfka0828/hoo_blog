import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';
import Swal from 'sweetalert2';

const Signup = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const idInputEl = useRef(null);
    const inputForm = useRef(null);
    const dispatch = useDispatch();
    const store = useSelector((store) => store.usernum);

    const _getNumberOfUsers = useCallback(async() => {
        const res = await axios.get('/api/getNumberOfUsers');
        dispatch(actions.updateUsernum(res.data));
      }, [dispatch]);

    useEffect(() => {
        inputForm.current.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        _getNumberOfUsers();
    }, [_getNumberOfUsers]);

    const _isExistUser = async(resolve, reject) => {
        const findUser = await axios.get('/api/getPW/' + id );
        const hashPW = await axios.get('/api/getHash/' + id + '/' + pw );

        const res = ( findUser && findUser.data ) ?
        {
            isExistUser: ( findUser.data.length !== 0 ),
            hashPW: hashPW.data
        } : {}
            
        resolve(res);
    };

    const _registerUser = async(res) => {
        res = await axios.get('/api/registerUser/' + id + '/' + res.hashPW + '/' + ( store.usernum + 1 ) );
        return res;
    };

    const controlSignup = async(e) => {
        if ( id === "" || pw === "" || confirmPw === "" ) {
            ( id === "" ) ? 
                Swal.fire({
                    title: "ID를 입력해 주십시오.",
                    icon: 'warning',
                    confirmButtonText: '확인',
                }) : 
                Swal.fire({
                    title: "PASSWORD를 입력해 주십시오.",
                    icon: 'warning',
                    confirmButtonText: '확인',
                });
            initInputs();
            return;
        } else if ( pw !== confirmPw ) {
            Swal.fire({
                title: "PASSWORD와 CONFIRM PASSWORD의 내용이 일치하지 않습니다.",
                icon: 'warning',
                confirmButtonText: '확인',
            });
            initInputs();
            return;
        } else {
            const checkIDRegex = /^[a-zA-Z0-9_-]{8,20}$/; // ID 규칙 : 영문자 + 숫자 + 언더바/하이픈 허용 4 ~ 20자리
            const checkPWRegex = /(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*_-]).{8,24}/; 
            // PW 규칙 : 영문자 + 특수문자 필수로 넣어서 8 ~ 24자리

            if ( ! checkIDRegex.test(id) ) {
                Swal.fire({
                    title: "ID는 영문자 / 숫자 / 언더바 / 하이픈으로 8 ~ 20자리로 입력해 주십시오.",
                    icon: 'warning',
                    confirmButtonText: '확인',
                });
                initInputs();
                return;
            } else if ( ! checkPWRegex.test(pw) ) {
                Swal.fire({
                    title: "PW는 영문자 / 특수문자를 넣어서 8 ~ 24자리로 입력해 주십시오.",
                    icon: 'warning',
                    confirmButtonText: '확인',
                });
                initInputs();
                return;
            } else {
                setDisabled(true);

                await new Promise((resolve, reject) => {
                    _isExistUser(resolve, reject);
                }).then((res) => {
                    if ( res.isExistUser === true ) {
                        Swal.fire({
                            title: "해당 ID가 이미 존재합니다.",
                            icon: 'warning',
                            confirmButtonText: '확인',
                        });
                        return;
                    } else {
                        return _registerUser(res);
                    }
                }).then((res) => {
                    setDisabled(false);
                    initInputs();

                    if ( res.data === true ) {
                        Swal.fire({
                            title: "회원가입이 완료되었습니다. \n로그인하여 주십시오.",
                            icon: 'success',
                            confirmButtonText: '확인',
                        }).then(() => {
                            handleBack();
                        });
                    } else {
                        Swal.fire({
                            title: "오류가 발생하였습니다.",
                            icon: 'warning',
                            confirmButtonText: '확인',
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        title: "오류가 발생하였습니다.",
                        icon: 'warning',
                        confirmButtonText: '확인',
                    });
                    setDisabled(false);
                    initInputs();
                });
            }
        }
    };

    const handleChange = (e) => {
        const notAllowedIDRegex = /[ㄱ-ㅎ|가-힣]+/;

        if ( e.target.id === "id" ) {
            if ( notAllowedIDRegex.test(e.target.value) ) {
                Swal.fire({
                    title: "허용되지 않는 문자를 입력하셨습니다.",
                    icon: 'warning',
                    confirmButtonText: '확인',
                });
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
                    <form onSubmit={controlSignup} ref={inputForm}>
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
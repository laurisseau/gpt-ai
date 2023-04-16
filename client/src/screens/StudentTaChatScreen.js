import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { io } from 'socket.io-client';

export default function StudentTaChatScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

    const socket = io.connect('http://localhost:3000');

    //socket.on("connect", () => {
        //console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    //  });

  const [message, setMessage] = useState('')
  console.log(message)
  const sendMessage = (e) => {
    e.preventDefault();
    //console.log(message)
    console.log(socket.emit('send_message', {text: 'hello world'}))
  };

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    ctxDispatch({ type: 'EMPLOYEE_SIGNOUT' });
    localStorage.removeItem('employeeInfo');
    window.location.href = '/';
  };

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      console.log(data)
    })
  }, [socket])

  return (
    <div className="div">
      <Row>
        <Col lg={3} className="border p-3" style={{ height: '100vh' }}>
          <h4>Hey, {userInfo.firstname}</h4>
          <ul>
            <li>
              <Link to="/studentChat">TA Chat</Link>
            </li>

            <li>
              <Link to="/studentChat">ProPal Chat</Link>
            </li>

            <li>
              <Link to="/docs">Doc</Link>
            </li>

            <li>
              <Link onClick={signoutHandler}>Logout</Link>
            </li>
          </ul>
        </Col>
        <Col lg={9} className="" style={{ height: '100vh' }}>
          <div style={{ height: '100%' }}>
            <form
              className="d-flex align-items-end flex-wrap "
              style={{ height: '100%' }}
              onSubmit={sendMessage}
            >
              <div className="ms-5" style={{ width: '80%' }}>
                <p>hello world</p>
              </div>
              <div className="w-100">
                <textarea
                  className="ms-3"
                  style={{ height: '45px', width: '80%' }}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <Button type="submit" className="mb-4 ms-4">
                  submit
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
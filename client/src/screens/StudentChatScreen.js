import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Store } from '../Store';

export default function StudentChatScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const submitQuestion = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/', {
        question,
      });

      setAnswer(data.message.content);
    } catch (err) {
      console.log(err);
    }
  };

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    ctxDispatch({ type: 'EMPLOYEE_SIGNOUT' });
    localStorage.removeItem('employeeInfo');
    window.location.href = '/';
  };

  return (
    <div className="div">
      <Row>
        <Col lg={3} className="border p-3" style={{ height: '100vh' }}>
          <h4>Hey, {userInfo.firstname}</h4>
          <ul>
            <li>
              <Link>TA Chat</Link>
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
              onSubmit={submitQuestion}
            >
              <div className="ms-5" style={{ width: '80%' }}>
                <p>{answer}</p>
              </div>
              <div className="w-100">
                <textarea
                  className="ms-3"
                  style={{ height: '45px', width: '80%' }}
                  onChange={(e) => setQuestion(e.target.value)}
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

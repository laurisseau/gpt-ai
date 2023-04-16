import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../Store';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  //console.log(search)
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/studentChat');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/studentChat');
    }
  }, [navigate, userInfo]);

  return (
    <div className="div">
      <Row>
        <Col lg={8} className="">
          <img
            style={{ height: '100vh', width: '100%' }}
            alt="students"
            src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          />
        </Col>
        <Col lg={4} className="">
          <div className="h-100 d-flex align-items-center">
            <div className="w-100">
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="mb-3 mt-5">
                  <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                  New customer?{' '}
                  <Link to={`/signup?redirect=${redirect}`}>
                    Create your account
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../Store';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  //console.log(search)
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signup', {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      });

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data) {
        navigate('/studentChat');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/studentChat');
    }
  }, [navigate, redirect, userInfo]);

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
                <Form.Group className="mb-3" controlId="firstname">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="firstname"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastname">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="lastname"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="mb-3">
                  <Button type="submit">Sign Up</Button>
                </div>
                <div className="mb-3">
                  Already have an account?{' '}
                  <Link to={`/?redirect=${redirect}`}>Sign-In</Link>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

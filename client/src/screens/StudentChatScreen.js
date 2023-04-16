import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
//import { Store } from '../Store';

export default function StudentChatScreen() {
  //const { state, dispatch: ctxDispatch } = useContext(Store);
  //const { userInfo } = state;

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
  /*
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    ctxDispatch({ type: 'EMPLOYEE_SIGNOUT' });
    localStorage.removeItem('employeeInfo');
    window.location.href = '/';
  };
*/
  return (
    <div>
      <Navbar
        bg="light"
        className="shadow-sm"
        style={{ height: '70px' }}
        expand="sm"
      >
        <Container style={{ maxWidth: '1140px' }} fluid>
          <Navbar.Brand href="/">TeachMe.ai</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-sm"
            aria-labelledby="offcanvasNavbarLabel-expand-sm"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                TeachMe.ai
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/docs">Doc</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Container>
        <div className="" style={{ height: '100%' }}>
          <form
            className="d-flex align-items-end flex-wrap "
            style={{ height: '100%' }}
            onSubmit={submitQuestion}
          >
            <div
              className="m-3 w-100 border"
              style={{ height: '300px', overflowY: 'scroll' }}
            >
              <p className='p-4'>{answer}</p>
            </div>
            <div className="w-100">
              <textarea
                className="mt-4 ps-4 pt-2 pe-4"
                style={{ height: '45px', width: '100%' }}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              <Button type="submit" className="mt-3 w-100">
                submit
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

/*

            <li>
              <Link onClick={signoutHandler}>Logout</Link>
            </li>
            */

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

export default function DocsScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

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
              <Link >TA Chat</Link>
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
          <div style={{ height: '100%' }} className="m-5">
            <p>
              Genetic engineering involves the direct
              manipulation of genes for practical purposes. The recombinant DNA
              technology used to make insulin is a key tool in genetic
              engineering. This process involves cutting DNA with a restriction
              enzyme and then splicing the DNA from two different sources
              together. These sources may be from different individuals within a
              species, from different species, or from totally unrelated
              organisms. The resulting recombinant DNA is then inserted into a
              host cell, which multiplies to form a colony of genetically
              identical cells, each carrying the recombinant DNA. The genes
              within these cells can be turned on or off, or even eliminated
              altogether. This allows for the creation of organisms with new
              traits or the alteration of existing traits. The possibilities of
              genetic engineering are limitless. For example, scientists are
              working on developing crops that are resistant to pests and
              diseases, that require fewer herbicides and pesticides, and that
              are more nutritious. Genetic engineering can also be used to
              produce pharmaceuticals such as vaccines, growth hormones, and
              blood-clotting factors. In addition, it can be used to clone
              organisms, including humans. Despite the potential benefits of
              genetic engineering, there are also concerns about its safety and
              ethical implications. Critics argue that genetic engineering may
              result in unintended consequences, such as the creation of new
              diseases or the spread of genetic mutations. There are also
              concerns about the use of genetic engineering for human cloning
              and the potential for eugenics. As with any new technology, it is
              important to weigh the potential benefits against the risks and to
              ensure that ethical considerations are taken into account.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

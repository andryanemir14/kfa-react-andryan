import logo from '../assets/images/logo-kfa.png';

function Navbar() {

return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-light shadow p-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="KFA Logo" width="180" height="50" className="d-inline-block align-text-top"/>    
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <button className="btn ms-auto" style={{backgroundColor: 'var(--primaryAccent)', color: 'white',}}>Login</button>
          </div>
        </div>
      </nav>
    </>
);

}

export default Navbar;
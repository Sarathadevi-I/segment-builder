import { useState } from 'react';
import SaveModal from "./components/SaveModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <button
          className="btn btn-primary px-4 py-2"
          onClick={() => setShow(true)}
        >
          Save segment
        </button>
        {show && <SaveModal onClose={() => setShow(false)} />}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/loading.css';

const Loading = () => {
    return(
        <div className="loading">
            로딩중... <Spinner animation="border" variant="dark" />
        </div>
    )
}

export default Loading;
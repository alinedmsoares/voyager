import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import editingViews from './pages/editingViews/editingViews'
import editingFields from './pages/editingFields/editingFields';
import sendDocuments from './pages/sendDocuments/sendDocuments'
import notFound from './pages/notFound/notFound';
import * as serviceWorker from './serviceWorker';
import { usuarioAutenticado } from './services/auth';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

const Permission = ({ component: Component }) => (
    <Route
        render={props => usuarioAutenticado() ?
            (<Component {...props} />) :
            (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        }
    />
);

const rotas = (
    <Router>
        <div>
            <Switch>
                {/* <Route exact path="/" component={editingFields} /> */}
                {/* <Route exact path="/" component={sendDocuments} /> */}
                <Route exact path="/" component={editingViews} />
                <Route component={notFound} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));
serviceWorker.unregister();

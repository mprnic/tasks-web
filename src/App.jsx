import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Homepage, Task } from './pages';

import './index.scss';

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/tasks/:id">
                    <Task />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

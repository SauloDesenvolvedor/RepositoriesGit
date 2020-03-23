import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import { Repository } from './pages/Repository';

export default () => {
    return (
        // router main
        <BrowserRouter>
            {/* Garantir que apenas uma rota seja chamada de uma vez */}
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/repository/:repository" component={Repository} />
            </Switch>
        </BrowserRouter>
    );
};

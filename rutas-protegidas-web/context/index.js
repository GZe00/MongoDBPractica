import React from 'react';

let context = {
    theme: 'light',
    username: undefined,
    apiToken: undefined,
    setApiToken: () => {},
    setTheme: () => {},
    setUserName: () => {}
}


const AppContext = React.createContext({context})

export default AppContext
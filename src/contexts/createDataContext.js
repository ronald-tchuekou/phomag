import React from 'react'

export default (reducer, actions, initialValues) => {
   const Context = React.createContext(initialValues)

   const Provider = ({ children }) => {
      const [state, dispatch] = React.useReducer(reducer, initialValues, undefined)
      const boundActions = {}
      for (let key in actions) {
         boundActions[key] = actions[key](dispatch)
      }
      return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
   }

   return { Context, Provider }
}

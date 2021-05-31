import React from 'react';

// create context with no upfront defaultValue
// without having to do undefined check all the time
function createCtx() {
  const ctx = React.createContext(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }

  return [useCtx, ctx.Provider];
}
export default createCtx;

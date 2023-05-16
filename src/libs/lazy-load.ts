export const lazyLoadFactory = <T>(initializeClient: (args: any) => T) => {
  // closure proetection
  let client: any = null;
  let lastArgs: any;

  // use sync & do not await to simplify
  return function loadClient(args = undefined): T {
    if (client === null || lastArgs !== args) {
      client = initializeClient(args);
      lastArgs = args;
    }

    return client;
  };
};
//single args
export const lazyLoadAsyncFactory = <T>(
  initializeClient: (args: any) => Promise<T>,
) => {
  // closure proetection
  let client: any = null;
  let lastArgs: any;

  // use sync & do not await to simplify
  return async function loadClient(args: any = undefined) {
    if (client === null || lastArgs !== args) {
      client = await initializeClient(args);
      lastArgs = args;
    }

    return client;
  };
};

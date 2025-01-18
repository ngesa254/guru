import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type State = ReturnType<typeof get>;
  
  const loggedSet: typeof set = (...a) => {
    const before = get();
    set(...a);
    const after = get();
    
    console.group(name || 'State Update');
    console.log('Prev:', before);
    console.log('Next:', after);
    console.log('Action:', a[0]);
    console.groupEnd();

    // Send to monitoring service if needed
    if (process.env.NODE_ENV === 'production') {
      const changes = Object.keys(after).reduce((acc, key) => {
        if (before[key as keyof State] !== after[key as keyof State]) {
          acc[key] = {
            from: before[key as keyof State],
            to: after[key as keyof State]
          };
        }
        return acc;
      }, {} as Record<string, { from: any; to: any }>);

      // Could send to monitoring service
      console.debug('State changes:', changes);
    }
  };

  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

import { createContext, useContext, useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { useSearchParams } from 'react-router-dom';

type ContextType = {
  people: Person[];
  setPeople: (people: Person[]) => void;
  isLoading: boolean;
  isLoadingErorr: boolean;
  sex: string;
  search: string;
  centuries: string[];
  handleSexChange: (newSexParam: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PeopleContext = createContext<ContextType | null>(null);

export const usePeopleContext = () => {
  const obj = useContext(PeopleContext);

  if (!obj) {
    throw new Error('Somthing went wrong');
  }

  return obj;
};

type PeopleProvideProps = {
  children: React.ReactNode;
};

// interface State {
//   people: Person[];
//   // filterPatams: Filter;
// }

export const PeopleProvider: React.FC<PeopleProvideProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingErorr, setIsLoadingErorr] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadingErorr(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PeopleContext.Provider
      value={{ people, setPeople, isLoading, isLoadingErorr }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

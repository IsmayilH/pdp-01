import React, {useState, createContext} from 'react';

type Props = {
  children: React.ReactNode;
};

type InitialValues = {
  musics: IJobsResponse[];
  setMusics: (jobs: IJobsResponse[] | undefined) => void;
};

const initialValues: InitialValues = {
  jobs: [],
  setJobs: (jobs: IJobsResponse[] | undefined) => jobs,
};

export const JobsContext = createContext(initialValues);

export const JobsProvider: React.FC<Props> = ({children}) => {
  const [jobs, setJobs] = useState([]);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
      }}>
      {children}
    </JobsContext.Provider>
  );
};

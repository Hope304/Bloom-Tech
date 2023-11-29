import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = (props) => {
  const [data, setData] = useState(null);

  const updateData = newData => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData}}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const AdminSettingsContext = React.createContext({
  inlineEditing: true,
  setInlineEditing: (() => {}) as (condition: boolean) => void
});

export function AdminSettingsContextProvider({ children }: Props) {
  const [enableInlineEditing, setInlineEditing] = useState(true);

  return (
    <AdminSettingsContext.Provider
      value={{
        inlineEditing: enableInlineEditing,
        setInlineEditing: setInlineEditing
      }}
    >
      {children}
    </AdminSettingsContext.Provider>
  );
}

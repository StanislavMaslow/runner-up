import React from 'react';
import { AppProvider } from './AppProvider';

// Add providers here
const AllProviders = ({ children }) => <AppProvider>{children}</AppProvider>;

export default AllProviders;

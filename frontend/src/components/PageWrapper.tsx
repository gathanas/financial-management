import React, { ReactNode } from 'react';

type PageWrapperProps = {
    children: ReactNode;
};

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className="page-wrapper">
            {children}
        </div>
    );
};

export default PageWrapper;

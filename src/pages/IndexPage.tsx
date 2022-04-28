import React from 'react';
import { Page } from 'components/Page';
import { CryptoIndexWidget } from 'components/CryptoIndexWidget';

export const IndexPage: React.FC = () => {
  return (
    <Page>
      <CryptoIndexWidget />
    </Page>
  );
};

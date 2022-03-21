import React from 'react';
import { Page } from 'components/Page';
import { CalculateWidget } from 'components/CalculateWidget';

export const CalculatePage: React.FC = () => {
  return (
    <Page>
      <CalculateWidget />
    </Page>
  );
};

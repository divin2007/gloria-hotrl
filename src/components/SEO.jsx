import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, noindex }) => {
  const fullTitle = `${title} | Gloria Hotel Kigali`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;

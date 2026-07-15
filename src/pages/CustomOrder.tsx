/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import CustomOrder from '../components/CustomOrder';
import PageFrame from '../components/PageFrame';

export default function CustomOrderPage() {
  return (
    <PageFrame title="Bespoke Order">
      <CustomOrder />
    </PageFrame>
  );
}

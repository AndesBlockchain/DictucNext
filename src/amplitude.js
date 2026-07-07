// amplitude.ts
'use client';

import * as amplitude from '@amplitude/unified';

function initAmplitude() {
  if (typeof window !== 'undefined') {
    amplitude.initAll('99efb8c9943db3ac036242c2d02b9291', {"analytics":{"autocapture":true},"sessionReplay":{"sampleRate":1}});
  }
}
 
initAmplitude();

export const Amplitude = () => null;
export default amplitude;
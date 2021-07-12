import React from 'react';
import { Provider as UseChangeProvider } from 'use-change';

import { render } from 'react-dom';
import Phlegmatic from './Phlegmatic';
import { RootStore } from './types';
import PhlegmaticStore from './PhlegmaticStore';

window.biduulPlugin<RootStore>((store) => {
  const { currentScript } = document;
  if (!currentScript) throw new Error('Unable to detect currentScript');
  const {
    settingsElement, element, listenSettingsSave, listenSettingsCancel,
  } = store.customization.createWidget({
    id: 'phlegmatic',
    hasSettings: true,
    title: 'Phlegmatic',
    currentScript,
    layout: { h: 6, w: 4, minH: 5 },
  });

  // eslint-disable-next-line no-param-reassign
  store.phlegmatic = new PhlegmaticStore(store);

  if (!settingsElement) throw new Error('Settings element is missing even though "hasSettings" is "true"');

  render((
    <UseChangeProvider value={store}>
      <Phlegmatic
        settingsElement={settingsElement}
        listenSettingsSave={listenSettingsSave}
        listenSettingsCancel={listenSettingsCancel}
      />
    </UseChangeProvider>
  ), element);
});

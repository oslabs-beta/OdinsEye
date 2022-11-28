import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import App from '../client/App';
import LabeledText from '../client/components/LabeledText';
import Market from '../client/components/Market';
import store from '../client/store';
import { ConsoleMessage } from 'puppeteer';

describe('Testing React Components', () => {
  describe('test', () => {
    console.log('test');
  });
});

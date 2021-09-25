#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { NamecardBackendStack } from '../lib/namecard-backend-stack';

const app = new cdk.App();
new NamecardBackendStack(app, 'NamecardBackendStack');

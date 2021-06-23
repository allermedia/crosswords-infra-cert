#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CrosswordsInfraCertStack } from '../lib/crosswords-infra-cert-stack';

const app = new cdk.App();
new CrosswordsInfraCertStack(app, 'CrosswordsInfraCertStack', {
  env: { account: '758373581920', region: 'us-east-1' },
});

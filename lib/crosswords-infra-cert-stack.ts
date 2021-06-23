import * as cdk from '@aws-cdk/core';
import { Certificate, CertificateValidation} from '@aws-cdk/aws-certificatemanager';
import { HostedZone} from '@aws-cdk/aws-route53';


export class CrosswordsInfraCertStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dkDomainName = 'test.korsordsmolnet.com'
    const hostedZoneDK =  HostedZone.fromHostedZoneId(this, 'hostedZoneDK', cdk.Fn.importValue('hostedZoneDKId'))
    const certificateDK = new Certificate(this, 'certificateDK', {
      domainName: dkDomainName,
      validation: CertificateValidation.fromDns(hostedZoneDK),
    })
    cdk.Tags.of(certificateDK).add('Name', dkDomainName, {priority: 100,});
    new cdk.CfnOutput(this, 'certificateDKArn', {
      exportName: "certificateDKArn",
      value: certificateDK.certificateArn,
      description: "The Arn of the certificate",
    })

    const seDomainName = 'test.krydsskye.com'
    const hostedZoneSE =  HostedZone.fromHostedZoneId(this, 'hostedZoneSE', cdk.Fn.importValue('hostedZoneSEId'))
    const certificateSE = new Certificate(this, 'certificateSE', {
      domainName: seDomainName,
      validation: CertificateValidation.fromDns(hostedZoneSE),
    })
    cdk.Tags.of(certificateSE).add('Name', seDomainName, {priority: 100,});
    new cdk.CfnOutput(this, 'certificateSEArn', {
      exportName: "certificateSEArn",
      value: certificateSE.certificateArn,
      description: "The Arn of the certificate",
    })
  }
}

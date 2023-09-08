const { create } = require('fake-sso-idp')
const app = create({
  serviceProvider: {
    destination: 'http://127.0.0.1/saml2/acs',
    metadata: 'http://127.0.0.1/saml2/local/metadata'
  },  
  users: [
    {
      id: 'super-admin',
      name: 'Super-Admin Leonardo Morichelli',
      username: 'leonard01.morichelli',
      password: 'pwd',
      attributes: {
        pisa_id: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'super-admin',
          type: 'xs:string'
        },
       'urn:oid:2.16.840.1.113730.3.1.241':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'Leonardo Morichelli',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.4203.666.11.11.1.0':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: '2222222222222222',
          type: 'xs:string'
        },
        'urn:oid:0.9.2342.19200300.100.1.3':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'leonardo.morichelli@unicam.it',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.9':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value:  'staff@unicam.it',
          type: 'xs:string'
        },
      }
    },
    {
      id: 'super-admin',
      name: 'Super-Admin Fabrizio Quadrani',
      username: 'quadranif',
      password: 'pwd',
      attributes: {
        pisa_id: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'super-admin',
          type: 'xs:string'
        },
       'urn:oid:2.16.840.1.113730.3.1.241':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'Fabrizio Quadrani',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.4203.666.11.11.1.0':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: '2222222222222222',
          type: 'xs:string'
        },
        'urn:oid:0.9.2342.19200300.100.1.3':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'fabrizio.quadrani@unicam.it',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.9':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value:  'staff@unicam.it',
          type: 'xs:string'
        },
      }
    },
    {
      id: 'admin',
      name: 'Admin Sara Buti',
      username: 'butis',
      password: 'pwd',
      attributes: {
        pisa_id: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'admin',
          type: 'xs:string'
        },
       'urn:oid:2.16.840.1.113730.3.1.241':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'Sara Buti',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.4203.666.11.11.1.0':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: '2222222222222222',
          type: 'xs:string'
        },
        'urn:oid:0.9.2342.19200300.100.1.3':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'sara.buti@unicam.it',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.9':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value:  'staff@unicam.it',
          type: 'xs:string'
        },
      }
    },
    {
      id: 'User',
      name: 'User Paolo Mancinelli',
      username: 'mancinellip',
      password: 'pwd',
      attributes: {
        pisa_id: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'user',
          type: 'xs:string'
        },
       'urn:oid:2.16.840.1.113730.3.1.241':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'Paolo Mancinelli',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.4203.666.11.11.1.0':{
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: '2222222222222222',
          type: 'xs:string'
        },
        'urn:oid:0.9.2342.19200300.100.1.3':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'paolo.mancinelli@unicam.it',
          type: 'xs:string'
        },
        'urn:oid:1.3.6.1.4.1.5923.1.1.1.9':{
          format:  'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value:  'staff@unicam.it',
          type: 'xs:string'
        },
      }
    },
  ]
})

app.listen(7000)
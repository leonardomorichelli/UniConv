<?php

// If you choose to use ENV vars to define these values, give this IdP its own env var names
// so you can define different values for each IdP, all starting with 'SAML2_'.$this_idp_env_id
$this_idp_env_id = 'PROD';

//This is variable is for simplesaml example only.
// For real IdP, you must set the url values in the 'idp' config to conform to the IdP's real urls.

//$idp_host = env('SAML2_'.$this_idp_env_id.'_IDP_HOST', 'https://idp.uniurb.it/');
//
//return $settings = array(
//
//    /*****
//     * One Login Settings
//     */
//
//    // If 'strict' is True, then the PHP Toolkit will reject unsigned
//    // or unencrypted messages if it expects them signed or encrypted
//    // Also will reject the messages if not strictly follow the SAML
//    // standard: Destination, NameId, Conditions ... are validated too.
//    'strict' => $strict, //@todo: make this depend on laravel config
//
//    // Enable debug mode (to print errors)
//    'debug' => env('APP_DEBUG', true),
//
//
//    // Service Provider Data that we are deploying
//    'sp' => array(
//        
//        // Specifies constraints on the name identifier to be used to
//        // represent the requested subject.
//        // Take a look on lib/Saml2/Constants.php to see the NameIdFormat supported
//        'NameIDFormat' => 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
//
//        // Usually x509cert and privateKey of the SP are provided by files placed at
//        // the certs folder. But we can also provide them with the following parameters
//        'x509cert' => env('SAML2_SP_x509',''),
//        'privateKey' => env('SAML2_SP_PRIVATEKEY',''),
//
//        // Identifier (URI) of the SP entity.
//        // Leave blank to use the 'saml_metadata' route.
//        'entityId' => env('SAML2_SP_ENTITYID',''),
//
//        // Specifies info about where and how the <AuthnResponse> message MUST be
//        // returned to the requester, in this case our SP.
//        'assertionConsumerService' => array(
//            // URL Location where the <Response> from the IdP will be returned,
//            // using HTTP-POST binding.
//            // Leave blank to use the 'saml_acs' route
//            'url' => '',
//        ),
//        // Specifies info about where and how the <Logout Response> message MUST be
//        // returned to the requester, in this case our SP.
//        // Remove this part to not include any URL Location in the metadata.
//        'singleLogoutService' => array(
//            // URL Location where the <Response> from the IdP will be returned,
//            // using HTTP-Redirect binding.
//            // Leave blank to use the 'saml_sls' route
//            'url' => '',        
//        ),
//    ),
//
//    // Identity Provider Data that we want connect with our SP
//    'idp' => array(
//        // Identifier of the IdP entity  (must be a URI)
//        //https://idptest.uniurb.it/idp/shibboleth
//        'entityId' => env('SAML2_IDP_ENTITYID', $idp_host.'idp/shibboleth'), //. 'idp/shibboleth'
//        // SSO endpoint info of the IdP. (Authentication Request protocol)
//        'singleSignOnService' => array(
//            // URL Target of the IdP where the SP will send the Authentication Request Message,
//            // using HTTP-Redirect binding.
//            'url' => $idp_host.'idp/profile/SAML2/Redirect/SSO',
//            
//        ),
//        // SLO endpoint info of the IdP.
//        'singleLogoutService' => array(
//            // URL Location of the IdP where the SP will send the SLO Request,
//            // using HTTP-Redirect binding.
//            //https://ds90p01.bib.uniurb.it/Shibboleth.sso/Logout?return=https://idp.uniurb.it/idp/profile/Logout
//            'url' => $idp_host.'idp/profile/Logout',
//        ),
//        // Public x509 certificate of the IdP
//        'x509cert' => env('SAML2_IDP_x509', 'MIIDIDCCAgigAwIBAgIVAPfr8HNJ+ZnHsOZPOHT6/ExkMj/TMA0GCSqGSIb3DQEB
//        BQUAMBgxFjAUBgNVBAMTDWlkcC51bml1cmIuaXQwHhcNMDkxMTA0MTIwNjM4WhcN
//        MjkxMTA0MTIwNjM4WjAYMRYwFAYDVQQDEw1pZHAudW5pdXJiLml0MIIBIjANBgkq
//        hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArCLO1a/dUZ8kXUwmWnFFQIZhqooWQS9E
//        jL+MBLChM79Rjh0Ucga+iWKfrldYst6GyUsucTc409cd0k1WuSrcWhqbGsNUklux
//        TF2RJOWdtc9o748/eybGFrymycmXnnGOinwmqvaRDQGQQ0oxi1CxhhJ/kkZRBiyH
//        kJ0w5NjY+8KUPlTiPU6X71HGPhrrOgBteGcegt5gIycMdWAZhl/30yLNxIo8XdRH
//        VmuHzifQqLxmsYRlHTQKVeKkQ39NcoKYpmmq84SQNximYDFy1l0QJErZ9din7q0T
//        9tJG56/1C7Cd3cswdA7E7rg8/E1SEQTq63WUuIssA9cgvVYy0zEJ1QIDAQABo2Ew
//        XzA+BgNVHREENzA1gg1pZHAudW5pdXJiLml0hiRodHRwczovL2lkcC51bml1cmIu
//        aXQvaWRwL3NoaWJib2xldGgwHQYDVR0OBBYEFEdlfuYSnAcQl8FMtl+bhsdev9SS
//        MA0GCSqGSIb3DQEBBQUAA4IBAQBYopjNhRz1N1QjNZDClXH0UgTBHIyzYs1kkfid
//        kySla/EpsunfgdhYyxewc0RmFkRbZsMbji5Sbu7ezVuTt+JO1DJvWvqGMUsvz3rP
//        Fj/hx4kxR+D2fM+27LoyK3L7jvAq8FcBR7b/vV+6vEF2vI4cKNXQ8GEv0Aem0Ow2
//        5l6w4DgJLa0/3BpfaktCHHtV9YMB8OdcmGi1LZLE89uDlBrh2wS7myGMU+3h6/GL
//        40cg0YNou/KoAV5DM0cvNRef+K/IjlEILdppfjfmk4jD9Eqom1m6i8dffH7fK2ee
//        T68a+KBYk1QOH0KR1wV5hojnDngV3n9JvzTHSBvVpbkOxvDi'),
//        /*
//         *  Instead of use the whole x509cert you can use a fingerprint
//         *  (openssl x509 -noout -fingerprint -in "idp.crt" to generate it)
//         */
//        // 'certFingerprint' => '',
//    ),
//
//
//
//    /***
//     *
//     *  OneLogin advanced settings
//     *
//     *
//     */
//    // Security settings
//    'security' => array(
//
//        /** signatures and encryptions offered */
//
//        // Indicates that the nameID of the <samlp:logoutRequest> sent by this SP
//        // will be encrypted.
//        'nameIdEncrypted' => false,
//
//        // Indicates whether the <samlp:AuthnRequest> messages sent by this SP
//        // will be signed.              [The Metadata of the SP will offer this info]
//        'authnRequestsSigned' => false,
//
//        // Indicates whether the <samlp:logoutRequest> messages sent by this SP
//        // will be signed.
//        'logoutRequestSigned' => false,
//
//        // Indicates whether the <samlp:logoutResponse> messages sent by this SP
//        // will be signed.
//        'logoutResponseSigned' => false,
//
//        /* Sign the Metadata
//         False || True (use sp certs) || array (
//                                                    keyFileName => 'metadata.key',
//                                                    certFileName => 'metadata.crt'
//                                                )
//        */
//        'signMetadata' => false,
//
//
//        /** signatures and encryptions required **/
//
//        // Indicates a requirement for the <samlp:Response>, <samlp:LogoutRequest> and
//        // <samlp:LogoutResponse> elements received by this SP to be signed.
//        'wantMessagesSigned' => false,
//
//        // Indicates a requirement for the <saml:Assertion> elements received by
//        // this SP to be signed.        [The Metadata of the SP will offer this info]
//        'wantAssertionsSigned' => false,
//
//        // Indicates a requirement for the NameID received by
//        // this SP to be encrypted.
//        'wantNameIdEncrypted' => false,
//
//        'wantAssertionsEncrypted' => true,
//        // Authentication context.
//        // Set to false and no AuthContext will be sent in the AuthNRequest,
//        // Set true or don't present thi parameter and you will get an AuthContext 'exact' 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport'
//        // Set an array with the possible auth context values: array ('urn:oasis:names:tc:SAML:2.0:ac:classes:Password', 'urn:oasis:names:tc:SAML:2.0:ac:classes:X509'),
//        'requestedAuthnContext' => false,        
//
//          //'signatureAlgorithm' => 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
//        'signatureAlgorithm' => 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
//      
//        //'digestAlgorithm' =>  'http://www.w3.org/2000/09/xmldsig#sha1',
//        'digestAlgorithm' => 'http://www.w3.org/2001/04/xmlenc#sha256',
//    ),
//
//    // Contact information template, it is recommended to suply a technical and support contacts
//    'contactPerson' => array(
//        'technical' => array(
//            'givenName' => 'name',
//            'emailAddress' => 'no@reply.com'
//        ),
//        'support' => array(
//            'givenName' => 'Support',
//            'emailAddress' => 'no@reply.com'
//        ),
//    ),
//
//    // Organization information template, the info in en_US lang is recomended, add more if required
//    'organization' => array(
//        'en-US' => array(
//            'name' => 'Name',
//            'displayname' => 'Display Name',
//            'url' => 'http://url'
//        ),
//    ),
//
///* Interoperable SAML 2.0 Web Browser SSO Profile [saml2int]   http://saml2int.org/profile/current
//*/
//  // 'authnRequestsSigned' => false,    // SP SHOULD NOT sign the <samlp:AuthnRequest>,
//                                      // MUST NOT assume that the IdP validates the sign
//  // 'wantAssertionsSigned' => true,
//  // 'wantAssertionsEncrypted' => true, // MUST be enabled if SSL/HTTPs is disabled
//  // 'wantNameIdEncrypted' => false,
//
//
//);

$strict = true;
$debug = false;

$compressed = false;
$encrypted = true;
$signed = false;
$attributeRequired = true;

$idpName = '/prod';
$spBaseUrl = 'https://uniconv.unicam.it/public/saml2' . $idpName;

return $settings = array(
    //Base Settings 
    'strict' => $strict,
    'debug' => $debug,
    'baseurl' => $spBaseUrl,
    'sp' => array(
        'entityId' => 'https://uniconv.unicam.it/public/api/loginSaml',
        //'entityId' => $spBaseUrl . '/login',
        'assertionConsumerService' => array(
            'url' => $spBaseUrl . '/acs',
            //'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        ),
        "attributeConsumingService" => array(
            "serviceName" => "Uniconv",
            //like in *AttributeFilter*
            "serviceDescription" => "Uniconv",
            "requestedAttributes" => array(
                //   https://ldap.com/ldap-oid-reference-guide/
                /*
                array("name" => "urn:oid:0.9.2342.19200300.100.1.1", "friendlyName" => "uid", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.3", "friendlyName" => "cn", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.4", "friendlyName" => "sn", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.42", "friendlyName" => "givenName", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.16.840.1.113730.3.1.241", "friendlyName" => "displayName", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:0.9.2342.19200300.100.1.3", "friendlyName" => "mail", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                */
                array("name" => "urn:oid:1.3.6.1.4.1.5923.1.1.1.7", "friendlyName" => "eduPersonEntitlement", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.3", "friendlyName" => "cn", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.16.840.1.113730.3.1.241", "friendlyName" => "displayName", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.2.840.113556.1.4.35", "friendlyName" => "employeeID", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.2.840.113556.1.2.610", "friendlyName" => "employeeNumber", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.3.6.1.4.1.5923.1.1.1.3", "friendlyName" => "eduPersonOrgDN", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.10", "friendlyName" => "pid", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:0.9.2342.19200300.100.1.1", "friendlyName" => "uid", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.3.6.1.4.1.5923.1.1.1.9", "friendlyName" => "eduPersonScopedAffiliation", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.4", "friendlyName" => "sn", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.3.6.1.4.1.25178.1.2.9", "friendlyName" => "schacHomeOrganization", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.3.6.1.4.1.5923.1.1.1.6", "friendlyName" => "eduPersonPrincipalName", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:2.5.4.100", "friendlyName" => "realm", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.3.6.1.4.1.5923.1.1.1.13", "friendlyName" => "eduPersonUniqueId", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:0.9.2342.19200300.100.1.3", "friendlyName" => "mail", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                array("name" => "urn:oid:1.3.6.1.4.1.27280.1.13", "friendlyName" => "ruolo", "isRequired" => $attributeRequired, "nameFormat" => "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"),
                
            ),
        ),
        'singleLogoutService' => array(
            'url' => $spBaseUrl . '/logout',
            //'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        ),
        'NameIDFormat' => 'urn:oasis:names:tc:SAML:1.1:nameid-format:persistent',
        'x509cert' => 'MIIHdDCCBVygAwIBAgIQegZ2imM2avqaoCgPu4iMfjANBgkqhkiG9w0BAQwFADBEMQswCQYDVQQGEwJOTDEZMBcGA1UEChMQR0VBTlQgVmVyZW5pZ2luZzEaMBgGA1UEAxMRR0VBTlQgT1YgUlNBIENBIDQwHhcNMjMwNjA2MDAwMDAwWhcNMjQwNjA1MjM1OTU5WjBqMQswCQYDVQQGEwJJVDERMA8GA1UECBMITWFjZXJhdGExLDAqBgNVBAoMI1VuaXZlcnNpdMOgIGRlZ2xpIFN0dWRpIGRpIENhbWVyaW5vMRowGAYDVQQDExF1bmljb252LnVuaWNhbS5pdDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALCnLEiK+BjrVOwl9rhD1VdwBBv4fOS5xaay16WDKMSMEAu3qsdw3QQpEN7uqoswIuHQX6IM8b9BTMiQAOT8O5KY46Z7gi18hlFiRkLLx1xUjGj3P69pxUSLPbK9NA8E6uXrkDg4lPZGw5O12/aVAN3+nrIzTLdbePODAM2g+jS7eNTH4YMK/yckn0bWvu5F1A0hS9O+S1tLYHI1vfTmEsdXM6bEqKFqhfQ/wocRRwasIlw2VfTDhNZSwpgI3Anjq6g60qDrHD62WSahtWkX9LvHyqRt9HBgxEbz7W7antXKDYd5kaF2iG5HqJ2sGd5XJUpyT1H3jgjts8KFMJwS1bcCAwEAAaOCAzowggM2MB8GA1UdIwQYMBaAFG8dNUkQbDL6WaCevIroH5W+cXoMMB0GA1UdDgQWBBQYz8Vb/HJgJX9lZFXgIr+iqyk9OTAOBgNVHQ8BAf8EBAMCBaAwDAYDVR0TAQH/BAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEEAbIxAQICTzAlMCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29tL0NQUzAIBgZngQwBAgIwPwYDVR0fBDgwNjA0oDKgMIYuaHR0cDovL0dFQU5ULmNybC5zZWN0aWdvLmNvbS9HRUFOVE9WUlNBQ0E0LmNybDB1BggrBgEFBQcBAQRpMGcwOgYIKwYBBQUHMAKGLmh0dHA6Ly9HRUFOVC5jcnQuc2VjdGlnby5jb20vR0VBTlRPVlJTQUNBNC5jcnQwKQYIKwYBBQUHMAGGHWh0dHA6Ly9HRUFOVC5vY3NwLnNlY3RpZ28uY29tMIIBfQYKKwYBBAHWeQIEAgSCAW0EggFpAWcAdQB2/4g/Crb7lVHCYcz1h7o0tKTNuyncaEIKn+ZnTFo6dAAAAYiPsBJpAAAEAwBGMEQCIHd278Sxcd4Sj8FZkiRspb+dobPJvHDWG6rSwU76XLhRAiAYqe1GI9wuk9V/d+54V/uEQYgRs7pef8sMElADhkvx4gB2ANq2v2s/tbYin5vCu1xr6HCRcWy7UYSFNL2kPTBI1/urAAABiI+wEswAAAQDAEcwRQIgNdbPkvkg2gPNorbTwOELYgTCPRFYoJilQXCs6bnXVA4CIQCsijqsA5HnGe13WAiKiEUB9UT3+E5aHn3X86CgEbZvAAB2AO7N0GTV2xrOxVy3nbTNE6Iyh0Z8vOzew1FIWUZxH7WbAAABiI+wEpYAAAQDAEcwRQIhAKvC2VYLiN8+CErEmwXFmo9dh+dWA6PFjWFuE5uQmCgzAiBO+UNQ1TLrMopjGpKx/PMTJC8IgDM1hAWHnpzGi/fq9zAzBgNVHREELDAqghF1bmljb252LnVuaWNhbS5pdIIVaWRwLXVuaWNvbnYudW5pY2FtLml0MA0GCSqGSIb3DQEBDAUAA4ICAQAEMx4OjufDuT0NB7hjRI8zciQKf8tKYysN2hgNJ+f9uTL5HhR5Xdc0zZm7xaWchu1t7gEW6sDnRKI3dAe1NwtyOvr9O2g4i4R5t9pWCorkjoQU/LvNg8o8sOjTchpnyDLCizBbL94YYuzKZ5/ov15dYpL2M9DOVT2j+AgsRuoHH67Cwfkhewfb9jzgXMNFia/zzJY/ZPHLZFw1HXLzg7OZy5RHYZupR44aSqJdfWZwBDkihIMPQW36Yv6WDcZc4hfko1WZ2uqCzixJ5SGT8kPyHezxq79kD+KW7zn2fURH3h0YUvkmuFhNuY9A5700Uam7h+o+ZR+HYyZrf28KPx+1oP4nouqrV/SBnxUo/W6GbEIIbkzNFVSR4at/bA2U4MO08TDCNzn+j5BAwRc3+ccfuhPcyMqDHde8bOv27Pgfb0MDfSY5yOAg+TnhWMkqsG4wF4Fh6kBCQIpWyCgTpy1Ksg/ycvXk6iMkn2uf0wEFiKAKH6u2OyK/D1564RhTddBodNQYtn2MT580n0YLu1dnhQDJfELKGEcO/IbDbUbxSceR13/oFH6B5ZGrt1JyHri05fUlQqN5nSSpsYhKt70iX/1H7g5rgK7SoFK6iG9hWnoVCNV4alpPz7LQmSZ345W+Lu+b20G4fd14txyGDi4+s64xkQGMc5B2ZiiTmcBPPQ==',
        'privateKey' => 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwpyxIivgY61TsJfa4Q9VXcAQb+HzkucWmstelgyjEjBALt6rHcN0EKRDe7qqLMCLh0F+iDPG/QUzIkADk/DuSmOOme4ItfIZRYkZCy8dcVIxo9z+vacVEiz2yvTQPBOrl65A4OJT2RsOTtdv2lQDd/p6yM0y3W3jzgwDNoPo0u3jUx+GDCv8nJJ9G1r7uRdQNIUvTvktbS2ByNb305hLHVzOmxKihaoX0P8KHEUcGrCJcNlX0w4TWUsKYCNwJ46uoOtKg6xw+tlkmobVpF/S7x8qkbfRwYMRG8+1u2p7Vyg2HeZGhdohuR6idrBneVyVKck9R944I7bPChTCcEtW3AgMBAAECggEACD10Clo5ImhvyKgorwWzAOYfuvJHWR/1QUZcWsMYdrqV0QYbODxigtwrhkqZt+5h4iinHVb/O82e+EgHUqcVXEw3aj+eneKOHWO5JUp+HSdweUD3PoZvhjf8g8bhk8XF8z2et5CkGizI2K4F+aWPqctDuco8zNy+cpVsxyq4IRd9vTvc05Oq+W6y0jueajsI04xd02KehvC3groz+ZtoBGSvZA7xu46XGEhYg8/vt9NZ4LopFQtZnXXvaoWSeRCpIQ9iQvo1Ou/wRMGz9PHH7Cz73TgGdJg3pW1YglzTk49CPHIhMZYjuqtEizs8YiT/3XU7Xob+GF6qvsjNOIidAQKBgQDbK/m7Z6gD72zC2J6qrCm2ahDXj6TVZps2kBLVJ9Z3G/9kq9Dz0+vsqsdmaoxe4jLslWyfwH01zet1SocdhUb32PQwM1knoBkmNRjT/TRlcT16M1wcKsbItevRZT0nNbVWg1UcVVNgUe9I6Sqw9r4ZhOEtv52kPMNqTLL9iyOdNwKBgQDOVi9eWE9BeA9ERtLH0G8ZfBuk8Of5+G+k8n11q936/BhvCH16z6UQzD0WV0S3QccIC/Sv/XiVJBN8fr+L4mRpTW64VpXfwW/LIO9nsJRZyJSHBk7AsDuVxAgH9r630sI+9F5FQM3hcsR3nRN9DgDisyKwijKrdoRM2xp39TrLgQKBgG/STvcDmuBvHqGG3eUcM6gDE5a3jhTm5df/x+wDCFP67+HQG6rbe+pi85tYT0f1xp+YWTRkhD2YU0KjhK5WGnBHu8Z/3EPwVgR9YK5/6GS9Uu1vGNayKHus/aT3Ly07JMr/9MOg8Qoao6gidoqVSUZB2pV5xxdNfTJV8ZiUjdYfAoGAWuKFfNYDGwBKITXc9BxwQ1ZySsW+OFHgw1P4RRON9FaEYKvpsWWy/GIp6iRIZTv48idqAPbx3SeF2cluj6wJtIRh55pj66olluCL8y1JOv7pxUvW9nLp2/771p4txYR1AQvcVj7EMLC/rzwl8GhxpWloN0C4LuRGRCAiWYJQAoECgYEAnREQ1RdQw+n7OGVTAoHmO3NANxgIaiWD7uEb4q+R9KnUvLSKLz9AQCL6JppwVEY8cxargy+8lenwqmPeG+Mf2oQQpiB/FoEeDbC2P7ijGHDHyDQFzMTkBUjJA9DjAJJ2DkX+kH0opadr+mT/oqj4itXFXl/Nao3alKICokzuTOo=',
    ),
    'idp' => array(
        'entityId' => 'https://idp.unicam.it/idp/shibboleth',
        'singleSignOnService' => array(
            'url' => 'https://idp.unicam.it/idp/profile/SAML2/POST/SSO',
            'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        ),
        'simpleSingleLogoutService' => array(
            'url' => 'https://idp.unicam.it/idp/profile/SAML2/POST-SimpleSign/SSO',
            'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
        ),
        'singleLogoutService' => array(
            'url' => 'https://idp.unicam.it/idp/profile/SAML2/Redirect/SSO',
            'responseUrl' => 'https://uniconv.unicam.it:8443/sp/index.php?sls',
            'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        ),
        //'x509cert' => '',
        'x509certMulti' => array(
            'signing' => array(
                0 => 'MIIDIDCCAgigAwIBAgIVAMs2tPncRj8LVMIPBz0+GyLy78TMMA0GCSqGSIb3DQEBCwUAMBgxFjAUBgNVBAMMDWlkcC51bmljYW0uaXQwHhcNMTYwNzA2MTQxNzMxWhcNMzYwNzA2MTQxNzMxWjAYMRYwFAYDVQQDDA1pZHAudW5pY2FtLml0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlzcYJpOGUYbEDJXw0hVPtJYbXEtXudQUdypJLv54FixsAeCUeGKfXVJ1od0OnNSdvThDPG/U8cLG1rIVrxsWOSiFlGJJxVtn42hGQZvcLKqnJ/kYvWnuejyhMhurv4uWKEvCLX0PyDg58yrtG9X/mOHMuNQlxv4DDRxslkxBk8BOWJUzvXwnV7x8AlIbpmQMK3o9Xr47DJwhK5ypgmgSjqnXn5BMVDmM5ZgBEoZCeYi6wFgPGyJPa454eWf4pOUeZ3N18MC/v8IrGzcq67Groct+BT1YbKcJJf+FrfsxMoVkknBrZPr5TWfENRsr6cyOj1oXIt9XJG76sDFDDnQPTwIDAQABo2EwXzAdBgNVHQ4EFgQU5sL43dBj204hw+LB8lT5mlDWUEAwPgYDVR0RBDcwNYINaWRwLnVuaWNhbS5pdIYkaHR0cHM6Ly9pZHAudW5pY2FtLml0L2lkcC9zaGliYm9sZXRoMA0GCSqGSIb3DQEBCwUAA4IBAQB1xBdrm1wlwrhk4Ar9hCOB7/PyRd1cD8GbP7JQ5wxsOWQbeMV+fYVAOFk6M78+NNOVN8u9dKKrQnbMr8votZorq0eDeJOCUTQ0iXB1PYZRnGXkkiJ/IqJoODg1aEmTTHS+OQX7DOkc8vZ8RDni50t8hb7cTsar9GOW1U0g73X6GIIRohE5RVzSocHCDUF8FFdl+b89s+bh5zc17i0i/gP+DCoGnUQZaThKm9Sck1mxjZC5QY5vZWP3149m6xBG5Oue2FMT7EA4wdAdzrsgkz4cSk1hk6OcNZc9vLN/LeprPdLrcUk7sYyzXRIjgsSRMr0cF1uArAfBi1jfj56X9TJF',
                1 => 'MIIDIDCCAgigAwIBAgIVAK7ZcY9twdi3H9buJBWQejP31UZFMA0GCSqGSIb3DQEBCwUAMBgxFjAUBgNVBAMMDWlkcC51bmljYW0uaXQwHhcNMTYwNzA2MTQxNzMwWhcNMzYwNzA2MTQxNzMwWjAYMRYwFAYDVQQDDA1pZHAudW5pY2FtLml0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgydAWqpBuM4sXfUsHg3KGloP1Dv+vp4NTowywzrB8FBfYAbNuhovEV2AxLe9YRS4XcP9WNTzbgtka7xTodSNSrqF09ZdcVWsvkKD+Q+PgyC7d5N7RUxH0X/FiHswu4edJHEKSz0gQW7zzmv2EZZ5YUVPvwv0CPqqasAup9APZwQtCSwKMKcQHPP4LQ474dQZE47SjqZrVosw6FGWJix9np1SQPJiUQgCA4yK7tcdqlAFPB23vf2ywp2QRnPCX14n/9YnBc6UiOib7EQXL1LTgUNYPCxm5It49XdIpc1wM60oUN3Aw3IVWKRSJ3eKuoCnM+KniF8ECOOUZRBZw0RObQIDAQABo2EwXzAdBgNVHQ4EFgQUP/gHjGUpNdLE54Y3DKfeIbXUlNUwPgYDVR0RBDcwNYINaWRwLnVuaWNhbS5pdIYkaHR0cHM6Ly9pZHAudW5pY2FtLml0L2lkcC9zaGliYm9sZXRoMA0GCSqGSIb3DQEBCwUAA4IBAQAc+Wevyut1sXEqeaPgVB25+imrSAcYDGQEbc4sUxoIdCkqGV8dDnWq14jfd6cDEMDeHWJyfrMrM7Od5wh6gadoQsNTOZ8pXS/BXqDJqCphhO54/u+kowLkPV/YjnhP9G0Z0H9nGvgsJ5tFusjcXEqTZmp3U7eXSf0wXi2FjI3qp3utjOkWShDzMz/QZR1OEw6yo4L3YOfOSK2KIvnxEmsJB1uo1pBbw/1yqugZ8V6ndNjgmkE29fW/wGNkJK9kfP3zY6lrUtTHHXofYktKZSmC9DbMVkkRj3mNOQzfidemBw/UfPrcR4xxiqBG35Y8RqPfCzwPMnY827Ta+hnmFKJ9',
            ),
            'encryption' => array(
                0 => 'MIIDIDCCAgigAwIBAgIVAIg6K1XrSesAf+TqHbqhrgMYDf6+MA0GCSqGSIb3DQEBCwUAMBgxFjAUBgNVBAMMDWlkcC51bmljYW0uaXQwHhcNMTYwNzA2MTQxNzMxWhcNMzYwNzA2MTQxNzMxWjAYMRYwFAYDVQQDDA1pZHAudW5pY2FtLml0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArmlKQDjTLE+wYnpinnupZp6zqav3U65XGqFElGN02W1bQybqX8DY8T/gpUTYnYh5+lOFrGBYk+fHfGd7PRzeaCKdtJfTC89FHiZT9VlIBHXwN//oiWQCbaporBN9gPUX/m0vzVnjSX+UoDEjWnZUms74GUp/VzEJjDcWzN3dvQ2yajN7x1yFRTHl6Fl1yPcPoWykcqaQzaxuZt7L3ftCsWOld+pBsgLoZ1YExjG/3z9iXv1iGg3hdDyOW2NuW4rQK8oZnZap2jjrxGiXN3uYBaV8CEFTT6WZd0ghslwnyFvSFbFa0n/w/P2fPa7LMw3mRfrAvt8/xl1hXopkDPmufQIDAQABo2EwXzAdBgNVHQ4EFgQUN9uyhZFKoupAS28NZ8AvjCiPX1IwPgYDVR0RBDcwNYINaWRwLnVuaWNhbS5pdIYkaHR0cHM6Ly9pZHAudW5pY2FtLml0L2lkcC9zaGliYm9sZXRoMA0GCSqGSIb3DQEBCwUAA4IBAQBSkfT5VWjVnS9qsyDXZMn3Xeths2MVVq0k9IvODTqEwXQq+wfeE2me8Z58kdZf7M8Ew/nydGNe1TnWOSUp38ZskFtY7m5Uh2A+/MxUIwpIVqzQFC05vcT2PGZMwnj7Vn9P7Q9bmYEoFOaOu2vTcxG9uIyqq/l8AGu/S6jhWx2KwVga3gwW2EhsESRj+d4in6ALqxQ2MQGVZqNcSdFChulC0aAum5Wi9xF5Mb+t4oBE5AfrQTt3b6TM8KmQQnY0MKCheUDo7EDAfoTU2itIZcn000vhWQMyBtaM1PAv3aDvLExZSbTUcKZwVijxe8nW3j4HI39EhwhP7SJb3BqAg15E',
            )
        ),
    ),

    //Advanced Settings
    'compress' => array(
        'requests' => $compressed,
        'responses' => $compressed
    ),

    'security' => array(
        'nameIdEncrypted' => false, //$encrypted
        'authnRequestsSigned' => $signed,
        'logoutRequestSigned' => $signed,
        'logoutResponseSigned' => $signed,
        'signMetadata' => $signed,
        'wantMessagesSigned' => $signed,
        'wantAssertionsEncrypted' => $encrypted,
        'wantAssertionsSigned' => $signed,
        'wantNameId' => false,
        'wantNameIdEncrypted' => false, //$encrypted
        'requestedAuthnContext' => $signed,
        //'requestedAuthnContextComparison' => 'exact',
        'wantXMLValidation' => true,
        'relaxDestinationValidation' => true,
        'allowRepeatAttributeName' => true,
        'destinationStrictlyMatches' => false,
        'rejectUnsolicitedResponsesWithInResponseTo' => false,
        'signatureAlgorithm' => 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
        'digestAlgorithm' => 'http://www.w3.org/2001/04/xmlenc#sha256',
        'lowercaseUrlencoding' => false,
    ),
    'contactPerson' => array(
        'technical' => array(
            'givenName' => 'Leonardo MORICHELLI',
            'emailAddress' => 'leonardo.morichelli@unicam.it'
        ),
        'support' => array(
            'givenName' => 'Leonardo MORICHELLI',
            'emailAddress' => 'leonardo.morichelli@unicam.it'
        ),
    ),
    'organization' => array(
        'en-US' => array(
            'name' => 'UNICAM',
            'displayname' => 'University of Camerino',
            'url' => 'https://www.unicam.it/en/home/'
        ),
        'it-IT' => array(
            'name' => 'UNICAM',
            'displayname' => 'Università di Camerino',
            'url' => 'https://www.unicam.it/'
        ),
    ),
);
<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Aacotroneo\Saml2\Events\Saml2LoginEvent;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\MessageBag;
use App\Service\LoginService;
use Exception;
class LoginListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(Saml2LoginEvent $event)
    {
        $messageId = $event->getSaml2Auth()->getLastMessageId();
        Log::info('messageId [' . $messageId . ']');

        $attributesName = [
            'eduPersonEntitlement' => 'urn:oid:1.3.6.1.4.1.5923.1.1.1.7', //
            'cn' => 'urn:oid:2.5.4.3', //
            'displayName' => 'urn:oid:2.16.840.1.113730.3.1.241', //
            'employeeID' => 'urn:oid:1.2.840.113556.1.4.35', //codiceFiscale
            'eduPersonOrgDN' => 'urn:oid:1.3.6.1.4.1.5923.1.1.1.3',
            'pid' => 'urn:oid:2.5.4.10', //NULL
            'uid' => 'urn:oid:0.9.2342.19200300.100.1.1', //
            'eduPersonScopedAffiliation' => 'urn:oid:1.3.6.1.4.1.5923.1.1.1.9', //
            'sn' => 'urn:oid:2.5.4.4', //surname
            'schacHomeOrganization' => 'urn:oid:1.3.6.1.4.1.25178.1.2.9', //
            'eduPersonPrincipalName' => 'urn:oid:1.3.6.1.4.1.5923.1.1.1.6', //
            'realm' => 'urn:oid:2.5.4.100', //NULL
            'eduPersonUniqueId' => 'urn:oid:1.3.6.1.4.1.5923.1.1.1.13',
            'mail' => 'urn:oid:0.9.2342.19200300.100.1.3', //email
            'employeeNumber' => 'urn:oid:1.2.840.113556.1.2.610', //matricola
            'ruolo' => 'urn:oid:1.3.6.1.4.1.27280.1.13' //NULL
        ];

        $user = $event->getSaml2User();
        $user->parseAttributes($attributesName);
        
        $userData = new \App\User;    
        
        $userData->id = $user->getUserId();
        Log::info('user [' . $userData->id . ']');
        $userData->attributes = $user->getAttributes();

        $userData->name = $userData->attributes[$attributesName['displayName']];
        if(isset($userData->attributes[$attributesName['mail']]))
        {
            $userData->email = $userData->attributes[$attributesName['mail']];
            //Log::info('email [' . $userData->email . ']');
        }
        $userData->eduPersonScopedAffiliation = $userData->attributes[$attributesName['eduPersonScopedAffiliation']];
        $userData->password =Hash::make($userData->attributes[$attributesName['uid']][0]);
        $userData->assertion = $user->getRawSamlAssertion();

        if (!in_array('member@unicam.it',$userData->eduPersonScopedAffiliation)){
            Log::info('Utente non autorizzato: ' . $userData->email);
            abort(401,  trans('global.utente_non_autorizzato'));
        }

        $laravelUser = \App\User::where('email', $userData['email'])->first();
        Log::info('laravel user [' . $laravelUser . ']');                         
   
        if($laravelUser === null)
        {		
            Log::info('inserisci utente [' . $userData->name . ' '. $userData->email . ' '.$user->codiceFiscale[0].' ]');                
            $laravelUser = new \App\User;                             
            $laravelUser->name = $userData['name'];
            $laravelUser->email = $userData['email'];
            $laravelUser->password = $userData['password'];

            Log::info('istanza utente [' . $laravelUser->name . ' '. $laravelUser->email . ' ]');
           
            $service = new LoginService();
            Log::info('istanza service');        

            $data = $service->findUserRoleAndData($userData->email);
            if ($data == null){
                Log::info('Utente non autorizzato: '.$userData->email);
                abort(401,  trans('global.utente_non_autorizzato'));
            }

            Log::info('ruolo [' . implode(" ",$data['ruoli']). ']');     

            if ($data){            
                $laravelUser->v_ie_ru_personale_id_ab = $data['id_ab'];
                $laravelUser->save();                       
                $laravelUser->assignRole($data['ruoli']);                                  
            }
        
        }     

        session()->put('nameId', $user->getNameId());
        session()->put('sessionIndex', $user->getSessionIndex());
        
        Log::info('login [' . $laravelUser->name . ']');  
        Auth::login($laravelUser);     
    }   
}

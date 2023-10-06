<?php

use Illuminate\Http\Request;
use Aacotroneo\Saml2\Saml2Auth;
use Illuminate\Support\Facades\Log;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// App v1 API
Route::group([
    'middleware' => ['api', 'api.version:1'],  
    'prefix'     => 'v1',
  ], function ($router) {
    require base_path('routes/app_api.v1.php');
});
  
Route::get('loginSaml', function(Request $request){    
    if(\Auth::guest())
    {
        $redirect = $request->query('redirect');        
        $parameters = array();
        $forceAuthn = false;
        $isPassive = false;
        $nameId = null; //'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress';
        $stay = true;

        $referrer = $request->query('referrer');
        if ($referrer){
            Log::info('referrer: '.$referrer);
            $url = parse_url($referrer);
            if ($url){
                if (isset($url['host'])){
                    Log::info('host: '.$url['host']);                 
                    if ($url['host'] !== 'www.uniurb.it'){
                        Log::info('redirect: https://www.unicam.it/');                 
                        return redirect()->away('https://www.unicam.it/');
                    }                    
                }
                if (isset($url['query'])){
                    Log::info('query: '.$url['query']);            
                }                               
            }                       
        }                               
        $saml2Auth = new Saml2Auth(Saml2Auth::loadOneLoginAuthFromIpdConfig( env('IDP_ENV_ID', 'local')));
        //return  \Saml2::login($redirect ? $redirect : 'home'); 
        $saml2AuthUrl =  $saml2Auth->login($redirect ? $redirect : 'home', $parameters, $forceAuthn, $isPassive, $stay, ($nameId !== null));
        $saml2AuthRequestFields = App\Common\Helpers::explode_query($saml2AuthUrl);        
        return view('formPost', array('saml2AuthRequest' => $saml2AuthRequestFields));
    }
});

Route::get('metadata', function(Request $request){
    ob_end_clean();
    $saml2Auth = new Saml2Auth(Saml2Auth::loadOneLoginAuthFromIpdConfig( env('IDP_ENV_ID', 'local')));
    header("Content-type: text/xml");
    header("Content-Disposition: attachment;filename=SpUniconv.xml");
    echo $saml2Auth->getMetadata();
    exit();
});

   
Route::group([
    'middleware' => ['api','cors'],
    'prefix' => 'auth',
    'namespace'=>'Api'
], function ($router) {   
    Route::post('refreshtoken', 'AuthController@refresh');
    Route::get('logout', 'AuthController@logout');   
    //Route::post('me', 'AuthController@me');         
});

Route::group([
    'middleware' => ['cors','auth:api','log','role:super-admin'],
    'prefix' => 'auth',
    'namespace'=>'Api'
], function ($router) {
    Route::post('cambiautente', 'AuthController@cambiautente'); 
});

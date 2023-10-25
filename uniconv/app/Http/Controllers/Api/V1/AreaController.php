<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Area;
use App\Http\Controllers\Controller;
use App\UnitaOrganizzativa;
use Auth;
use Illuminate\Support\Facades\Cache;

class AreaController extends Controller
{

    public function cacheKey()
    {
        return 'uniconv';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {                
        //return Cache::rememberForever($this->cacheKey() . ':aree', function () {
            return Area::Aree()->get();
        //});
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //return Cache::rememberForever($this->cacheKey().'_'.$id.':area', function () {
            return Area::find($id);
        //});
    }

    public function query(Request $request){       

        $queryBuilder = new QueryBuilder(new Area, $request);
                
        return $queryBuilder->build()->paginate();       

    }

//sezione di metodi che non rispondono direttamente alle api
    public function decodeDescrizione($id){

        $conv = Cache::rememberForever($this->cacheKey().'_'.$id.':area', function () use($id){
            return Area::findOrFail($id);
        }); 
        return $conv->nome_breve;
    }

    public function getPersonaleByArea($codice)
    {
        $res = Area::find($codice)->personale;
        return $res->map(function ($person) {
            return [
                'nome' => $person->nome,
                'cognome' => $person->cognome,
                'user_email' => $person->user_email,
            ];
        });
    }

    public function getResponsabileByArea($codice){
        $res = Area::find($codice)->responsabileArea()->first();        
        return [
            'nome' => ucwords(strtolower($res->nome)),
            'cognome' => ucwords(strtolower($res->cognome)),     
            'nome_esteso' => ucwords(strtolower($res->nome_esteso))            
        ];        
    }

    public function getAreaByUser(){
        
        //se utente corrente afferisce ad un dipartimento restituire quello
        //se l'utente corrente afferisca al plesso restituire tutti i dipartimenti sottostanti
        //se l'utente corrente è super-admin oppure controllare permessi                 
        if (Auth::user()->hasPermissionTo('all dipartimenti')){
            return $this->index();
        }
        
        return $this->getUserAres();
    }

    public function getUserAres(){
           //se non ha il permesso viene filtrato per utente
           $pers = Auth::user()->personaleRelation()->first();
           $uo = $pers->unitaRelation()->first();
           return $this->index(); //$uo->aree();
    }

}

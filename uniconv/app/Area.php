<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\FindParameter;
use App\Personale;
use App\UnitaOrganizzativa;
use App\Ruolo;
use App\Organico;
class Area extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $connection = 'oracle';
    public $table = 'VISTA_ORG_ATTIVA';
    public $primaryKey = 'ID_AB';

    /**
     * Scope a query to only include active dipartments.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAree($query)
    {
        return $query->where('DATA_FIN', '>=',  Carbon::now())->where('TIPO', '=',  'ARE')->select(['uo AS cd_dip', 'descr AS nome_breve']);
    }

    //restituisce tutto il personale afferente ad una area
    public function personale()
    {
        return $this->hasManyThrough(Personale::class, UnitaOrganizzativa::class, 'id_ab', 'aff_org','dip_id','uo');
    }

    //restituisce tutto il personale diverso da pta 
    public function docenti()
    {
        return $this->personale()->whereHas('ruolo', function($ruolo){
            $ruolo->whereIn('tipo_ruolo', Ruolo::DOCENTITYPE);
        });        
    }

    public function organico()
    {
        return $this->hasMany(Organico::class, 'id_ab_uo', 'id_ab');
    }

    public function responsabileArea()
    {       
        return $this->organico()->valido()->respArea();        
    }

    public function unitaOrganizzativa(){
        return $this->belongsTo('App\UnitaOrganizzativa','id_ab','id_ab');
    }

}
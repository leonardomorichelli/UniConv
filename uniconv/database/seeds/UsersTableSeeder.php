<?php

use Illuminate\Database\Seeder;
use App\User as User;

//php artisan db:seed --class=UsersTableSeeder

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where('email', 'leonardo.morichelli@unicam.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'leonardo.morichelli@unicam.it',
                'password' => Hash::make('testsuperadmin'),
                'name' => 'Leonardo Morichelli',
                'v_ie_ru_personale_id_ab'=> 93446,
            ]);        
        }
        if (!$user->hasRole('super-admin')){
            $user->assignRole('super-admin');  
        }

        $user = User::where('email', 'francesco.deangelis@unicam.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'francesco.deangelis@unicam.it',
                'password' => Hash::make('testsuperadmin'),
                'name' => 'Francesco De Angelis',
                'v_ie_ru_personale_id_ab'=> 2756,
            ]);        
        }
        if (!$user->hasRole('super-admin')){
            $user->assignRole('super-admin');
        }

        $user = User::where('email', 'fabrizio.quadrani@unicam.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'fabrizio.quadrani@unicam.it',
                'password' => Hash::make('testsuperadmin'),
                'name' => 'Fabrizio Quadrani',
                'v_ie_ru_personale_id_ab'=> 670,
            ]);        
        }
        if (!$user->hasRole('super-admin')){
            $user->assignRole('super-admin');  
        }

        $user = User::where('email', 'stefano.burotti@unicam.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'stefano.burotti@unicam.it',
                'password' => Hash::make('testsuperadmin'),
                'name' => 'Stefano Burotti',
                'v_ie_ru_personale_id_ab'=> 2630,
            ]);        
        }
        if (!$user->hasRole('super-admin')){
            $user->assignRole('super-admin');  
        }

        $user = User::where('email', 'sara.buti@unicam.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'sara.buti@unicam.it',
                'password' => Hash::make('testadmin'),
                'name' => 'test admin',
                'v_ie_ru_personale_id_ab'=> 4152,
            ]);        
        }
        if (!$user->hasRole('admin')){
            $user->assignRole('admin');  
        }

        $user = User::where('email', 'paolo.mancinelli@unicam.it')->first();        
        if ($user==null){
            $user = User::firstOrCreate([
                'email' => 'paolo.mancinelli@unicam.it',
                'password' => Hash::make('testuser'),
                'name' => 'test user',
                'v_ie_ru_personale_id_ab'=> 808,
            ] );
        }
        if (!$user->hasRole('viewer')){
            $user->assignRole('viewer');
        }        
    }
}

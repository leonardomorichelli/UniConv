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
      
        $user = User::where('email', 'enrico.oliva@uniurb.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'enrico.oliva@uniurb.it' ,
                'password' => Hash::make( 'testadm1n' ) ,
                'name' => 'Enrico Oliva' ,
                'v_ie_ru_personale_id_ab'=> 39842,
            ] );        
        }
        if (!$user->hasRole('super-admin')){
            $user->assignRole('super-admin');  
        }

        $user = User::where('email', 'test.admin@uniurb.it')->first();   
        if ($user==null) {     
            $user = User::firstOrCreate( [
                'email' => 'test.admin@uniurb.it' ,
                'password' => Hash::make( 'testadm1n' ) ,
                'name' => 'test admin' ,
                //'v_ie_ru_personale_id_ab'=> 39842,
            ] );        
        }
        if (!$user->hasRole('admin')){
            $user->assignRole('admin');  
        }      

        $user = User::where('email', 'test.user@uniurb.it')->first();        
        if ($user==null){
            $user = User::firstOrCreate([
                'email' => 'test.user@uniurb.it' ,
                'password' => Hash::make( 'testuser' ) ,
                'name' => 'test user' ,
            ] );
        }
        if (!$user->hasRole('viewer')){
            $user->assignRole('viewer');
        }

        
    }
}

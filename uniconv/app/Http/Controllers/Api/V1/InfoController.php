<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InfoController extends Controller
{
    public function version()
    {        
        return response()->json([            
            "ateneo" => "Unicam",
            "app_name" => "Uniconv",
            "app_version" => "1.0.1"
        ]);
    }

    public function online()
    {
        return response()->json([            
            "online" => true,
            "datetime" => now(),
        ]);
    }
}

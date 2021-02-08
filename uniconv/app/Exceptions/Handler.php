<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

use Symfony\Component\Debug\Exception\FlattenException;
use Symfony\Component\Debug\ExceptionHandler as SymfonyExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Mail\ExceptionOccured as ExceptionMail;
use Yajra\Pdo\Oci8\Exceptions\Oci8Exception;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        if ($this->shouldReport($exception)) {
            $this->sendExceptionEmail($exception);
        }

        Log::error($exception);
        parent::report($exception);
    }

  /**
     * Parse the exception and send email
     *
     * @param Exception $exception
     */
    public function sendExceptionEmail(Exception $exception)
    {
        try {
            $e = FlattenException::create($exception);

            $handler = new SymfonyExceptionHandler();

            $html = $handler->getHtml($e);

            Mail::queue(new ExceptionMail($html));
        } catch (Exception $e) {
            
        }
    }



    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        //message:"ORA-12170: TNS:Connect timeout occurred"
        if ($exception instanceof Oci8Exception){
            Log::error($exception);
            return response()->json(['message' => "Sottostistema in manutenzione"], 500);
        }

        return parent::render($request, $exception);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $lang = $request->header('Accept-Language');
        if ($lang && in_array($lang, ['en', 'hi', 'te'])) {
            App::setLocale($lang);
        } else {
            App::setLocale(config('app.locale'));
        }
        return $next($request);
    }
}

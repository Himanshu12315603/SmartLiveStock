<?php

namespace App\Models;

class NewAccessToken
{
    public $accessToken;
    public $plainTextToken;

    public function __construct($accessToken, string $plainTextToken)
    {
        $this->accessToken = $accessToken;
        $this->plainTextToken = $plainTextToken;
    }
}

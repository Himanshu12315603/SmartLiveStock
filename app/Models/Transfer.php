<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'transfers';

    protected $fillable = [
        'livestock_id',
        'old_owner_id',
        'new_owner_id',
        'transfer_date',
        'status',
        'verification_token',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class AppNotification extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'notifications';

    protected $fillable = [
        'user_id',
        'type',
        'payload',
        'read_at',
    ];
}

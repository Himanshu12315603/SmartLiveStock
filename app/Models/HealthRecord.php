<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class HealthRecord extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'health_records';

    protected $fillable = [
        'livestock_id',
        'symptoms',
        'diagnosis',
        'treatment',
        'medicines',
        'recovery_status',
        'vet_id',
        'notes',
    ];
}

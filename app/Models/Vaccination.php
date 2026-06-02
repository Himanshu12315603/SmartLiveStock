<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'vaccinations';

    protected $fillable = [
        'livestock_id',
        'vaccine_name',
        'vaccination_date',
        'next_due_date',
        'vet_id',
        'notes',
    ];
}

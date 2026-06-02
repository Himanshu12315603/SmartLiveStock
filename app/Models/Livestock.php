<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Livestock extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'livestock';

    protected $fillable = [
        'tag_id',
        'type',
        'breed',
        'age',
        'weight',
        'gender',
        'birth_date',
        'owner_id',
        'milk_production',
        'health_status',
        'image_path',
        'qr_code_path',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}

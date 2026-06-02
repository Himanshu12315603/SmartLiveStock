<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class MarketplaceListing extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'marketplace';

    protected $fillable = [
        'livestock_id',
        'seller_id',
        'price',
        'status',
        'listing_date',
        'details',
    ];

    protected $casts = [
        'listing_date' => 'datetime',
    ];
}

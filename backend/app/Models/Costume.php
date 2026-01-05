<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Costume extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price_per_day',
        'image',
        'category',
        'size',
        'available'
    ];

    protected $casts = [
        'price_per_day' => 'decimal:2',
        'available' => 'boolean'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}





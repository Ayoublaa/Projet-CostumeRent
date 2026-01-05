<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Jean Dupont',
                'email' => 'jean@test.com',
                'password' => Hash::make('123456'),
                'phone' => '06 12 34 56 78',
                'address' => '123 Rue de Paris, 75001 Paris'
            ],
            [
                'name' => 'Marie Martin',
                'email' => 'marie@test.com',
                'password' => Hash::make('123456'),
                'phone' => '06 98 76 54 32',
                'address' => '45 Avenue des Champs, 75008 Paris'
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@costumerent.com',
                'password' => Hash::make('admin123'),
                'phone' => '01 23 45 67 89',
                'address' => '1 Place de la Location, 75000 Paris'
            ],
            [
                'name' => 'Test User',
                'email' => 'test@test.com',
                'password' => Hash::make('test123'),
                'phone' => '06 00 00 00 00',
                'address' => '10 Rue Test, 75000 Paris'
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}





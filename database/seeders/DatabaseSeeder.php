<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Livestock;
use App\Models\MarketplaceListing;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Truncate existing collections to avoid duplicates/conflicts
        User::truncate();
        Livestock::truncate();
        MarketplaceListing::truncate();
        // 1. Create a dummy Farmer
        $farmer = User::create([
            'name' => 'John Doe',
            'email' => 'farmer@example.com',
            'password' => Hash::make('password'),
            'role' => 'farmer',
            'phone' => '1234567890',
            'address' => '123 Farm Lane, Texas'
        ]);

        // 2. Create another Farmer
        $farmer2 = User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'farmer',
            'phone' => '0987654321',
            'address' => '456 Ranch Road, Wyoming'
        ]);

        // 3. Create a Vet
        $vet = User::create([
            'name' => 'Dr. Animal Care',
            'email' => 'vet@example.com',
            'password' => Hash::make('password'),
            'role' => 'veterinary',
            'phone' => '5551112222',
            'address' => 'City Vet Clinic'
        ]);

        // 4. Create dummy livestock for John
        $livestockData = [
            ['type' => 'Cow', 'breed' => 'Holstein', 'age' => 4, 'weight' => 600, 'gender' => 'Female'],
            ['type' => 'Bull', 'breed' => 'Angus', 'age' => 3, 'weight' => 850, 'gender' => 'Male'],
            ['type' => 'Sheep', 'breed' => 'Merino', 'age' => 2, 'weight' => 80, 'gender' => 'Female'],
            ['type' => 'Pig', 'breed' => 'Yorkshire', 'age' => 1, 'weight' => 120, 'gender' => 'Male'],
            ['type' => 'Goat', 'breed' => 'Boer', 'age' => 3, 'weight' => 65, 'gender' => 'Female'],
            ['type' => 'Horse', 'breed' => 'Quarter Horse', 'age' => 5, 'weight' => 450, 'gender' => 'Male'],
        ];

        foreach ($livestockData as $idx => $data) {
            $tagId = 'TAG-' . strtoupper(Str::random(6));
            // Generate QR code SVG for dummy data
            $qrContent = config('app.url') . '/livestock/' . $tagId;
            $qrCodeImage = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')->size(300)->generate($qrContent);
            $qrCodeName = 'qr_codes/' . $tagId . '.svg';
            \Illuminate\Support\Facades\Storage::disk('public')->put($qrCodeName, $qrCodeImage);

            $animal = Livestock::create([
                'tag_id' => $tagId,
                'type' => $data['type'],
                'breed' => $data['breed'],
                'age' => $data['age'],
                'weight' => $data['weight'],
                'gender' => $data['gender'],
                'health_status' => 'Healthy',
                'owner_id' => $idx % 2 == 0 ? $farmer->id : $farmer2->id, // Alternate ownership
                'qr_code_path' => $qrCodeName,
            ]);

            // 5. Create marketplace listing for some animals
            if ($idx % 2 == 0) {
                MarketplaceListing::create([
                    'livestock_id' => $tagId,
                    'seller_id' => $farmer->id,
                    'price' => rand(500, 3000),
                    'status' => 'active',
                    'listing_date' => now(),
                    'details' => 'Excellent condition, fully vaccinated, ready for transport.'
                ]);
            } else {
                MarketplaceListing::create([
                    'livestock_id' => $tagId,
                    'seller_id' => $farmer2->id,
                    'price' => rand(100, 2000),
                    'status' => 'active',
                    'listing_date' => now(),
                    'details' => 'Great breeding stock, calm temperament.'
                ]);
            }
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use App\Models\Vaccination;
use App\Models\HealthRecord;
use App\Models\MarketplaceListing;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function dashboardStats(Request $request)
    {
        $role = $request->user()->role;
        $userId = $request->user()->id;

        $stats = [];

        if ($role === 'farmer') {
            $stats['total_livestock'] = Livestock::where('owner_id', $userId)->count();
            $livestockIds = Livestock::where('owner_id', $userId)->pluck('_id');
            $stats['pending_vaccinations'] = Vaccination::whereIn('livestock_id', $livestockIds)
                ->where('next_due_date', '<=', now()->addDays(7))
                ->count();
            $stats['active_listings'] = MarketplaceListing::where('seller_id', $userId)->where('status', 'active')->count();
        } elseif ($role === 'veterinary') {
            $stats['total_health_records'] = HealthRecord::where('vet_id', $userId)->count();
            $stats['vaccinations_done'] = Vaccination::where('vet_id', $userId)->count();
        } elseif ($role === 'admin') {
            $stats['total_farmers'] = \App\Models\User::where('role', 'farmer')->count();
            $stats['total_livestock'] = Livestock::count();
            $stats['total_vaccinations'] = Vaccination::count();
            $stats['disease_reports'] = HealthRecord::count();

            // Breeds distribution for charts
            $stats['breed_distribution'] = Livestock::raw(function($collection) {
                return $collection->aggregate([
                    ['$group' => ['_id' => '$breed', 'count' => ['$sum' => 1]]]
                ]);
            });
        }

        return response()->json($stats);
    }
}

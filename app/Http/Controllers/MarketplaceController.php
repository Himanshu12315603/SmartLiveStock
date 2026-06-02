<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceListing;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function index()
    {
        return response()->json(MarketplaceListing::where('status', 'active')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'livestock_id' => 'required|string',
            'price' => 'required|numeric',
            'details' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['seller_id'] = $request->user()->id;
        $data['status'] = 'active';
        $data['listing_date'] = now();

        $listing = MarketplaceListing::create($data);

        return response()->json($listing, 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Models\Livestock;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        return response()->json(Transfer::where('old_owner_id', $userId)->orWhere('new_owner_id', $userId)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'livestock_id' => 'required|string',
            'new_owner_id' => 'required|string',
        ]);

        $transfer = Transfer::create([
            'livestock_id' => $request->livestock_id,
            'old_owner_id' => $request->user()->id,
            'new_owner_id' => $request->new_owner_id,
            'status' => 'pending',
            'transfer_date' => now(),
        ]);

        return response()->json($transfer, 201);
    }
}

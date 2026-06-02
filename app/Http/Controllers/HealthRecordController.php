<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use Illuminate\Http\Request;

class HealthRecordController extends Controller
{
    public function index()
    {
        return response()->json(HealthRecord::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'livestock_id' => 'required|string',
            'symptoms' => 'required|string',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
        ]);

        $data = $request->all();
        $data['vet_id'] = $request->user()->id;

        $record = HealthRecord::create($data);

        return response()->json($record, 201);
    }
}

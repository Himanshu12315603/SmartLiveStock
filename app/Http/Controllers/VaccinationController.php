<?php

namespace App\Http\Controllers;

use App\Models\Vaccination;
use App\Models\AppNotification;
use Illuminate\Http\Request;

class VaccinationController extends Controller
{
    public function index()
    {
        return response()->json(Vaccination::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'livestock_id' => 'required|string',
            'vaccine_name' => 'required|string',
            'vaccination_date' => 'required|date',
            'next_due_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['vet_id'] = $request->user()->id;

        $vaccination = Vaccination::create($data);

        return response()->json($vaccination, 201);
    }
}

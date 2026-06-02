<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DiseasePredictionController extends Controller
{
    public function predict(Request $request)
    {
        $request->validate([
            'symptoms' => 'required|string',
            'temperature' => 'required|numeric',
        ]);

        $symptomsStr = strtolower($request->symptoms);
        $temp = (float)$request->temperature;

        // Rule-based engine
        $prediction = "Unknown Condition";
        $treatment = "Consult a specialist immediately.";
        $emergency_level = "Low";

        if ($temp > 39.5) {
            if (str_contains($symptomsStr, 'blisters') || str_contains($symptomsStr, 'salivation')) {
                $prediction = "Foot and Mouth Disease (FMD)";
                $treatment = "Isolate animal immediately. Provide soft feed. Administer prescribed antivirals.";
                $emergency_level = "Critical";
            } elseif (str_contains($symptomsStr, 'cough') || str_contains($symptomsStr, 'nasal discharge')) {
                $prediction = "Bovine Respiratory Disease (BRD)";
                $treatment = "Administer broad-spectrum antibiotics and anti-inflammatories.";
                $emergency_level = "High";
            } else {
                $prediction = "General Fever / Infection";
                $treatment = "Monitor closely, administer antipyretics.";
                $emergency_level = "Medium";
            }
        } else {
            if (str_contains($symptomsStr, 'swollen udder') || str_contains($symptomsStr, 'clots in milk')) {
                $prediction = "Mastitis";
                $treatment = "Intramammary antibiotics, frequent milking, anti-inflammatories.";
                $emergency_level = "Medium";
            } elseif (str_contains($symptomsStr, 'limping') || str_contains($symptomsStr, 'lame')) {
                $prediction = "Foot Rot";
                $treatment = "Clean and trim hooves. Apply topical antibacterial spray.";
                $emergency_level = "Low";
            }
        }

        return response()->json([
            'prediction' => $prediction,
            'treatment' => $treatment,
            'emergency_level' => $emergency_level,
            'risk_score' => $emergency_level === 'Critical' ? 95 : ($emergency_level === 'High' ? 75 : 30)
        ]);
    }
}

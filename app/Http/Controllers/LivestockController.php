<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class LivestockController extends Controller
{
    public function index(Request $request)
    {
        $query = Livestock::query();

        // If farmer, only show their livestock
        if ($request->user()->role === 'farmer') {
            $query->where('owner_id', $request->user()->id);
        }

        return response()->json($query->with('owner')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'breed' => 'required|string',
            'age' => 'required|numeric',
            'weight' => 'required|numeric',
            'gender' => 'required|string',
            'birth_date' => 'nullable|date',
            'milk_production' => 'nullable|string',
            'health_status' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('livestock', 'public');
        }

        $tagId = 'TAG-' . strtoupper(Str::random(8));

        // Generate QR code
        $qrContent = config('app.url') . '/livestock/' . $tagId;
        $qrCodeImage = QrCode::format('svg')->size(300)->generate($qrContent);
        $qrCodeName = 'qr_codes/' . $tagId . '.svg';
        Storage::disk('public')->put($qrCodeName, $qrCodeImage);

        $livestock = Livestock::create([
            'tag_id' => $tagId,
            'type' => $request->type,
            'breed' => $request->breed,
            'age' => $request->age,
            'weight' => $request->weight,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'owner_id' => $request->user()->id,
            'milk_production' => $request->milk_production,
            'health_status' => $request->health_status ?? 'Healthy',
            'image_path' => $imagePath,
            'qr_code_path' => $qrCodeName,
        ]);

        return response()->json($livestock, 201);
    }

    public function show($id)
    {
        // By ID or tag_id
        $livestock = Livestock::where('_id', $id)->orWhere('tag_id', $id)->with('owner')->firstOrFail();
        return response()->json($livestock);
    }

    public function update(Request $request, $id)
    {
        $livestock = Livestock::findOrFail($id);
        
        // Ensure only owner or admin/vet can update
        if ($request->user()->role === 'farmer' && $livestock->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $livestock->update($request->all());
        return response()->json($livestock);
    }

    public function destroy(Request $request, $id)
    {
        $livestock = Livestock::findOrFail($id);

        if ($request->user()->role === 'farmer' && $livestock->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($livestock->image_path) {
            Storage::disk('public')->delete($livestock->image_path);
        }
        if ($livestock->qr_code_path) {
            Storage::disk('public')->delete($livestock->qr_code_path);
        }

        $livestock->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}

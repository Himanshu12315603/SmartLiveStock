<?php

namespace App\Http\Controllers;

use App\Models\AppNotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(AppNotification::where('user_id', $request->user()->id)->orderBy('created_at', 'desc')->get());
    }

    public function markAsRead(Request $request, $id)
    {
        $notif = AppNotification::findOrFail($id);
        if ($notif->user_id === $request->user()->id) {
            $notif->update(['read_at' => now()]);
        }
        return response()->json(['message' => 'Marked as read']);
    }
}

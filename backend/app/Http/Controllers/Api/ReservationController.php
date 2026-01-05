<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Costume;
use App\Models\Client;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with(['client', 'costume'])->get();
        return response()->json($reservations);
    }

    public function show($id)
    {
        $reservation = Reservation::with(['client', 'costume'])->find($id);
        
        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }
        
        return response()->json($reservation);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'costume_id' => 'required|exists:costumes,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'client_name' => 'required|string',
            'client_email' => 'required|email',
            'client_phone' => 'required|string',
            'client_address' => 'required|string'
        ]);

        // Créer ou trouver le client
        $client = Client::firstOrCreate(
            ['email' => $validated['client_email']],
            [
                'name' => $validated['client_name'],
                'phone' => $validated['client_phone'],
                'address' => $validated['client_address']
            ]
        );

        // Calcul du prix total
        $costume = Costume::find($validated['costume_id']);
        $start = new \DateTime($validated['start_date']);
        $end = new \DateTime($validated['end_date']);
        $days = $start->diff($end)->days;
        $totalPrice = $costume->price_per_day * $days;

        // Créer la réservation
        $reservation = Reservation::create([
            'client_id' => $client->id,
            'costume_id' => $validated['costume_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_price' => $totalPrice,
            'status' => 'pending'
        ]);

        // Marquer le costume comme non disponible
        $costume->update(['available' => false]);

        return response()->json([
            'message' => 'Réservation créée avec succès',
            'reservation' => $reservation->load(['client', 'costume'])
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::find($id);
        
        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        $reservation->update($request->all());
        return response()->json($reservation->load(['client', 'costume']));
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);
        
        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        // Remettre le costume disponible
        $reservation->costume->update(['available' => true]);
        $reservation->delete();
        
        return response()->json(['message' => 'Réservation annulée']);
    }

    // Réservations par utilisateur
    public function byUser($userId)
    {
        $reservations = Reservation::with(['costume', 'client'])
            ->whereHas('client', function($query) use ($userId) {
                $query->where('id', $userId);
            })
            ->orWhere(function($query) use ($userId) {
                // Chercher aussi par user_id si on l'ajoute plus tard
            })
            ->get();
            
        return response()->json($reservations);
    }
}

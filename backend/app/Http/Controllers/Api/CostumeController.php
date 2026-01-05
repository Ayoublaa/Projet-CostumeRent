<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Costume;
use Illuminate\Http\Request;

class CostumeController extends Controller
{
    // Liste tous les costumes
    public function index()
    {
        $costumes = Costume::all();
        return response()->json($costumes);
    }

    // Affiche un costume
    public function show($id)
    {
        $costume = Costume::find($id);
        
        if (!$costume) {
            return response()->json(['message' => 'Costume non trouvé'], 404);
        }
        
        return response()->json($costume);
    }

    // Crée un costume
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'required|string',
            'category' => 'required|string',
            'size' => 'required|string'
        ]);

        $costume = Costume::create($validated);
        return response()->json($costume, 201);
    }

    // Met à jour un costume
    public function update(Request $request, $id)
    {
        $costume = Costume::find($id);
        
        if (!$costume) {
            return response()->json(['message' => 'Costume non trouvé'], 404);
        }

        $costume->update($request->all());
        return response()->json($costume);
    }

    // Supprime un costume
    public function destroy($id)
    {
        $costume = Costume::find($id);
        
        if (!$costume) {
            return response()->json(['message' => 'Costume non trouvé'], 404);
        }

        $costume->delete();
        return response()->json(['message' => 'Costume supprimé']);
    }

    // Costumes disponibles
    public function available()
    {
        $costumes = Costume::where('available', true)->get();
        return response()->json($costumes);
    }

    // Par catégorie
    public function byCategory($category)
    {
        $costumes = Costume::where('category', $category)->get();
        return response()->json($costumes);
    }
}





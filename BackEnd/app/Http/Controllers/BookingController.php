<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    function CreateBooking(Request $req){
        DB::beginTransaction();
        try{
            $this->validate($req,[
                'customer_id' => 'required',
                'room_id' => 'required',
            ]);

            $createbooking = new Transaction;
            $createbooking->room_id = $req->input('room_id');
            $createbooking->customer_id = $req->input('customer_id');
            $createbooking->check_in = $req->input('check_in');
            $createbooking->check_out = $req->input('check_out');
            $createbooking->save();
            return response()->json($createbooking, 200);
        }
        catch(\Exception $e){
            DB::rollback();
            return response()->json(['message' => 'Failed to create booking, exception:'+$e], 500);
        }
    }

    function status($id){
        DB::update('update rooms set status = 1 where id = ?' [$id]);
        return redirect('rooms');
    }

}

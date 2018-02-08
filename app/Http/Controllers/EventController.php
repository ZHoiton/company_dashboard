<?php

namespace App\Http\Controllers;

use App\Event;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function createEvent()
    {
        $new_event = new Event();

        $new_event->user_id = request('user_id','1');
        $new_event->name = request('name','no_name');
        $new_event->start_time = request('start_time', 1);
        $new_event->end_time = request('end_time', 2);
        $new_event->description = request('description', 'no_comment');
        $new_event->save();

        return view('home');

    }
}

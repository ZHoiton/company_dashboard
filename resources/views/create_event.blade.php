@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Create Event</div>

                    <div class="card-body">
                        <form method="POST" action="{{route('createEvent')}}">
                            <input id="user_id" type="text"
                                   class="form-control{{ $errors->has('user_id') ? ' is-invalid' : '' }}"
                                   name="name" value="{{ Auth::id()}}" style="display: none">

                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text"
                                           class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}"
                                           name="name" value="{{ old('name') }}" required autofocus>

                                    @if ($errors->has('name'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="start_time" class="col-md-4 col-form-label text-md-right">Start Time</label>

                                <div class="col-md-6">
                                    <input id="start_time" type="number"
                                           class="form-control{{ $errors->has('start_time') ? ' is-invalid' : '' }}"
                                           name="start_time" value="{{ old('start_time') }}" required>

                                    @if ($errors->has('start_time'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('start_time') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="end_time" class="col-md-4 col-form-label text-md-right">End Time</label>

                                <div class="col-md-6">
                                    <input id="end_time" type="number"
                                           class="form-control{{ $errors->has('end_time') ? ' is-invalid' : '' }}"
                                           name="end_time" value="{{ old('end_time') }}" required>

                                    @if ($errors->has('end_time'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('end_time') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="description"
                                       class="col-md-4 col-form-label text-md-right">Description</label>

                                <div class="col-md-6">
                                    <input id="description" type="text"
                                           class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}"
                                           name="description" value="{{ old('description') }}" required autofocus>

                                    @if ($errors->has('description'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('description') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
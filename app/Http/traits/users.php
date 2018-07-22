<?php

namespace App\Http\traits;

use App\Rules\not123456;
use App\User;
use Validator;

trait users
{
    /**
     * take user data and save it
     * @param $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function addUser($user)
    {
        $validator = Validator::make($user, [
            'name' => 'required|min:6',
            'email' => 'required|email',
            'password'=>["required",'min:6',new not123456]
        ]);

        if ($validator->fails()) {
          return ['errors'=>$validator->errors(),'status'=>false];
        }
        User::updateOrCreate(['email'=>$user['email']], $user);
        return response()->json(['message' => 'done','status'=>true]);
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function allUsers()
    {
        return User::all();
    }

    public function deleteUser($id)
    {
        User::find($id)->delete();
    }

}




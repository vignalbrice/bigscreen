<?php

namespace App\Http\Controllers;

use App\Answer;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Survey;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use stdClass;

class BackController extends Controller
{

    public function __construct()
    {

        $this->middleware('auth:api', ['except' => ['login', 'survey']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $credentials = $request->only('email', 'password');
        if ($token = Auth::attempt($credentials)) {
            $user = $this->guard()->user();
            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
    public function getSurveys()
    {
        $survey = Survey::orderBy('id', 'asc')->get();
        return $survey->toJson();
    }
    public function getAnswers()
    {
        $users = User::where('status', true)->get();
        $answer = [];
        foreach ($users as $user) {
            $answers = $user->answers()->with('survey')->orderBy('survey_id')->get();
            array_push($answer, $answers);
        }
        return response()->json(['answer' => $answer]);
    }
    public function getChartsAnswers()
    {
        $pie6 = $this->getChartsByCountAndAnswer(6);
        $pie7 = $this->getChartsByCountAndAnswer(7);
        $pie10 = $this->getChartsByCountAndAnswer(10);
        $radar11 = $this->getRadarChartsByCountAndAnswer(11);
        $radar12 = $this->getRadarChartsByCountAndAnswer(12);
        $radar13 = $this->getRadarChartsByCountAndAnswer(13);
        $radar14 = $this->getRadarChartsByCountAndAnswer(14);
        $radar15 = $this->getRadarChartsByCountAndAnswer(15);
        return response()->json(["pie" => [$pie6, $pie7, $pie10], "radar" => [$radar11, $radar12, $radar13, $radar14, $radar15]]);
    }
    protected function getChartsByCountAndAnswer($id)
    {
        $answer = new Answer();
        $survey = new Survey();
        $stats = [];
        $question = $survey->with("answers")->where('id', $id)->first();
        $options = explode(', ', $question['option']); // a changer par json_decode
        foreach ($options as $option) {
            $count = $answer->where('label', $option)->count();
            $labels = $answer->where('label', $option)->get();
            foreach ($labels as $label) {
                $object = (object) [
                    'label' => $label->label,
                    'count' => $count,
                ];
                array_push($stats, $object);
            }
        }
        return $stats;
    }
    protected function getRadarChartsByCountAndAnswer($id)
    {
        $answer = new Answer();
        $survey = new Survey();
        $stats = [];
        $question = $survey->with("answers")->where('id', $id)->first();
        $options = explode(', ', $question['option']);
        foreach ($options as $option) {
            $count = DB::table('answers')->distinct('label')->where('label', $option)->count();
        }
        $labels = $answer->distinct('label')->where('survey_id',  $id)->get();

        foreach ($labels as $label) {

            $object = (object) [
                'label' => $label->label,
                'count' => $count,
            ];
            array_push($stats, $object);
        }

        return $stats;
    }
    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
    }
    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}

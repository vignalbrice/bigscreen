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
            $username = $user->name;
            $object = (object) [
                'username' => $username,
                'answer' => $answers
            ];
            array_push($answer, $object);
        }
        return $answer;
    }
    public function getChartsAnswers()
    {
        $pie6 = $this->getChartsByCountAndAnswer(6);
        $pie7 = $this->getChartsByCountAndAnswer(7);
        $pie10 = $this->getChartsByCountAndAnswer(10);
        $radar = $this->getRadarChartData();
        return response()->json(["pie" => [$pie6, $pie7, $pie10], "radar" => $radar]);
    }
    protected function getChartsByCountAndAnswer($id)
    {
        $answer = new Answer();
        $survey = new Survey();
        $stats = [];
        $question = $survey->with("answers")->where('id', $id)->first();
        $options = explode(', ', $question['option']);
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
    public function getRadarChartData()
    {
        $idQuestionList = [11, 12, 13, 14, 15];
        // Get title of question
        $questionData                       = [];
        foreach ($idQuestionList as $idQuestion) {
            $questionInfo                       = Survey::with(['answers'])->where('id', $idQuestion)->get()->toArray();
            $questionData_elt                   = [];
            foreach ($questionInfo as $thisQuestion) {
                // Push title and id
                $questionData_elt['title']                  = $thisQuestion['label'];
                $questionData_elt['id']                     = $idQuestion;
                $questionData_elt['data']                   = [];
                /* Labels */
                $questionData_elt['data']['labels']         = [];
                /* Datasets */
                $questionData_elt['data']['datasets']       = [];
                $datasetsArray                              = [];
                $datasetsArray['data']                      = [];
                // Get options
                $temp_choice                = explode(', ', $thisQuestion['option']);

                foreach ($temp_choice as $choice) {
                    // Get count of each option by idQuestion
                    $temp                   = Answer::with('survey')->where([['label', $choice], ['survey_id', $idQuestion]])->count();
                    // Push all data in final result
                    array_push($questionData_elt['data']['labels'], $choice);
                    if (strlen($temp) > 0) {
                        array_push($datasetsArray['data'], $temp);
                    }
                }
                array_push($questionData_elt['data']['datasets'], $datasetsArray);
            }
            array_push($questionData, $questionData_elt);
        }
        return $questionData;
    }
    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Déconnexion avec succès']);
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

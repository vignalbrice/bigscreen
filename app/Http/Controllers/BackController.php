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
        /** Include exception in auth:api routes for login and survey */
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
    /** Get list of questions survey */
    public function getSurveys()
    {
        $survey = Survey::orderBy('id', 'asc')->get();
        return $survey->toJson();
    }
    /** Get list of answers */
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
    /** Get all charts data and returns to json */
    public function getChartsAnswers()
    {
        $pie6 = $this->getPieChartsByCountAndAnswers(6);
        $pie7 = $this->getPieChartsByCountAndAnswers(7);
        $pie10 = $this->getPieChartsByCountAndAnswers(10);
        $radar = $this->getRadarChartsByCountAndAnswers();
        return response()->json(["pie" => [$pie6, $pie7, $pie10], "radar" => $radar]);
    }
    /** Get pie charts by user counted and answers with id*/
    protected function getPieChartsByCountAndAnswers($id)
    {
        $answer = new Answer();
        $survey = new Survey();
        /** Stats elements */
        $stats = [];
        /** Get question by answers and id */
        $question = $survey->with("answers")->where('id', $id)->first();
        /**Get options and convert to an array */
        $options = explode(', ', $question['option']);
        foreach ($options as $option) {
            /** Get counted answers */
            $count = $answer->where('label', $option)->count();
            /** Get labels */
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
    /** Get radar charts by user counted and answers with id*/
    public function getRadarChartsByCountAndAnswers()
    {
        $idQuestionList = [11, 12, 13, 14, 15];
        /* Get count of user who answered survey */
        $userWhoAnswered                            = User::whereNotNull('url')->count();
        if ($userWhoAnswered === 0) $userWhoAnswered = 1;
        // Survey elements
        $questionData_elt                   = [];
        // Push title and id
        $questionData_elt['data']                   = [];
        /* Labels */
        $questionData_elt['data']['labels']         = ['Qualité de l\'image', 'Confort de l\'utilisation', 'Connection réseau', 'Qualité des graphismes', 'Qualité audio'];
        /* Datasets */
        $questionData_elt['data']['datasets']       = [];
        // Get title of question
        $questionData                       = [];
        foreach ($idQuestionList as $idQuestion) {
            // Question Info
            $questionInfo                       = Survey::with(['answers'])->where('id', $idQuestion)->first();

            // Sum of array
            $sum                                        =   0;
            // Get options
            $answers                = explode(', ', $questionInfo['option']);
            foreach ($answers as $choice) {
                // Get count of each option by idQuestion
                $temp                   = Answer::with('survey')->where([['label', $choice], ['survey_id', $idQuestion]])->count();
                // Push all data in final result
                $choice_int             = (int) $choice;
                $sum                    += $choice_int * $temp;
            }
            $avg                     = round($sum / $userWhoAnswered, 2);
            array_push($questionData_elt['data']['datasets'], $avg);
        }
        array_push($questionData, $questionData_elt);

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

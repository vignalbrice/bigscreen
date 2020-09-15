<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Survey;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FrontController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $survey = Survey::orderBy('id', 'asc')->get();
        return $survey->toJson();
    }

    public function emailValidation(Request $request)
    {
        $user = new User();
        $this->validate($request, [
            'email' => 'Required|Email|Min:2|Max:80'
        ]);
        $email = $request->input('email');
        $isAlreadyUser = $user->where([['email', $email], ['user_types', 'clients']])->first();
        if (strlen($isAlreadyUser) >  0) {
            if ($isAlreadyUser->status === 1) {
                return response()->json(['error' => 'Vous avez déjà participé à notre enqûete', 'disabled' => true]);
            } else {
                return response()->json(['message' => 'Cet email est valide !', 'id' => $isAlreadyUser->id, 'isValid' => true]);
            }
        } else {
            return response()->json(['message' => 'Cet email est inexistant !', 'isValid' => false]);
        }
    }

    public function store(Request $request)
    {

        $request->validate([
            'answers' => 'array|min:19',
            'answers.answer' => 'required|string',
            'answers.id' => 'required'
        ]);
        $index = $request->all();
        $user = User::where([['id', $index['userId']], ['user_types', 'clients']])->first();
        $user->url = Str::random(20);
        $user->status = 1;
        $user->save();

        foreach ($index['answers'] as $answers) {
            $answer = Answer::create([
                'label' => $answers['answer'],
                'survey_id' => $answers['id'],
            ]);
            $answer->users()->attach($index['userId']);
            $answer->save();
        }

        return response()->json(['text' => 'Toute l’équipe de Bigscreen vous remercie pour votre engagement.<br/>Grâce à
                                votre investissement, nous vous préparons une application toujours plus
                                facile à utiliser, seul ou en famille.<br>
                                Si vous désirez consulter vos réponse ultérieurement, vous pouvez consultez
                                cette adresse:', 'url' => $user->url]);
    }

    /**
     * Display the specified resource.
     *
     * @param string $url
     * @return \Illuminate\Http\Response
     */
    public function showResultAnswersByUrl($url)
    {
        $user = User::where([['url', $url,], ['status', 1]])->first();
        $answers = $user->answers()->with('survey')->orderBy('survey_id')->get();
        return response()->json(['answers' => $answers]);
    }
}

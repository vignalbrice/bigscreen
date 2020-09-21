<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'survey_id', 'label',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class); // relaction hasMany pour lié plusieurs réponses a plusieurs utilisateurs
    }
    public function survey()
    {
        return $this->belongsTo(Survey::class); // relaction belongsTo pour lié plusieurs réponses a un seul questionnaire  
    }
}

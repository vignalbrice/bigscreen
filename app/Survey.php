<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'survey_type', 'label',
    ];
    public function answers()
    {
        return $this->hasMany(Answer::class); // relaction hasMany pour lié plusieurs réponses a un seul questionnaire
    }
}

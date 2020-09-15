<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{


    public function __construct(Faker\Generator $faker)
    {
        $this->faker = $faker;
    }
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Insertion de l'utilisateur admin pour l'interface admin
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'user_types' => 'admin',
                'status' => null,
                'password' => Hash::make('admin')
            ],
        ]);

        // Création de 3 users en utilisant la factory
        // la fonction factory de Laravel permet d'utiliser le facker définit
        factory(App\User::class, 3)->create();

        // insertion des enquêtes
        DB::table('surveys')->insert([
            [
                'label' => 'Votre adresse mail',
                'survey_type' => 'B',
                'option' => null

            ],
            [
                'label' => 'Votre âge',
                'survey_type' => 'B',
                'option' => null

            ],
            [
                'label' => 'Votre sexe',
                'survey_type' => 'A',
                'option' => 'Homme, Femme, Préfère ne pas répondre'
            ],
            [
                'label' => 'Nombre de personne dans votre foyer (adulte & enfants)',
                'survey_type' => 'C',
                'option' => '0, 1, 2, 3, 4, 5'
            ],
            [
                'label' => 'Votre profession',
                'survey_type' => 'B',
                'option' => null

            ],
            [
                'label' => 'Quel marque de casque VR utilisez vous ?',
                'survey_type' => 'A',
                'option' => 'Occulus Rift/s, HTC Vive, Windows Mixed Reality, PSVR'

            ],
            [
                'label' => 'Sur quel magasin d’application achetez vous des contenus VR ?',
                'survey_type' => 'A',
                'option' => 'SteamVR, Occulus store, Viveport, Playstation VR, Google Play, Windows store'

            ],
            [
                'label' => 'Quel casque envisagez vous d’acheter dans un futur proche ?',
                'survey_type' => 'A',
                'option' => 'Occulus Quest, Occulus Go, HTC Vive Pro'

            ],
            [
                'label' => 'Au sein de votre foyer, combien de personne utilisent votre casque VR pour regarder Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'
            ],
            [
                'label' => 'Vous utilisez principalement Bigscreen pour :',
                'survey_type' => 'A',
                'option' => 'Regarder des émissions TV en direct, regarder des films, jouer en solo, jouer en team'
            ],
            [
                'label' => 'Combien donnez vous de point pour la qualité de l’image sur Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'
            ],

            [
                'label' => 'Combien donnez vous de point pour le confort d’utilisation de l’interface Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'

            ],

            [
                'label' => 'Combien donnez vous de point pour la connection réseau de Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'

            ],

            [
                'label' => 'Combien donnez vous de point pour la qualité des graphismes 3D dans Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'

            ],

            [
                'label' => 'Combien donnez vous de point pour la qualité audio dans Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'

            ],
            [
                'label' => 'Aimeriez vous avoir des notifications plus précises au cours de vos sessions Bigscreen ?',
                'survey_type' => 'A',
                'option' => 'Oui, Non'
            ],
            [
                'label' => 'Aimeriez vous pouvoir inviter un ami à rejoindre votre session via son smartphone ?',
                'survey_type' => 'A',
                'option' => 'Oui, Non'

            ],
            [
                'label' => 'Aimeriez vous pouvoir enregistrer des émissions TV pour pouvoir les regarder ultérieurement ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'

            ],
            [
                'label' => 'Aimeriez vous jouer à des jeux exclusifs sur votre Bigscreen ?',
                'survey_type' => 'C',
                'option' => '1, 2, 3, 4, 5'
            ],
            [
                'label' => 'Quelle nouvelle fonctionnalité de vos rêve devrait exister sur Bigscreen ?',
                'survey_type' => 'B',
                'option' => null

            ],
        ]);
    }
}

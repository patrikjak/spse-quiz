(function ($) {

    var started;

    if (localStorage.getItem('started') === null) {
        started = 0;
    }
    else {
        started = parseInt(window.localStorage.getItem('started'));
    }
    window.localStorage.setItem('started', started + 1);

     var startBtn = $('#start'),
         overlay = $('.overlay'),
         elkText = $('#elk-text'),
         paaText = $('#paa-text'),
         ekoText = $('#eko-text'),
         aButton = $('.answers button'),
         questionText = $('#question');


     // q (question) = [question, option1, option2, option3, option4, good_answer]

    /*var elk1 = {
            q1: ['Čo je rezistor ?', 'merací prístroj', 'elektronická súčiastka', 'iné pomenovanie vodiča', 'iné pomenovanie izolantu', 'elektronická súčiastka'],
            q2: ['Ako vypočítame napätie pomocou Ohmovho zákona ?', 'U = R * I', 'R = I * I', 'I = R * U', 'žiadna z týchto odpovedí nie je správna', 'U = R * I'],
            q3: ['V akých jednotkách sa udáva veľkosť odporu ?', 'Henry [H]', 'Volt [V]', 'Ohm [\u2126]', 'Farad [F]', 'Ohm [\u2126]'],
            q4: ['V akých jednotkách sa udáva veľkosť elektrického prúdu ?', 'Volt [V]', 'Ampér [A]', 'žiadna z týchto odpovedí nie je správna',
                'Elektrický prúd nemá žiadnu jednotku', 'Ampér [A]']
        },
        elk2 = {
            q1: ['Pomocou akého prístroja nameráme hodnotu prúdu v obvode ?', 'voltmeter', 'osciloskop', 'ampérmeter', 'ohmmeter', 'ampérmeter'],
            q2: ['Aké napätia poznáme ?', 'jednosmerné, striedavé', 'jednosmerné, skákajúce', 'jednočlenné, striedavé', 'jednočlenné, skákajúce', 'jednosmerné,' +
            ' striedavé'],
            q3: ['Čo označuje jednotka Watt [W] ?', 'prúd', 'indukčnosť cievky', 'príkon', 'výkon', 'výkon'],
            q4: ['V akých jednotkách sa udáva veľkosť elektrického napätia ?', 'Watt [W]', 'Ampér [A]', 'Volt [V]', 'Ohm [\u2126]', 'Volt [V]']
        },
        elk3 = {
            q1: ['Aký materiál patrí medzi vodiče ?', 'drevo', 'textil', 'guma', 'meď', 'meď'],
            q2: ['Čo neobsahuje atóm ?', 'elektrón', 'protón', 'neutrón', 'pentatron', 'pentatron'],
            q3: ['Aké zapojenia rezistorov nepoznáme ?', 'sériové', 'zmiešané', 'sériovo-paralelné', 'paralelné', 'zmiešané'],
            q4: ['Aké napätie sa nachádza v sieti (zásuvke) ?', '220 V', '120 V', '580 V', '22 V', '220 V']
        },
        paa1 = {
            q1: ['Čo je hardware ?', 'programové vybavenie počítača', 'technické vybavenie počítača', 'programovací jazyk', 'iný názov pre procesor',
                'technické vybavenie počítača'],
            q2: ['Čo je software ?', 'programové vybavenie počítača', 'programovací jazyk', 'technické vybavenie počítača', 'klávesnica a myš',
                'programové vybavenie počítača'],
            q3: ['Ktoré z možností je programovací jazyk ?', 'Chava', 'Hython', 'SataScript', 'PHP', 'PHP'],
            q4: ['Akú klávesovú skratku používame pre uloženie ?', 'Ctrl + O', 'Ctrl + S', 'Ctrl + H', 'Ctrl + F', 'Ctrl + S']
        },
        paa2 = {
            q1: ['Aký program slúži na prehliadanie internetových stránok ?', 'Office 365', 'Google Chrome', 'Skype', 'Visual Studio 2017', 'Google Chrome'],
            q2: ['Aký z uvedených operačných systémov je bezplatný ?', 'Windows', 'Macintosh', 'Linux', 'Žiadna z týchto odpovedí nie je správna', 'Linux'],
            q3: ['Čo znamená HTML ?', 'Hypertransfer Mobile Language', 'Hypertext Markup Language', 'High Transfer Measure Language', 'Hypertext Master Language',
                'Hypertext Markup Language'],
            q4: ['Akú príponu má súbor programu Word ?', '.dccx', '.docx', '.dxxc', '.doxc', '.docx'],
        },
        paa3 = {
            q1: ['Čo znamená skratka USB ?', 'Universal Serial Bus', 'Universal Service Bus', 'Universal Seating Buz', 'Universal Sending Backend',
                'Universal Serial Bus'],
            q2: ['Čo znamená IP ?', 'Internet Public', 'Internet Protocol', 'Internet Provider', 'International Protocol', 'Internet Protocol'],
            q3: ['Čo je JavaScript', 'program', 'programovací jazyk', 'hardware', 'protokol', 'programovací jazyk'],
            q4: ['Ktorý formát súborov podporuje prehliadnosť obrázkov ?', '.jpg', '.tiff', '.psd', '.png', '.png']
        },
        eko1 = {
            q1: ['Pod pojmom barter rozumieme:', 'výmenu tovaru za zlato', 'výmenu tovaru za iný tovar', 'výmenu tovaru za plátno', 'výmenu tovaru za kožušiny',
                'výmenu tovaru za iný tovar'],
            q2: ['Prvou formou peňazí boli:', 'plátno', 'depozitné peniaze', 'zlaté dukáty', 'tovarové peniaze', 'tovarové peniaze'],
            q3: ['Bankovky patria medzi:', 'bankové peniaze', 'papierové peniaze', 'zlaté peniaze', 'tovarové peniaze', 'papierové peniaze'],
            q4: ['K súčasným formám peňazí nepatria:', 'bankovky a mince', 'bitcoiny', 'depozitné peniaze', 'zlaté dukáty', 'zlaté dukáty']
        },
        eko2 = {
            q1: ['Depozitné peniaze sú:', 'bezhotovostné peniaze', 'hotovostné peniaze', 'papierové peniaze', 'elektronické peniaze', 'bezhotovostné peniaze'],
            q2: ['Mena predstavuje:', 'bankovky a mince', 'národná forma peňazí', 'bezhotovostné peniaze', 'kryptomena', 'národná forma peňazí'],
            q3: ['Úrok je:', 'cena peňazí', 'hodnota úveru', 'hodnota cenných papierov', 'cena majetku', 'cena peňazí'],
            q4: ['Dlžníkom je ten, kto:', 'požičiava si peniaze', 'zarába peniaze', 'poskytuje pôžičku', 'míňa peniaze', 'požičiava si peniaze']
        },
        eko3 = {
            q1: ['Veriteľom je ten, kto:', 'požičiava peniaze', 'zarába peniaze', 'poskytuje pôžičku', 'míňa peniaze', 'poskytuje pôžičku'],
            q2: ['Inflácia znamená:', 'znehodnotenie peňazí', 'znehodnotenie devíz', 'znehodnotenie úverov', 'znehodnotenie úrokov',
                'znehodnotenie peňazí'],
            q3: ['Pod pojmom mzda rozumieme:', 'plat', 'mzda', 'cena práce', 'odmena', 'cena práce'],
            q4: ['Filantropia je:', 'ľudomilstvo', 'dobročinnosť', 'pomoc sociálne slabým', 'darcovstvo', 'dobročinnosť']
        };*/
    var quest = {
            q1: ['Koľko dievčat je aktuálne na škole ?', '15', '25', '31', '44', '31']
        },
        quest1 = {
            q1: ['Koľko rokov má škola ?', '67', '100', '84', '55', '67']
        },
        quest2 = {
            q1:  ['Koľko odborov je na škole ?', '4', '1', '2', '3', '3']
        },
        quest3 = {
            q1: ['Aký je počet študentov v jednom ročníku ?', '101', '180', '190', '200', '180']
        },
        quest4 = {
            q1: ['Koľko pedagógov je na škole ?', '48', '55', '33', '66', '48']
        },
        quest5 = {
            q1: ['Ako sa volá robot po pravej ruke ?', 'Fero', 'Nao', 'Kreo', 'Nano', 'Nao']
        };


    var option1 = $('#btn1'),
        option2 = $('#btn2'),
        option3 = $('#btn3'),
        option4 = $('#btn4');

    var goodAnswer,
        goodAnswers = [0,0,0], // 0 => elk | 1 => paa | 2 => eko
        countQuestion = 0;

    var question = false;

    var scoreElk,
        scorePaa,
        scoreEko;

    var subjects = 3,
        /*questionsInSubject = 3,*/
        questionsInSubject = 6,
        /*totalQuestions = subjects * questionsInSubject;*/
        totalQuestions = 6;

    var result = $('#result');

    function randomProperty(obj) {
        var keys = Object.keys(obj);
        return obj[keys[Math.floor(Math.random() * keys.length)]];
    }
    function getQuestion() {
        overlay.fadeIn(500);
        var question;
        switch (countQuestion) {
            case 0:
                /*question = randomProperty(elk1);*/
                question = randomProperty(quest);
                break;
            case 1:
                /*question = randomProperty(elk2);*/
                question = randomProperty(quest1);
                break;
            case 2:
                /*question = randomProperty(elk3);*/
                question = randomProperty(quest2);
                break;
            case 3:
                /*question = randomProperty(paa1);*/
                question = randomProperty(quest3);
                break;
            case 4:
                /*question = randomProperty(paa2);*/
                question = randomProperty(quest4);
                break;
            case 5:
                /*question = randomProperty(paa3);*/
                question = randomProperty(quest5);
                break;
            /*case 6:
                question = randomProperty(eko1);
                break;
            case 7:
                question = randomProperty(eko2);
                break;
            case 8:
                question = randomProperty(eko3);
                break;*/
            case totalQuestions:
                overlay.fadeOut(500);
                startBtn.text('Skončiť');
                result.fadeIn(500);
                $('.word').fadeOut(500);
                /*if ((scoreElk > scorePaa && scoreElk > scoreEko) || scoreElk > scorePaa || scoreElk > scoreEko) {
                    result.text('elektrotechnika.')
                }
                else if ((scorePaa > scoreElk && scorePaa > scoreEko) || scorePaa > scoreElk || scorePaa > scoreEko) {
                    result.text('informačné a sieťové technológie.');
                }
                else if ((scoreEko > scoreElk && scoreEko > scorePaa) || scoreEko > scoreElk || scoreEko > scorePaa) {
                    result.text('IT manažment procesov.');
                }
                else if (scoreEko === scoreElk || scoreEko === scorePaa) {
                    result.text('IT manažment procesov.');
                }
                else if (scorePaa === scoreElk) {
                    result.text('elektrotechnika.');
                }
                else if ((scoreElk === scoreEko && scorePaa <= scoreEko)||(scorePaa === scoreEko || scoreElk <= scoreEko)) {
                    result.text('IT manažment procesov.');
                }*/
                break;
            default:
                question = randomProperty(elk1);
                break;
        }
        questionText.text(question[0]);
        option1.text(question[1]);
        option2.text(question[2]);
        option3.text(question[3]);
        option4.text(question[4]);
        goodAnswer = question[5];
    }


    aButton.on('click', function () {
        countQuestion++;
       var selected = $(this),
           selectedText = $(this).text();
        function evaluation(result) {
            selected.addClass(result);
            setTimeout(function () {
                selected.removeClass(result);
                if (countQuestion <= totalQuestions) {
                    getQuestion();
                }
            }, 500);
        }
       if (selectedText === goodAnswer) {
           /*if (countQuestion <= 3) {
                goodAnswers[0]++;
                scoreElk = Math.floor((goodAnswers[0] * 100) / questionsInSubject);
                elkText.text(scoreElk + ' %');
           }
           else if (countQuestion <= 6 && countQuestion > 3) {
               goodAnswers[1]++;
               scorePaa = Math.floor((goodAnswers[1] * 100) / questionsInSubject);
               paaText.text(scorePaa + ' %');
           } 
           else if (countQuestion <= 9 && countQuestion > 6) {
               goodAnswers[2]++;
               scoreEko = Math.floor((goodAnswers[2] * 100) / questionsInSubject);
               ekoText.text(scoreEko + ' %');
           }*/
           goodAnswers[0]++;
           scoreElk = Math.floor((goodAnswers[0] * 100) / questionsInSubject);
           elkText.text(scoreElk + ' %');
           evaluation('good');
       }
       else {
           evaluation('bad');
       }
    });

     startBtn.on('click', function () {
         if ($(this).text() === 'Skončiť') window.location.reload();
         else {
             question = true;
             if (question) {
                 getQuestion();
                 question = false;
             }
         }
     });

}(jQuery));
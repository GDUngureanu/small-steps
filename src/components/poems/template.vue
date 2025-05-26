<script setup>
import articleTemp from '../../templates/article.vue';
import todoTemp from '../../templates/todo.vue';
</script>

<script>
import toDoList from './todo.json';

export default {
    name: 'PoemsTemplate',
    data() {
        return {
            toDoList: toDoList
        };
    }
};
</script>

<template>

    <articleTemp title="Poems" meta="May 26, 2025 by G. D. Ungureanu">
        <p>I'm working on compiling a list of Poems.</p>

        <todoTemp :toDoList="toDoList" />
    </articleTemp>

    <articleTemp title="Memento Mori" meta="1872 by Mihai Eminescu">
        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Turma visurilor mele eu le pasc ca oi de aur,</p>
            <p class="mb-0 fst-italic">Când a nopții întunerec înstelatul rege maur</p>
            <p class="mb-0 fst-italic">Lasă norii lui molateci înfoiați în pat ceresc,</p>
            <p class="mb-0 fst-italic">Iară luna argintie, ca un palid dulce soare,</p>
            <p class="mb-0 fst-italic">Vrăji aduce peste lume printr-a stelelor ninsoare,</p>
            <p class="mb-0 fst-italic">Când în straturi luminoase basmele copile cresc.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Mergi, tu, luntre-a vieții mele, pe-a visării lucii valuri,</p>
            <p class="mb-0 fst-italic">Până unde-n ape sfinte se ridică mândre maluri,</p>
            <p class="mb-0 fst-italic">Cu dumbrăvi de laur verde și cu lunci de chiparos,</p>
            <p class="mb-0 fst-italic">Unde-n ramurile negre o cântare-n veci suspină,</p>
            <p class="mb-0 fst-italic">Unde sfinții se preîmblă în lungi haine de lumină,</p>
            <p class="mb-0 fst-italic">Unde-i moartea cu-aripi negre și cu chipul ei frumos.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Una-i lumea-nchipuirii cu-a ei visuri fericite,</p>
            <p class="mb-0 fst-italic">Alta-i lumea cea aievea, unde cu sudori muncite</p>
            <p class="mb-0 fst-italic">Te încerci a scoate lapte din a stâncei coaste seci;</p>
            <p class="mb-0 fst-italic">Una-i lumea-nchipuirii cu-a ei mândre flori de aur,</p>
            <p class="mb-0 fst-italic">Alta unde cerci viața s-o-ntocmești, precum un faur</p>
            <p class="mb-0 fst-italic">Cearc-a da fierului aspru forma cugetării reci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Las-să dorm... să nu știu lumea ce dureri îmi mai păstrează.</p>
            <p class="mb-0 fst-italic">Îmbătat de-un cântec vecinic, îndrăgit de-o sfântă rază,</p>
            <p class="mb-0 fst-italic">Eu să văd numai dulceață unde alții văd necaz,</p>
            <p class="mb-0 fst-italic">Căci ș-așa ar fi degeaba ca să văd cu ochiul bine;</p>
            <p class="mb-0 fst-italic">De văd răul sau de nu-l văd, el pe lume tot rămâne</p>
            <p class="mb-0 fst-italic">Și nimic nu-mi folosește de-oi cerca să rămân treaz.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">N-au mai spus și alții lumii de-a ei rele să se lase?</p>
            <p class="mb-0 fst-italic">Cine-a vrut s-asculte vorba? Cine-aude? Cui îi pasă?</p>
            <p class="mb-0 fst-italic">Toate au trecut pe lume numai răul a rămas.</p>
            <p class="mb-0 fst-italic">O, acele uriașe, însă mute piramide</p>
            <p class="mb-0 fst-italic">Cari stau ca veacuri negre în pustiuri împietrite</p>
            <p class="mb-0 fst-italic">Câte-au mai văzut și ele ce-ar vorbi de-ar avea glas.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Când posomorâtul basmu vechea secolilor strajă</p>
            <p class="mb-0 fst-italic">Îmi deschide cu chei de-aur și cu-a vorbelor lui vrajă</p>
            <p class="mb-0 fst-italic">Poarta naltă de la templul unde secolii se torc</p>
            <p class="mb-0 fst-italic">Eu sub arcurile negre, cu stâlpi nalți suiți în stele,</p>
            <p class="mb-0 fst-italic">Ascultând cu adâncime glasul gândurilor mele,</p>
            <p class="mb-0 fst-italic">Uriașa roat-a vremei înapoi eu o întorc</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și privesc... Codrii de secoli, oceane de popoare</p>
            <p class="mb-0 fst-italic">Se întorc cu repejune ca gândirile ce zboară</p>
            <p class="mb-0 fst-italic">Și icoanele-s în luptă eu privesc și tot privesc</p>
            <p class="mb-0 fst-italic">La vo piatră ce însamnă a istoriei hotară,</p>
            <p class="mb-0 fst-italic">Unde lumea în căi nouă, după nou cântar măsoară</p>
            <p class="mb-0 fst-italic">Acolo îmi place roata câte-o clipă s-o opresc!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Colo stau sălbateci negri cu topoarele de piatră.</p>
            <p class="mb-0 fst-italic">În pustiu aleargă vecinic, fără casă, fără vatră,</p>
            <p class="mb-0 fst-italic">Cap de lup e-a lor căciulă, pe-a lor umeri, piei de urs;</p>
            <p class="mb-0 fst-italic">Colo-nchină idolatrul nențelesul foc de lemne,</p>
            <p class="mb-0 fst-italic">Colo magul lui îi scrie pe o piatră strâmbe semne</p>
            <p class="mb-0 fst-italic">Să nu poat-a le-nțelege lungul secolilor curs.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Babilon, cetate mândră cât o țară, o cetate</p>
            <p class="mb-0 fst-italic">Cu muri lungi cât patru zile, cu o mare de palate</p>
            <p class="mb-0 fst-italic">Și pe ziduri uriașe mari grădini suite-n nori;</p>
            <p class="mb-0 fst-italic">Când poporul gemea-n piețe l-a grădinei lungă poală</p>
            <p class="mb-0 fst-italic">Cum o mare se frământă, pe când vânturi o răscoală,</p>
            <p class="mb-0 fst-italic">Cugeta Semiramide prin dumbrăvile răcori.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Acel rege o lume-n mâna-i schimbătoarea lui gândire</p>
            <p class="mb-0 fst-italic">La o lume dă viață, la un secol fericire</p>
            <p class="mb-0 fst-italic">Din portalele-i de aur ca un soare răsărea,</p>
            <p class="mb-0 fst-italic">Dar puternica lui ură era secol de urgie;</p>
            <p class="mb-0 fst-italic">Ce-i lipsea lui oare-n lume chiar ca Dumnezeu să fie?</p>
            <p class="mb-0 fst-italic">Ar fi fost Dumnezeu însuși, dacă dacă nu murea.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Asia-n plăceri molateci e-mbătată, somnoroasă,</p>
            <p class="mb-0 fst-italic">Bolțile-s ținute-n aer de columne luminoase</p>
            <p class="mb-0 fst-italic">Și la mese-n veci întinse e culcat Sardanapal;</p>
            <p class="mb-0 fst-italic">Și sub degete măiestre arfele cugetă mite,</p>
            <p class="mb-0 fst-italic">După plac și-mpart mesenii a cântării flori uimite,</p>
            <p class="mb-0 fst-italic">Vinuri dulci, mirositoare și femei cu chipul pal.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Azi? Vei rătăci degeaba în câmpia nisipoasă:</p>
            <p class="mb-0 fst-italic">Numai aerul se-ncheagă în tablouri mincinoase,</p>
            <p class="mb-0 fst-italic">Numai munții, garzi de piatră stau și azi în a lor post;</p>
            <p class="mb-0 fst-italic">Ca o umbră asiatul prin pustiu calu-și alungă,</p>
            <p class="mb-0 fst-italic">De-l întrebi: unde-i Ninive? el ridică mâna-i lungă,</p>
            <p class="mb-0 fst-italic">­ Unde este? nu știu, zice, mai nu știu nici unde-a fost.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Nilul mișcă valuri blonde pe câmpii cuprinși de maur</p>
            <p class="mb-0 fst-italic">Peste el cerul d-Egipet, disfăcut în foc și aur,</p>
            <p class="mb-0 fst-italic">Pe-a lui maluri gălbui, șese, stuful crește din adânc;</p>
            <p class="mb-0 fst-italic">Flori, giuvaeruri în aer, sclipesc tainice în soare,</p>
            <p class="mb-0 fst-italic">Unele-albe, nalte, fragezi, ca argintul de ninsoare,</p>
            <p class="mb-0 fst-italic">Alte roșii ca jăratic, alte-albastre, ochi ce plâng.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și prin tufele de mături, ce cresc verzi, adânce, dese,</p>
            <p class="mb-0 fst-italic">Păsări îmblânzite-n cuiburi, distind penele alese,</p>
            <p class="mb-0 fst-italic">Ciripind cu ciocu-n soare, gugiulindu-se cu-amor;</p>
            <p class="mb-0 fst-italic">Înecat în vecinici visuri, răsărit din sfinte-izvoară,</p>
            <p class="mb-0 fst-italic">Nilul mișc-a lui legendă și oglinda-i galben-clară</p>
            <p class="mb-0 fst-italic">Cătră marea liniștită, ce îneacă a lui dor.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">De-a lui maluri sunt unite câmpii verzi și țări ferice</p>
            <p class="mb-0 fst-italic">Memfis, colo, -n depărtare, cu zidirile-i antice,</p>
            <p class="mb-0 fst-italic">Mur pe mur, stâncă pe stâncă o cetate de giganți</p>
            <p class="mb-0 fst-italic">Sunt gândiri arhitectonici de-o grozavă măreție,</p>
            <p class="mb-0 fst-italic">Au zidit munte pe munte în antica lui trufie,</p>
            <p class="mb-0 fst-italic">Le-a-mbrăcat cu-argint ca-n soare să lucească într-un lanț</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și să pară răsărită din visările pustiei,</p>
            <p class="mb-0 fst-italic">Din nisipuri argintoase în mișcarea vijeliei,</p>
            <p class="mb-0 fst-italic">Ca un vis al mării sfinte, reflectat de cerul cald</p>
            <p class="mb-0 fst-italic">Ș-aruncat în depărtare... Colo se ridic trufașe</p>
            <p class="mb-0 fst-italic">Și eterne ca și moartea piramidele-uriașe,</p>
            <p class="mb-0 fst-italic">Racle ce încap în ele fantazia unui Scald.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Se-nserează. Nilul doarme și ies stelele din strungă,</p>
            <p class="mb-0 fst-italic">Luna-n mare își aruncă chipul și prin nori le-alungă</p>
            <p class="mb-0 fst-italic">Cine-a deschis piramida și-năuntru a intrat?</p>
            <p class="mb-0 fst-italic">Este regele. În haină de-aur roș și pietre scumpe,</p>
            <p class="mb-0 fst-italic">El intră să vad-acolo tot trecutul. I se rumpe</p>
            <p class="mb-0 fst-italic">A lui suflet când privește peste-al vremurilor vad.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">În zădar guvernă regii lumea cu înțelepciune</p>
            <p class="mb-0 fst-italic">Se-nmulțesc semnele rele, se-mpuțin faptele bune</p>
            <p class="mb-0 fst-italic">În zădar caut-al vieței înțeles nedezlegat.</p>
            <p class="mb-0 fst-italic">Iese-n noapte și-a lui umbră lung-întins se desfășoară</p>
            <p class="mb-0 fst-italic">Pe-ale Nilului mari valuri, astfel pe-unde de popoară</p>
            <p class="mb-0 fst-italic">Umbra gândurilor regii se aruncă-ntunecat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ale piramidei visuri, ale Nilului reci unde,</p>
            <p class="mb-0 fst-italic">Ale trestiilor sunet, ce sub luna ce pătrunde</p>
            <p class="mb-0 fst-italic">Par a fi snopuri giganteci de lungi sulițe de-argint</p>
            <p class="mb-0 fst-italic">Toat-a apei ș-a pustiei și a nopții măreție</p>
            <p class="mb-0 fst-italic">Se unesc să-mbrace mândru vechea-acea împărăție,</p>
            <p class="mb-0 fst-italic">Să învie în deșerturi șir de visuri ce te mint.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Râul sânt ni povestește cu-ale undelor lui gure</p>
            <p class="mb-0 fst-italic">De-a izvorului său taină, despre vremi apuse, sure;</p>
            <p class="mb-0 fst-italic">Sufletul se-mbată-n visuri, cari-alunecă în zbor,</p>
            <p class="mb-0 fst-italic">Palmii risipiți în crânguri, auriți de-a lunei raze,</p>
            <p class="mb-0 fst-italic">Nalță zveltele lor trunchiuri. Noaptea-i clară, luminoasă,</p>
            <p class="mb-0 fst-italic">Undele visează spume, cerurile-nșiră nori.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și în templele mărețe colonade-n marmuri albe</p>
            <p class="mb-0 fst-italic">Noaptea zeii se preîmblă în vestmintele lor dalbe</p>
            <p class="mb-0 fst-italic">Ș-ale preoților cântec sună-n arfe de argint</p>
            <p class="mb-0 fst-italic">Și la vântul din pustie, la răcoarea nopții brună,</p>
            <p class="mb-0 fst-italic">Piramidele, din creștet, aiurind și jalnic sună;</p>
            <p class="mb-0 fst-italic">Și sălbatic se plâng regii în giganticul mormânt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">În zidirea cea antică sus în frunte-i turnul maur.</p>
            <p class="mb-0 fst-italic">Magul priivea pe gânduri în oglinda lui de aur,</p>
            <p class="mb-0 fst-italic">Unde-a cerului mii stele ca-ntr-un centru se adun.</p>
            <p class="mb-0 fst-italic">El în mic privește-acolo căile lor tăinuite</p>
            <p class="mb-0 fst-italic">Și c-un ac el zugrăvește cărărușile găsite</p>
            <p class="mb-0 fst-italic">A aflat sâmburul lumii, tot ce-i drept, frumos și bun.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și se poate ca spre răul unei ginți efeminate,</p>
            <p class="mb-0 fst-italic">Regilor pătați de crime, preoțimei desfrânate,</p>
            <p class="mb-0 fst-italic">Magul, gard al răzbunării, a citit semnul întors.</p>
            <p class="mb-0 fst-italic">Ș-atunci vântul ridicat-a tot nisipul din pustiuri,</p>
            <p class="mb-0 fst-italic">Astupând cu dânsu-orașe, ca gigantice sicriuri</p>
            <p class="mb-0 fst-italic">Unei ginți, ce fără viață-ngreuia pământul stors.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Uraganu-acum aleargă pân-ce caii lui îi crapă</p>
            <p class="mb-0 fst-italic">Și în Nil numai pustiul nisipișul și-l adapă,</p>
            <p class="mb-0 fst-italic">Așternându-l peste câmpii cei odată înfloriți;</p>
            <p class="mb-0 fst-italic">Memfis, Theba, țara-ntreagă coperită-i de ruine,</p>
            <p class="mb-0 fst-italic">Prin pustiu străbat sălbatec mari familii beduine,</p>
            <p class="mb-0 fst-italic">Sorind viața lor de basme prin câmpie nisipiți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar și-acum, turburând stele pe-ale Nilului lungi unde,</p>
            <p class="mb-0 fst-italic">Noaptea, flamingo cel roșu, apa-ncet, încet pătrunde</p>
            <p class="mb-0 fst-italic">Și-acum luna argintește tot Egipetul antic;</p>
            <p class="mb-0 fst-italic">Ș-atunci sufletul visează toat-istoria străveche,</p>
            <p class="mb-0 fst-italic">Glasuri din trecut străbate l-a prezentului ureche</p>
            <p class="mb-0 fst-italic">Din a valurilor sfadă prorociri se aridic.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și-atunci Memfis se ridică, argintos gând al pustiei,</p>
            <p class="mb-0 fst-italic">Închegare măiestrită din suflarea vijeliei</p>
            <p class="mb-0 fst-italic">Beduini ce stau în lună, o minune o privesc,</p>
            <p class="mb-0 fst-italic">Povestindu-și basme mândre mestecate numa-n stele</p>
            <p class="mb-0 fst-italic">Despre-orașul care iese din pustiile de jele.</p>
            <p class="mb-0 fst-italic">Din pământ și de sub mare, s-aud sunete ce cresc.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Marea-n fund clopote are, care sună-n orice noapte,</p>
            <p class="mb-0 fst-italic">Nilu-n fund grădine are, pomi cu mere d-aur coapte</p>
            <p class="mb-0 fst-italic">Sub nisipul din pustie cufundat e un popor,</p>
            <p class="mb-0 fst-italic">Ce cu-orașele-i deodată se trezește și se duce</p>
            <p class="mb-0 fst-italic">Sus, în curțile din Memfis, unde-n săli lumină luce.</p>
            <p class="mb-0 fst-italic">Ei petrec în vin și-n chiot orice noapte pân-în zori.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Vezi Iordanul care udă câmpii verzii Palestine:</p>
            <p class="mb-0 fst-italic">Dintre vii cu struguri de-aur se ridic mândre coline,</p>
            <p class="mb-0 fst-italic">Pe Sion, templul Iehovei, o minune îl privim;</p>
            <p class="mb-0 fst-italic">Codrii de maslin s-amestec printre lunci de dafin verde,</p>
            <p class="mb-0 fst-italic">Chidron scaldă-n unda-i clară ierburi mari ș-apoi se pierde</p>
            <p class="mb-0 fst-italic">În cetatea ce-n văi doarme miticul Ierusalim.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și în Libanon văzut-am rătăcite căprioare</p>
            <p class="mb-0 fst-italic">Și pe lanuri secerate am văzut mândre fecioare</p>
            <p class="mb-0 fst-italic">Purtând pe-umerele albe auritul snop de grâu.</p>
            <p class="mb-0 fst-italic">Alte vrând să treacă apa cu picioarele lor goale</p>
            <p class="mb-0 fst-italic">Ridicară rușinoase și zâmbind albele poale,</p>
            <p class="mb-0 fst-italic">Turburând cu pulpe netezi fața limpedelui râu.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Am văzut regii Iudeei în biserica măreață,</p>
            <p class="mb-0 fst-italic">Unde marmura în arcuri se ridică îndrăzneață</p>
            <p class="mb-0 fst-italic">Și columnele înalte cătră cer pare c-arat;</p>
            <p class="mb-0 fst-italic">Văzui pe David în lacrimi rupând haina lui bogată</p>
            <p class="mb-0 fst-italic">Zdrobind arfa-i sunătoare de o marmură curată,</p>
            <p class="mb-0 fst-italic">Genunchind să-i ierte Domnul osânditul lui păcat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Solomon, poetul-rege, tocmind glasul unei lire</p>
            <p class="mb-0 fst-italic">Și făcând-o să răsune o psalmodică gândire,</p>
            <p class="mb-0 fst-italic">Moaie-n sunetele sfinte degetele-i de profet;</p>
            <p class="mb-0 fst-italic">El cânta pe împăratul în hlamidă de lumină,</p>
            <p class="mb-0 fst-italic">Soarele stătea pe ceruri auzind cântarea-i lină,</p>
            <p class="mb-0 fst-italic">Lumea asculta uimită glasu-i dulce și încet.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar ieșind din templul sacru lasă gândul lui să cadă,</p>
            <p class="mb-0 fst-italic">Căci amorul îl așteaptă cu-a lui umeri de zăpadă,</p>
            <p class="mb-0 fst-italic">Raze moi în ochii negri el dă lirei alt acord:</p>
            <p class="mb-0 fst-italic">Căci femeile-l așteaptă cu șireata lor zâmbire,</p>
            <p class="mb-0 fst-italic">Brune unele ca gânduri din poveștile asire,</p>
            <p class="mb-0 fst-italic">Alte blonde cu păr de-aur vise tainice de Nord.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar venit-a judecata, și de sălcii plângătoare</p>
            <p class="mb-0 fst-italic">Cântărețul își anină arfa lui tremurătoare;</p>
            <p class="mb-0 fst-italic">În zădar rugați pieirea muri se năruie și cad!</p>
            <p class="mb-0 fst-italic">Cad și scări, ș-aurite arcuri, grinzi de cedru, porți de-aramă</p>
            <p class="mb-0 fst-italic">Soarele privește galben peste-a morții lungă dramă</p>
            <p class="mb-0 fst-italic">Și s-ascunde în nori roșii, de spectacol speriat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și popor și regi și preoți îngropați-s sub ruine.</p>
            <p class="mb-0 fst-italic">Pe Sion templul se sparge nici un arc nu se mai ține,</p>
            <p class="mb-0 fst-italic">Azi grămezi mai sunt de piatră din cetatea cea de ieri .</p>
            <p class="mb-0 fst-italic">Cedri cad din vârf de munte și Livanul pustiește,</p>
            <p class="mb-0 fst-italic">Jidovimea risipită printre secoli rătăcește</p>
            <p class="mb-0 fst-italic">În pustiu se-nalță-n soare desfrunziții palmieri...</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">O, lăsați să moi în ape oceanici a mea liră!</p>
            <p class="mb-0 fst-italic">Să-mbrac sunetele-i dalbe cu a undelor zâmbire,</p>
            <p class="mb-0 fst-italic">Cu-ale stelelor icoane, cu a cerului azur;</p>
            <p class="mb-0 fst-italic">Să înalț munții Greciei, scânteind muiați de soare,</p>
            <p class="mb-0 fst-italic">Cu dumbrave prăvălite peste coaste râzătoare</p>
            <p class="mb-0 fst-italic">Și cu stânci încremenite printre nouri de purpur.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Peste văile adânce repezite-n regioane</p>
            <p class="mb-0 fst-italic">Nourate, stau ținute templele multicoloane</p>
            <p class="mb-0 fst-italic">Parcă munții-n braț de piatră le ridică și le-arat</p>
            <p class="mb-0 fst-italic">Zeilor din ceriuri. Vulturi peste văi înnegurate,</p>
            <p class="mb-0 fst-italic">Grei atârnă cu întinse aripi și priviri țintate</p>
            <p class="mb-0 fst-italic">Supra lumei ce sub dânșii stă adânc, împrăștiat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Astfel Grecia se naște din întunecata mare.</p>
            <p class="mb-0 fst-italic">Poartă-n ceruri a ei temple ș-a ei sarcini de ninsoare,</p>
            <p class="mb-0 fst-italic">Cer frumos, adânc-albastru, străveziu, nemărginit;</p>
            <p class="mb-0 fst-italic">Din coloanele de dealuri se întind văile pline</p>
            <p class="mb-0 fst-italic">De dumbrave, de izvoare și de râuri cristaline,</p>
            <p class="mb-0 fst-italic">Cari lunec zdrumicate pe-a lor bulgări de granit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și din turmele de stânce, risipite cu splendoare</p>
            <p class="mb-0 fst-italic">Pe-ntinsori de codri negri rupți de râuri sclipitoare,</p>
            <p class="mb-0 fst-italic">Vezi oraș cu dome albe strălucind în verde crâng.</p>
            <p class="mb-0 fst-italic">Marea lin cutremurându-și fața, scutur-a ei spume,</p>
            <p class="mb-0 fst-italic">Repezind pe-alunecușul undelor de raze-o lume,</p>
            <p class="mb-0 fst-italic">Jos la poarta urbei mândre a ei sunete se frâng.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Mai albastră decât cerul, purtând soarele pe față,</p>
            <p class="mb-0 fst-italic">Ea reflectă-n lumea-i clară toată Grecia măreață.</p>
            <p class="mb-0 fst-italic">Câteodată se-ncrețește și-și întunec-al ei vis</p>
            <p class="mb-0 fst-italic">Nimfe albe ca zăpada scutur ap-albastră, caldă,</p>
            <p class="mb-0 fst-italic">Se împroașcă-n joacă dulce, mlădiindu-se se scaldă,</p>
            <p class="mb-0 fst-italic">Scuturându-și părul negru, înecându-se de râs.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și pe valuri luminoase oceanul lin le saltă,</p>
            <p class="mb-0 fst-italic">Orice undă lingușește arătarea lor cea naltă,</p>
            <p class="mb-0 fst-italic">Pe nisipul cald le-aruncă marea-n jocu-i luminos;</p>
            <p class="mb-0 fst-italic">Oceanicele corpuri, ca statuie de ninsoare,</p>
            <p class="mb-0 fst-italic">Strălucesc în părul negru, ce și-l uscă ele-n soare</p>
            <p class="mb-0 fst-italic">Pe-a lor perini nisipoase lenevite lănguros.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Apoi fug să-mpopuleze verdea noapte dumbrăvană</p>
            <p class="mb-0 fst-italic">Și vorbind mărgăritare culeg flori în a lor goană.</p>
            <p class="mb-0 fst-italic">Dintr-o tuf-ivește Satyr capu-i chel, barba-i de țap,</p>
            <p class="mb-0 fst-italic">Lungi urechi și gura-i strâmbă, cârnu-i nas. De sus își stoarce</p>
            <p class="mb-0 fst-italic">Lacom poama neagră-n gură pituliș prin tufe-o-ntoarce,</p>
            <p class="mb-0 fst-italic">Se strâmbă de râs și-n fugă se dă vesel peste cap.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Albe trec în bolta neagră prin a trestiei verdeață.</p>
            <p class="mb-0 fst-italic">De o cracă pe-ape-ntinsă una-și spânzur-a ei brațe,</p>
            <p class="mb-0 fst-italic">Mișcă-n aer peste unde fructul mării de omăt;</p>
            <p class="mb-0 fst-italic">Altele pe spate-ntinse cu o mână-noată numa,</p>
            <p class="mb-0 fst-italic">Cu cealaltă rupând nuferi, plini de-o luminoasă spumă.</p>
            <p class="mb-0 fst-italic">Pun în păr și ca-necate liniștit plutesc și-ncet.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Crenge lin îndoaie Eros schimă face, ce văzând-o</p>
            <p class="mb-0 fst-italic">Ele-urmează în tăcere abia apa sfâșiind-o...</p>
            <p class="mb-0 fst-italic">Într-o tufă, sub un brustur doarme Satyr, beat de must...</p>
            <p class="mb-0 fst-italic">Chicotind, a lui ureche cu flori roșii o-ncoroană.</p>
            <p class="mb-0 fst-italic">Lunca râde de răsună verdea noapte dumbrăvană</p>
            <p class="mb-0 fst-italic">Ele pier prin bolți de frunze, pe-un drum verde și îngust...</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Înserează și apune greul soare-n văi de mite.</p>
            <p class="mb-0 fst-italic">Cu un roș fir de jeratic culmi de munte sunt tivite,</p>
            <p class="mb-0 fst-italic">Lunga lor fulgerătură în senin a-ncremenit.</p>
            <p class="mb-0 fst-italic">Marea aerului caldă, stelele ce-ntârzii line,</p>
            <p class="mb-0 fst-italic">Limba râurilor blândă, ale codrilor suspine,</p>
            <p class="mb-0 fst-italic">Glasul lumei, glasul mărei se-mpreună-n infinit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Codrii aiurează negri sub a stelelor povară.</p>
            <p class="mb-0 fst-italic">Râuri calde ca și sara apa-n arcuri o coboară,</p>
            <p class="mb-0 fst-italic">Prăvălind-o purpurie peste scările de stânci;</p>
            <p class="mb-0 fst-italic">În albastru-adânc, în marea cerului cea liniștită,</p>
            <p class="mb-0 fst-italic">Răpăd munții cu tărie fruntea lor încremenită</p>
            <p class="mb-0 fst-italic">Și în valuri verzi de grâne îmblă văile adânci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Printre cremenea crăpată, din bazaltul rupt de ploaie,</p>
            <p class="mb-0 fst-italic">Ridica copaci monastici trunchii ce de vânt se-ndoaie,</p>
            <p class="mb-0 fst-italic">Scoțând veche rădăcină din pietrișul sfărâmat;</p>
            <p class="mb-0 fst-italic">Un vultur s-agață mândru de un pisc cu fruntea ninsă,</p>
            <p class="mb-0 fst-italic">Nouri lunecă pe ceruri flota lor de vânt împinsă</p>
            <p class="mb-0 fst-italic">Și răsună-n noaptea lumei cântul mării blând și mat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și atuncea peste ape fața sfânt-a lunei pline</p>
            <p class="mb-0 fst-italic">Își ridică discul splendid în imperiul de lumine,</p>
            <p class="mb-0 fst-italic">Mării mândre poleindu-i pânzăriile-i de-azur.</p>
            <p class="mb-0 fst-italic">Ea doarme-ale ei spume, ca mărgăritarul, sure,</p>
            <p class="mb-0 fst-italic">Nisipișul strălucește, râuri scapără-n pădure</p>
            <p class="mb-0 fst-italic">În oraș, lumini ca stele presărate-n mii de muri.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și-n poiana ce ridică nalții trunchi cu frunze rare,</p>
            <p class="mb-0 fst-italic">Raza lunei alb pătează umbra verde din cărare,</p>
            <p class="mb-0 fst-italic">Filomela împle codrii cu suspine de-amoroși.</p>
            <p class="mb-0 fst-italic">Joe preschimbat în tânăr, cu imobili ochi sub gene,</p>
            <p class="mb-0 fst-italic">Pândea umbra mlădioasă unei fete pământene</p>
            <p class="mb-0 fst-italic">Ei se văd, ca să se mire cum de sunt așa frumoși.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">A fi râu e-o fericire, căci în nopțile-argintie</p>
            <p class="mb-0 fst-italic">Câte grații tăinuite se descopăr, i se-mbie</p>
            <p class="mb-0 fst-italic">Și ascultă cu iubire tot ce valurile-i mint.</p>
            <p class="mb-0 fst-italic">Lui i se descopăr nimfe de-o marmoree zăpadă,</p>
            <p class="mb-0 fst-italic">Ce în apa lui cea clară cursului se lasă pradă,</p>
            <p class="mb-0 fst-italic">Duse de obraznici unde cu glăscioare de argint!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și cuminți frunzele toate își comunică misteruri.</p>
            <p class="mb-0 fst-italic">Surâzând, clipind ascultă ochii de-aur de pe ceruri,</p>
            <p class="mb-0 fst-italic">Crenge rele imitează pân-și zgomotul de guri</p>
            <p class="mb-0 fst-italic">A cărărilor pierdute de pe valea cu izvoare.</p>
            <p class="mb-0 fst-italic">De s-ar ști... câte mâni albe rupe-ar flori mirositoare,</p>
            <p class="mb-0 fst-italic">Câte buze ar închide gândul sântelor păduri!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cine are-urechi s-audă ce murmůr gurile rele</p>
            <p class="mb-0 fst-italic">Și vorbarețele valuri și prorocitoare stele</p>
            <p class="mb-0 fst-italic">De-ale grațiilor amoruri, de-ale nimfelor iubit;</p>
            <p class="mb-0 fst-italic">Cine-ascultă și nu-nstrună arfa-i de cântări bogată,</p>
            <p class="mb-0 fst-italic">Căci comori de taine-ascunde orice râu... Lunca ingrată</p>
            <p class="mb-0 fst-italic">De-ar șopti, viața-i toată n-ar sfârși de povestit.</p>
            <p class="mb-0 fst-italic">.....................................................................</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar în camera îngustă lângă lampa cea cu oliu</p>
            <p class="mb-0 fst-italic">Palid stă cugetătorul, căci gândirea-i e în doliu:</p>
            <p class="mb-0 fst-italic">În zădar el grămădește lumea într-un singur semn;</p>
            <p class="mb-0 fst-italic">Acel semn ce îl propagă el în taină nu îl crede,</p>
            <p class="mb-0 fst-italic">Adâncit vorbește noaptea cu-a lui umbră din părete</p>
            <p class="mb-0 fst-italic">Umbra-și râde, noaptea tace, mută-i masa cea de lemn.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Orbul sculptor în chilie pipăie marmura clară.</p>
            <p class="mb-0 fst-italic">Dalta-i tremură... înmoaie cu gândirea-i temerară</p>
            <p class="mb-0 fst-italic">Piatra rece. Neted iese de sub mână-i un întreg,</p>
            <p class="mb-0 fst-italic">Ce la lume își arată palida-i, eterna-i fire,</p>
            <p class="mb-0 fst-italic">Stabilă-n a ei mișcare, mută-n cruda ei simțire</p>
            <p class="mb-0 fst-italic">O durere-ncremenită printre secolii ce trec.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iar pe piatra prăvălită, lângă marea-ntunecată</p>
            <p class="mb-0 fst-italic">Stă Orfeu cotul în razim pe-a lui arfă sfărâmată...</p>
            <p class="mb-0 fst-italic">Ochiu-ntunecos și-ntoarce și-l aruncă aiurind</p>
            <p class="mb-0 fst-italic">Când la stelele eterne, când la jocul blând al mării.</p>
            <p class="mb-0 fst-italic">Glasu-i, ce-nviase stânca, stins de-aripa disperărei,</p>
            <p class="mb-0 fst-italic">Asculta cum vântu-nșală și cum undele îl mint.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">De-ar fi aruncat în haos arfa-i de cântări îmflată,</p>
            <p class="mb-0 fst-italic">Toată lumea după dânsa, de-al ei sunet atârnată,</p>
            <p class="mb-0 fst-italic">Ar fi curs în văi eterne, lin și-ncet ar fi căzut...</p>
            <p class="mb-0 fst-italic">Caravane de sori regii, cârduri lungi de blonde lune</p>
            <p class="mb-0 fst-italic">Și popoarele de stele, universu-n rugăciune,</p>
            <p class="mb-0 fst-italic">În migrație eternă de demult s-ar fi pierdut.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și în urmă-le-o vecie din nălțimi abia-văzute</p>
            <p class="mb-0 fst-italic">Și din sure văi de haos colonii de lumi pierdute</p>
            <p class="mb-0 fst-italic">Ar fi izvorât în râuri într-un spaț despopulat;</p>
            <p class="mb-0 fst-italic">Dar și ele-atrase tainic ca de-o magică durere</p>
            <p class="mb-0 fst-italic">Cu-a lor roiuri luminoase dup-o lume în cădere</p>
            <p class="mb-0 fst-italic">S-ar fi dus. Nimic în urmă nici un atom luminat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar el o zvârli în mare... Și d-eterna-i murmuire</p>
            <p class="mb-0 fst-italic">O urmă ademenită toat-a Greciei gândire,</p>
            <p class="mb-0 fst-italic">Împlând halele oceanici cu cântările-i de amar.</p>
            <p class="mb-0 fst-italic">De-atunci marea-nfiorată de sublima ei durere,</p>
            <p class="mb-0 fst-italic">În imagini de talazuri, cânt-a Greciei cădere</p>
            <p class="mb-0 fst-italic">Și cu-albastrele ei brațe țărmii-i mângâie-n zădar...</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar mai știi?... N-auzim noaptea armonia din pleiade?</p>
            <p class="mb-0 fst-italic">Știm de nu trăim pe-o lume, ce pe nesimțite cade?</p>
            <p class="mb-0 fst-italic">Oceanele-nfinirei o cântare-mi par c-ascult.</p>
            <p class="mb-0 fst-italic">Nu simțim lumea pătrunsă de-o durere lungă, vană?</p>
            <p class="mb-0 fst-italic">Poate-urmează-a arfe'-antice suspinare-aeriană,</p>
            <p class="mb-0 fst-italic">Poate că în văi de haos ne-am pierdut demult... demult.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Sau ghicit-ați vreodată ce socoate-un mândru soare</p>
            <p class="mb-0 fst-italic">Când c-o rază de gândire ține lumi ca să nu zboare,</p>
            <p class="mb-0 fst-italic">Să nu piard-a lor cărare, să nu cadă-n infinit?</p>
            <p class="mb-0 fst-italic">Zvârcolindu-se aleargă turburate și rebele</p>
            <p class="mb-0 fst-italic">Și să frâng-ar vrea puterea ce le farmăcă pre ele</p>
            <p class="mb-0 fst-italic">Și s-alerge-ar vrea în caos de-unde turburi au ieșit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Vecinicia cea bătrână, ea la lumi privea uimită.</p>
            <p class="mb-0 fst-italic">Mii de ani cugetă-n mite la enigma încâlcită</p>
            <p class="mb-0 fst-italic">Care spațiul i-o prezintă cu-a lui lumi și cu-a lui legi;</p>
            <p class="mb-0 fst-italic">Și din secoli ce trecură ea s-apucă să adune</p>
            <p class="mb-0 fst-italic">Toată viața și puterea, sucul tot de-nțelepciune</p>
            <p class="mb-0 fst-italic">Și se pune să zideasc-un uriaș popor de regi.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și atunci apare Roma în uimita omenire.</p>
            <p class="mb-0 fst-italic">Gânduri mari ca sori în caos e puternica-i gândire</p>
            <p class="mb-0 fst-italic">Și ce zice-i zis pe veacuri, e etern, nemuritor;</p>
            <p class="mb-0 fst-italic">Iar popoarele-și îndreaptă a lor suflete mărețe,</p>
            <p class="mb-0 fst-italic">A lor fapte seculare, uriașele lor viețe,</p>
            <p class="mb-0 fst-italic">După căi prescrise-odată pe gândirea-ăstui popor.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Auzit-ați de-mpărații stând pe tron cu trepte multe?</p>
            <p class="mb-0 fst-italic">Fruntea-ncinsă în luceferi făcea lumea să-i asculte,</p>
            <p class="mb-0 fst-italic">Vorba lor era o rază în viața lumii-ntregi,</p>
            <p class="mb-0 fst-italic">Țări bogate și-nflorite, mări vuinde-n adormire,</p>
            <p class="mb-0 fst-italic">Cetăți vechi, popoare mândre stau sub falnica-i domnire</p>
            <p class="mb-0 fst-italic">Și cezarii-mpart pământul în Senatul cel de regi.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe sub arcuri triumfale trece mândru-nvingătorul</p>
            <p class="mb-0 fst-italic">Și-amețit abia aude cum vuiește surd poporul,</p>
            <p class="mb-0 fst-italic">Cum a mărei glasuri multe se repetă, gem și fug;</p>
            <p class="mb-0 fst-italic">Iar la carul lui de aur, cu coroane pe-a lor frunte</p>
            <p class="mb-0 fst-italic">Și înfrânți de umilire, cu priviri stinse și crunte,</p>
            <p class="mb-0 fst-italic">Regii țărilor învinse gem cu greu trăgând în jug.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Roma arde și furtuna chiuind în ea se scaldă</p>
            <p class="mb-0 fst-italic">Și frământă-n valuri roșii marea turbure și caldă</p>
            <p class="mb-0 fst-italic">Și aruncă-n loc de spume nori de fum, scântei și vânt;</p>
            <p class="mb-0 fst-italic">Și în nunta ei grozavă turnuri negre ea aprinde</p>
            <p class="mb-0 fst-italic">Și făcliile-uriașe cătră stele le întinde...</p>
            <p class="mb-0 fst-italic">Evul arde Roma este oceanicu-i mormânt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Norii sunt o spuză-n ceruri și prin ei topite stele.</p>
            <p class="mb-0 fst-italic">Și ca oceanul negru răscolit de visuri grele,</p>
            <p class="mb-0 fst-italic">Urbea își frământă falnic valuri mari de fum și jar;</p>
            <p class="mb-0 fst-italic">Din diluviul de flacări, lung întins ca o genune</p>
            <p class="mb-0 fst-italic">Vezi neatins cu arcuri de-aur un palat ca o minune</p>
            <p class="mb-0 fst-italic">Și din frunte-i cântă Neron... cântul Troiei funerar.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Lângă râuri argintoase, care mișcă-n mii de valuri</p>
            <p class="mb-0 fst-italic">A lor glasuri înmiite, printre codri, printre dealuri,</p>
            <p class="mb-0 fst-italic">Printre bolți săpate-n munte, lunecând întunecos,</p>
            <p class="mb-0 fst-italic">Acolo-s dumbrăvi de aur cu poiene constelate,</p>
            <p class="mb-0 fst-italic">Codrii de argint ce mișcă a lor ramuri luminate</p>
            <p class="mb-0 fst-italic">Și păduri de-aramă roșă răsunând armonios.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Munți se-nalță, văi coboară, râuri limpezesc sub soare,</p>
            <p class="mb-0 fst-italic">Purtând pe-albia lor albă insule fermecătoare,</p>
            <p class="mb-0 fst-italic">Ce par straturi uriașe cu copacii înfloriți</p>
            <p class="mb-0 fst-italic">Acolo Dochia are un palat din stânce sure,</p>
            <p class="mb-0 fst-italic">A lui stâlpi-s munți de piatră, a lui streșin-o pădure,</p>
            <p class="mb-0 fst-italic">A cărei copaci se mișcă între nouri adânciți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iar o vale nesfârșită ca pustiile Saharei,</p>
            <p class="mb-0 fst-italic">Cu de flori straturi înalte ca oaze zâmbitoare,</p>
            <p class="mb-0 fst-italic">Cu un fluviu care poartă a lui insule pe el,</p>
            <p class="mb-0 fst-italic">E grădina luminată a palatului în munte</p>
            <p class="mb-0 fst-italic">A lui scări de stânci înalte sunt crăpate și cărunte,</p>
            <p class="mb-0 fst-italic">Iar în halele lui negre strălucind ca și oțel</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Sunt păduri de flori, căci mari-s florile ca sălci pletoase,</p>
            <p class="mb-0 fst-italic">Tufele cele de roze sunt dumbrave-ntunecoase,</p>
            <p class="mb-0 fst-italic">Presărate ca cu lune înfoiete ce s-aprind:</p>
            <p class="mb-0 fst-italic">Viorelele-s ca stele vinete de dimineață,</p>
            <p class="mb-0 fst-italic">Ale rozelor lumină împle stânca cu roșeață,</p>
            <p class="mb-0 fst-italic">Ale crinilor potire sunt ca urne de argint.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Printre luncile de roze și de flori mândre dumbrave</p>
            <p class="mb-0 fst-italic">Zbor gândaci ca pietre scumpe, zboară fluturi ca și nave,</p>
            <p class="mb-0 fst-italic">Zidite din nălucire, din colori și din miros,</p>
            <p class="mb-0 fst-italic">Curcubău sunt a lor aripi și oglindă diamantină,</p>
            <p class="mb-0 fst-italic">Ce reflectă-n ele lumea înflorită din grădină,</p>
            <p class="mb-0 fst-italic">A lor murmur împle lumea de-un cutremur voluptos.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Într-un loc crăpată-i bolta, cu-a ei streșin-arboroasă</p>
            <p class="mb-0 fst-italic">Și printr-însa-n cer vezi luna trecând albă și frumoasă,</p>
            <p class="mb-0 fst-italic">O regină, jună, blondă și cu brațe de argint,</p>
            <p class="mb-0 fst-italic">Ce unesc încrucișate a ei mantie-nstelată</p>
            <p class="mb-0 fst-italic">Și albastră peste pieptu-i alb, ca virgină zăpadă.</p>
            <p class="mb-0 fst-italic">Ochii ei cei mari albaștri peste nori aruncă blând,</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cari se-ntind albi ca zăpăda și ca straturi argintoase,</p>
            <p class="mb-0 fst-italic">Oferindu-i flori de aur și viole-ntunecoase;</p>
            <p class="mb-0 fst-italic">Ea din când în când plivește câte una, aruncând</p>
            <p class="mb-0 fst-italic">Flori de neauă peste ape ce alerg fulgerătoare,</p>
            <p class="mb-0 fst-italic">Raze albe peste lumea văilor celor în floare,</p>
            <p class="mb-0 fst-italic">Dungi de-argint în verzii codri, duioșie pe pământ,</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar un nor pe ceruri negru se înalță și se-ncheagă,</p>
            <p class="mb-0 fst-italic">Se formează,-ncremenește și devine-o domă-ntreagă,</p>
            <p class="mb-0 fst-italic">Plin de umbra de columne ce-l înconjură-mprejur;</p>
            <p class="mb-0 fst-italic">Prin columnele-i mărețe trece câte-o rază mată,</p>
            <p class="mb-0 fst-italic">A lui cůpolă boltită e cu-argint înconjurată,</p>
            <p class="mb-0 fst-italic">Pe arcatele-i ferestre sunt perdele de azur.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Luna înspre ea îndreaptă pasuri luminoase,-ncete,</p>
            <p class="mb-0 fst-italic">Diadem de topiți aștri arde-n blondele ei plete,</p>
            <p class="mb-0 fst-italic">Încălzind aerul serei, strălucindu-i fruntea ei;</p>
            <p class="mb-0 fst-italic">Ale domei scări negrite se-nsenin ca neaua sara</p>
            <p class="mb-0 fst-italic">Intră-n domă. Ard columne sub lumina ei cea clară</p>
            <p class="mb-0 fst-italic">Și-și aruncă unu-ntr-altul umbra neagră dintre ei.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Stelele în cârduri blonde pe regină o urmează,</p>
            <p class="mb-0 fst-italic">Aerul, în unde-albastre, pe-a lor cale scânteiază</p>
            <p class="mb-0 fst-italic">Și rămân întunecate nalte-a cerurilor bolți;</p>
            <p class="mb-0 fst-italic">Doma strălucește-n noapte ca din marmură zidită,</p>
            <p class="mb-0 fst-italic">Prin o mreajă argintoasă ca prin vis o vezi ivită,</p>
            <p class="mb-0 fst-italic">A ei scări ajung din ceriuri a stâncimei negri colți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iară fluviul care taie infinit-acea grădină</p>
            <p class="mb-0 fst-italic">Desfășoară-n largi oglinde a lui apă cristalină,</p>
            <p class="mb-0 fst-italic">Insulele, ce le poartă, în adâncu-i nasc și pier;</p>
            <p class="mb-0 fst-italic">Pe oglinzile-i mărețe, ale stelelor icoane</p>
            <p class="mb-0 fst-italic">Umede se nasc în fundu-i printre ape diafane,</p>
            <p class="mb-0 fst-italic">Cât uitându-te în fluviu pari a te uita în ceri.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și cu scorburi de tămâie și cu prund de ambră de-aur,</p>
            <p class="mb-0 fst-italic">Insulele se înalță cu dumbrăvile de laur,</p>
            <p class="mb-0 fst-italic">Zugrăvindu-se în fundul râului celui profund,</p>
            <p class="mb-0 fst-italic">Cât se pare că din una și aceeași rădăcină</p>
            <p class="mb-0 fst-italic">Un rai dulce se înalță, sub a stelelor lumină,</p>
            <p class="mb-0 fst-italic">Alt rai s-adâncește mândru într-al fluviului fund.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pulbere de-argint pe drumuri, pe-a lor plaiuri verzi o ploaie</p>
            <p class="mb-0 fst-italic">Snopi de flori cireșii poartă pe-a lor ramuri ce se-ndoaie</p>
            <p class="mb-0 fst-italic">Și de vânt scutură grele omătul trandafiriu</p>
            <p class="mb-0 fst-italic">A-nfloririi lor bogate, ce mânat se grămădește</p>
            <p class="mb-0 fst-italic">În troiene de ninsoare, care roză strălucește,</p>
            <p class="mb-0 fst-italic">Pe când sălcii argintoase tremur sânte peste râu.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Aeru-i văratic, moale, stele izvorăsc pe ceruri,</p>
            <p class="mb-0 fst-italic">Florile-izvorăsc pe plaiuri a lor viață de misteruri,</p>
            <p class="mb-0 fst-italic">Vântu-ngreunând cu miros, cu lumini aerul cald;</p>
            <p class="mb-0 fst-italic">Dintr-un arbore într-altul mreje lungi diamantine</p>
            <p class="mb-0 fst-italic">Vioriu sclipesc suspinse într-a lunei dulci lumine,</p>
            <p class="mb-0 fst-italic">Rar și diafan țesute de painjeni de smarald.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe când greieri, ca orlogii, răgușit prin iarbă sună,</p>
            <p class="mb-0 fst-italic">De pe-un vârf de arbor mândru țes în nopțile cu lună</p>
            <p class="mb-0 fst-italic">Pod de pânză diamantină peste argintosul râu,</p>
            <p class="mb-0 fst-italic">Și cât ține podul mândru, printre pânza-i diafană,</p>
            <p class="mb-0 fst-italic">Luna râul îl ajunge și oglinda lui cea plană</p>
            <p class="mb-0 fst-italic">Ca-ntr-o mândră feerie strălucește vioriu.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Peste podul cel ușure, zâna Dochia frumoasă</p>
            <p class="mb-0 fst-italic">Trece împletindu-și părul cel de-auree mătasă,</p>
            <p class="mb-0 fst-italic">Albă-i ca zăpadă noaptea, corpu-i nalt e mlădiet,</p>
            <p class="mb-0 fst-italic">Aurul pletelor strecoară prin mânuțele-i de ceară</p>
            <p class="mb-0 fst-italic">Și prin haine argintoase străbat membrele-i ușoare,</p>
            <p class="mb-0 fst-italic">Abia podul îl atinge mici picioarele-i de-omăt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Trece râul și ușoară nalte scări de stânci ea suie;</p>
            <p class="mb-0 fst-italic">La ivirea-i zi se face în spelunci de cetățuie,</p>
            <p class="mb-0 fst-italic">Ca o zi ea intră mândră în palatul ei de stânci;</p>
            <p class="mb-0 fst-italic">Luna e plină de raze sub căldura-i argintoase,</p>
            <p class="mb-0 fst-italic">Orice stea e-o piatră scumpă iară florile focoase,</p>
            <p class="mb-0 fst-italic">Giuvaeruri umezite cu luminile adânci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Umede tremur lumine pe boltirea cea albastră.</p>
            <p class="mb-0 fst-italic">Zâna Dochia cu glasu-i cheam-o pasăre, măiastră,</p>
            <p class="mb-0 fst-italic">Ce zburând prin aer vine cu-a ei pene de păun;</p>
            <p class="mb-0 fst-italic">Când acea pasăre cântă, lumea râde-n bucurie,</p>
            <p class="mb-0 fst-italic">Pe-umărul cel alb o-așează și coboară-n văi aurie,</p>
            <p class="mb-0 fst-italic">Unde-a râului lungi unde printre papură răsun.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Într-o luntre lemn de cedru ce ușor juca pe valuri,</p>
            <p class="mb-0 fst-italic">Zâna Dochia se suie dezlegând-o de la maluri</p>
            <p class="mb-0 fst-italic">Și pe-a fluviului spate ea la vale îi dă drum;</p>
            <p class="mb-0 fst-italic">Repede luntrea aleargă spintecând argintul apei,</p>
            <p class="mb-0 fst-italic">Culcată pe jumătate, Dochia visa, frumoasă.</p>
            <p class="mb-0 fst-italic">Și la luntrea ei bogată lebede se-nham-acum.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar din ce în ce coboară râul lat, el se-adâncește</p>
            <p class="mb-0 fst-italic">În păduri întunecate, unde apa-abia sclipește,</p>
            <p class="mb-0 fst-italic">Mai agiunsă de a lunei raze doar din când în când;</p>
            <p class="mb-0 fst-italic">Tot mai nalți trunchii pădurii ca stâlpi mari și suri se urcă,</p>
            <p class="mb-0 fst-italic">Pân-ajunge de-a lor ramuri în bolți mândre se încurcă,</p>
            <p class="mb-0 fst-italic">Pân-acopăr cu-aste arcuri fluviul lat și profund.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ca prin bolțile crăpate unei gotice ruine,</p>
            <p class="mb-0 fst-italic">Mai străbat prin bolți de frunze razele lunei senine,</p>
            <p class="mb-0 fst-italic">Împlând p-ici, pe colo râul cu fulgerătoare dungi;</p>
            <p class="mb-0 fst-italic">Pe-umărul Dochiei mândre cântă pasărea măiastră,</p>
            <p class="mb-0 fst-italic">Valuri râd și-ntunecoasă mână lumea lor albastră,</p>
            <p class="mb-0 fst-italic">Repezind luntrea bogată pe șiroiurile lungi.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Prin pădurile de basme trece fluviul cântării.</p>
            <p class="mb-0 fst-italic">Câteodată între codri el s-adună, ca a mărei</p>
            <p class="mb-0 fst-italic">Mare-oglindă, de stânci negre și de munți împiedecat</p>
            <p class="mb-0 fst-italic">Ș-un gigantic lac formează, într-a cărui sân din soare</p>
            <p class="mb-0 fst-italic">Curge aurul tot al zilei și îl împle de splendoare,</p>
            <p class="mb-0 fst-italic">De poți număra în fundu-i tot argintul adunat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Apoi iar se pierde-n codrii cu trunchi groși, cu frunza deasă,</p>
            <p class="mb-0 fst-italic">Unde-n arborul din mijloc e vrăjita-mpărăteasă,</p>
            <p class="mb-0 fst-italic">Unde-n sălcii mlădioase sunt copile de-mpărat;</p>
            <p class="mb-0 fst-italic">Codrul înaintea vrajei o cetate fu frumoasă.</p>
            <p class="mb-0 fst-italic">A ei arcuri azi îs ramuri, a ei stâlpi sunt trunchiuri groase,</p>
            <p class="mb-0 fst-italic">A ei bolți streșini de frunze arcuite-ntunecat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Sara sună glas de bucium și cerboaice albe-n turme</p>
            <p class="mb-0 fst-italic">Prin cărările de codru, pe de frunze-uscate urme,</p>
            <p class="mb-0 fst-italic">Vin rupând verzile crenge cu talangele de gât,</p>
            <p class="mb-0 fst-italic">Și în mijlocul pădurii ocolesc stejarul mare</p>
            <p class="mb-0 fst-italic">Pân-din el o-mpărăteasă iese albă, zâmbitoare,</p>
            <p class="mb-0 fst-italic">Pe-umăr gol doniță albă stemă-n părul aurit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Din copaci ies zâne mândre, de-mpărat frumoase fete,</p>
            <p class="mb-0 fst-italic">Ținând donițe pe umeri, gingașe, nalt-mlădiete,</p>
            <p class="mb-0 fst-italic">Albe trec prin umbra verde, la cerboaice se înclin,</p>
            <p class="mb-0 fst-italic">Ce sub dulcile lor mâne își oferă răbdătoare</p>
            <p class="mb-0 fst-italic">Ugerele lor împlute, și în doniți sunătoare</p>
            <p class="mb-0 fst-italic">Laptele-n cadență curge, codru-mplând c-un murmur lin.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Luntrea cea de lebezi trasă mai departe, mai departe</p>
            <p class="mb-0 fst-italic">Fuge pe-albele oglinde ale apei ce se-mparte</p>
            <p class="mb-0 fst-italic">Sub a luntrei plisc de cedru în lungi brazde de argint</p>
            <p class="mb-0 fst-italic">Și din ce în ce mai mândre, mai înalte, mai frumoase</p>
            <p class="mb-0 fst-italic">Sunt pădurile antice ele-ngroapă-ntunecoase</p>
            <p class="mb-0 fst-italic">Cu-a lor vârfuri munții mândri, stâncile ce-n cer se-ntind.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cât de lat să miște-un fluviu ale apei lui revolte,</p>
            <p class="mb-0 fst-italic">Arbori de pe mal deasupră-i se ajung în mândre bolte,</p>
            <p class="mb-0 fst-italic">Ramurile se-ntrețese, crengile se împletesc,</p>
            <p class="mb-0 fst-italic">Frunza deasă smălțuiește nalta, verdea boltitură,</p>
            <p class="mb-0 fst-italic">Râu-n vecinica lui umbră în adânc suspină, cură...</p>
            <p class="mb-0 fst-italic">Pe-a lui maluri înflorite cai în umbră rătăcesc.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Soarele trecând pe codri a lui roată de-aur moale,</p>
            <p class="mb-0 fst-italic">Vârfurile verzi de codri le îndoaie-n a lui cale,</p>
            <p class="mb-0 fst-italic">Și sosind la vreo luncă însuși el vede mirat</p>
            <p class="mb-0 fst-italic">Ce departe e pământul și ce nalți trunchii pădurii,</p>
            <p class="mb-0 fst-italic">Și deși călătorește pe a lor vârfuri, totuși murii</p>
            <p class="mb-0 fst-italic">Bolțile groase de frunze a lui raze nu străbat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Lâng-izvoarele-nflorite pasc cai albi c-a mării spume</p>
            <p class="mb-0 fst-italic">Zi ori noapte nu văzură de când sunt pe-această lume,</p>
            <p class="mb-0 fst-italic">Luna sântă, stele de-aur soare alb și zâmbitor,</p>
            <p class="mb-0 fst-italic">Pentru ei necunoscute-s. Umbra verde claroscură</p>
            <p class="mb-0 fst-italic">Și mirositorul aer, fluvii ce sclipinde cură</p>
            <p class="mb-0 fst-italic">În adâncile dumbrave printre țărmii plini de flori</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Astea numai le cunosc ei. Coamele flutur c-argintul,</p>
            <p class="mb-0 fst-italic">Ca la lebede se-ndoaie gâtul lor, iară pământul</p>
            <p class="mb-0 fst-italic">Abia-atins e de picioare potcovite cu-aur roș;</p>
            <p class="mb-0 fst-italic">Colo-n umbra îndulcită de miroase-mbătătoare,</p>
            <p class="mb-0 fst-italic">Capul mic ei și-l ridică, nări îmflând spre depărtare</p>
            <p class="mb-0 fst-italic">Și urechea ascuțind-o glas de-aud prin arbori groși.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Luntrea cea de lebezi trasă, mai departe, mai departe</p>
            <p class="mb-0 fst-italic">Fuge pe-albele oglinde ale apei și se-mparte</p>
            <p class="mb-0 fst-italic">Sub a luntrei plisc de cedru în lungi brazde de argint:</p>
            <p class="mb-0 fst-italic">Și deodată zi se face un ocean de lumină</p>
            <p class="mb-0 fst-italic">Fluviul a ieșit din codri în câmpii fără de fine,</p>
            <p class="mb-0 fst-italic">Cari verzi și înflorite, mândre-n soare se întind.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar cât ține răsăritul se-nalț-un munte mare</p>
            <p class="mb-0 fst-italic">El de două ori mai nalt e decât depărtarea-n soare</p>
            <p class="mb-0 fst-italic">Stâncă urcată pe stâncă, pas cu pas în infinit</p>
            <p class="mb-0 fst-italic">Pare-a se urca iar fruntea-i, cufundată-n înălțime,</p>
            <p class="mb-0 fst-italic">Abia marginile-arată în albastra-ntunecime:</p>
            <p class="mb-0 fst-italic">Munte jumătate-n lume jumătate-n infinit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iar în pieptu-acestui munte se arat-o poartă mare</p>
            <p class="mb-0 fst-italic">Ea: înalt este boltită și-ntr-adânc în piatra tare,</p>
            <p class="mb-0 fst-italic">Iar de pragu-i sunt unite nalte scări de negre stânci,</p>
            <p class="mb-0 fst-italic">Cari duc adânc în valea cea de-acol-abia văzută</p>
            <p class="mb-0 fst-italic">Și-n pădurile umbroase cu-adâncimi necunoscute</p>
            <p class="mb-0 fst-italic">Și-n câmpii unde mii râuri s-argintesc plane ș-adânci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe acea poartă din munte iese zori în coruri dalbe,</p>
            <p class="mb-0 fst-italic">Ridicându-se în cerul dimineții dulci, rozalbe,</p>
            <p class="mb-0 fst-italic">Pe-acolo soarele-și mână car cu caii arzători,</p>
            <p class="mb-0 fst-italic">Pe-acolo noaptea răsare blonda lună argintoasă</p>
            <p class="mb-0 fst-italic">Și popoarele de stele iese-n roiuri luminoase,</p>
            <p class="mb-0 fst-italic">Și pe cer se împrăștie ca de aur sfinte flori.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Zeii Daciei acolo locuiau poarta solară</p>
            <p class="mb-0 fst-italic">În a oamenilor lume scările de stânci coboară</p>
            <p class="mb-0 fst-italic">Și în verdea-ntunecime a pădurilor s-adun;</p>
            <p class="mb-0 fst-italic">Și pe negre stânci trunchiate stau ca-n tron în verdea lume</p>
            <p class="mb-0 fst-italic">Și din cupe beau auroră cu de neguri albe spume,</p>
            <p class="mb-0 fst-italic">Pe când mii de fluvii albe nasc în umbră și răsun.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Câteodată-un corn de aur ei răsună-n depărtare,</p>
            <p class="mb-0 fst-italic">Trezind sufletul pădurii, codrilor adânci cântare,</p>
            <p class="mb-0 fst-italic">Cheamă caii lor ce-aleargă cu-a lor coame-mflate-n vânt:</p>
            <p class="mb-0 fst-italic">Vin în herghelii de neauă, pe cărări demult bătute</p>
            <p class="mb-0 fst-italic">Și pe ei zeii încalic străbătând pe întrecute</p>
            <p class="mb-0 fst-italic">Codrilor nalt întuneric, făr-de capăt pe pământ.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar adesea pe când caii dorm în neagră depărtare,</p>
            <p class="mb-0 fst-italic">Luna, zâna Daciei, vine la a zeilor serbare:</p>
            <p class="mb-0 fst-italic">Soarele, copil de aur al albastrei sfintei mări,</p>
            <p class="mb-0 fst-italic">Vine ostenit de drumuri și la masă se așează,</p>
            <p class="mb-0 fst-italic">Aerul se aurește de-a lui față luminoasă,</p>
            <p class="mb-0 fst-italic">Sala verde din pădure strălucește în cântări.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și ca zugrăviți stau zeii în lumina cea de soare.</p>
            <p class="mb-0 fst-italic">Părul lor cel alb lucește, barba-n brâu li curge mare,</p>
            <p class="mb-0 fst-italic">Creții buzei lor să numeri poți în aerul cel clar;</p>
            <p class="mb-0 fst-italic">Hainele întunecate albe par în strălucire</p>
            <p class="mb-0 fst-italic">Și ei râd cu veselie l-a păharelor ciocnire,</p>
            <p class="mb-0 fst-italic">Iară luna rușinoasă pe sub gene s-uită rar.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Haina lungă și albastră e cusută numa-n stele.</p>
            <p class="mb-0 fst-italic">Iară albii sâni de neauă, strălucesc, cu de mărgele</p>
            <p class="mb-0 fst-italic">Și mărgăritare salbă, pe un fir de aur prins;</p>
            <p class="mb-0 fst-italic">Păru-i lung de aur galbăn e-mpletit în cozi pe spate,</p>
            <p class="mb-0 fst-italic">Ochii ei căprii se uită la cerescu-i mândru frate</p>
            <p class="mb-0 fst-italic">Și de melancolici gânduri al ei suflet e cuprins.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Înainte de plecare ea, doinind din frunză, cheamă</p>
            <p class="mb-0 fst-italic">Zimbrii codrilor cei vecinici, li dezmiardă sura coamă,</p>
            <p class="mb-0 fst-italic">Li îndoaie a lor coarne, pe grumaz îi bate lin</p>
            <p class="mb-0 fst-italic">Și pe frunți ea îi sărută, de rămân steme pe ele,</p>
            <p class="mb-0 fst-italic">Apoi urcă negrul munte, pe șivoaiele de stele,</p>
            <p class="mb-0 fst-italic">Lin alunecă ș-alene drumul cerului senin.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Îndărătu-acelui munte, infinita întinsoare</p>
            <p class="mb-0 fst-italic">E frumoasa-mpărăție mândră a sântului soare</p>
            <p class="mb-0 fst-italic">Și pe coaste sunt palate, ce din verzile grădini</p>
            <p class="mb-0 fst-italic">Strălucesc marmora albă și senină ca zăpada,</p>
            <p class="mb-0 fst-italic">Cu intrări în veci deschise, cu scări netezi, colonade</p>
            <p class="mb-0 fst-italic">Lungi de marmure ca ceara în lungi bolte se îmbin.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe-a ferestrelor mari laturi sunt lăsate largi perdele,</p>
            <p class="mb-0 fst-italic">Mreje lungi de aur rumăn au țesut ani mulți la ele</p>
            <p class="mb-0 fst-italic">Mânile surorei albe. Aeru-i de diamant,</p>
            <p class="mb-0 fst-italic">El plutește-n unde grele de miroase-mbătătoare</p>
            <p class="mb-0 fst-italic">Peste văile ca râuri desfășurate sub soare,</p>
            <p class="mb-0 fst-italic">Pe dumbrăvi cu rodii de-aur, peste fluvii de briliant.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și oștiri de flori pe straturi par a fi stele topite,</p>
            <p class="mb-0 fst-italic">Fluturi ard, sclipesc în soare, orbind ochii ce îi vede,</p>
            <p class="mb-0 fst-italic">Ca idei scăldate-n aur și-n colori de curcubău;</p>
            <p class="mb-0 fst-italic">Pe grădinile-nflorite, peste mândrele dumbrave</p>
            <p class="mb-0 fst-italic">Norii mișcă sus în ceruri înfoiatele lor nave</p>
            <p class="mb-0 fst-italic">Rostre de jeratec ș-aur, vele lungi de curcubău.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">A-mpăratului de soare bolți albastre și cu stele</p>
            <p class="mb-0 fst-italic">Se ridică-n caturi nalte tot castele pe castele.</p>
            <p class="mb-0 fst-italic">Cu ferești de aur d-Ofir, cu oglinzi de diamant,</p>
            <p class="mb-0 fst-italic">Cu scosůri de albe marmuri, cu covoare de purpură;</p>
            <p class="mb-0 fst-italic">Printre mândrele coloane o cântare blând murmură</p>
            <p class="mb-0 fst-italic">E un vânt cu suflet dulce într-un aer de briliant.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și nici umbra nu se prinde d-atmosfera radioasă.</p>
            <p class="mb-0 fst-italic">Ca prin apă cristalină trec cu frunțile frumoase,</p>
            <p class="mb-0 fst-italic">Trec a soarelui copile printre aerul cel cald;</p>
            <p class="mb-0 fst-italic">A lor păr e ca și ambra, ca și crinul a lor față,</p>
            <p class="mb-0 fst-italic">Abia-atinse-s a lor umbre de o tainică roșață</p>
            <p class="mb-0 fst-italic">Auroră trandafirie prin ferestre de smarald.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Într-o lume fără umbră e a soarelui cetate,</p>
            <p class="mb-0 fst-italic">Totul e lumină clară, radioasă voluptate,</p>
            <p class="mb-0 fst-italic">Florile stau ca topite, râurile limpezi sunt;</p>
            <p class="mb-0 fst-italic">Numai colo în departe și-n albastră depărtare</p>
            <p class="mb-0 fst-italic">Ale zorilor grădine clar se văd strălucitoare,</p>
            <p class="mb-0 fst-italic">Cu boschetele de roze și cu crinii de argint.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Acolo sunt lacuri limpezi, rumene în a lor fire,</p>
            <p class="mb-0 fst-italic">De-a grădinilor de roze tăinuită oglindire,</p>
            <p class="mb-0 fst-italic">Și din curtea argintie zorile râzânde ies;</p>
            <p class="mb-0 fst-italic">Haine verzi și transparente coprind membrele rozalbe</p>
            <p class="mb-0 fst-italic">Și în lac ele aruncă roze cu mânuțe albe,</p>
            <p class="mb-0 fst-italic">Netezind a lor sprâncene, dând din frunte părul des.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Într-o dulce și umbroasă, viorie atmosferă,</p>
            <p class="mb-0 fst-italic">Se ridică dintre lunce, cu-a ei cůpole de ceară</p>
            <p class="mb-0 fst-italic">Închegate ca din umbră verde și argint topit,</p>
            <p class="mb-0 fst-italic">Transparând prin diamantoasă fină de paingăn pânză,</p>
            <p class="mb-0 fst-italic">Monastirea alb-a lunei ce prin lumi va să s-ascunză,</p>
            <p class="mb-0 fst-italic">Cu coloane-nconjurate de a viței-ncolăciri.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ai grădinei arbori mândri cu întunecatul verde</p>
            <p class="mb-0 fst-italic">Conjurați ș-acoperiți-s cu-iederă ce-n vârf se pierde</p>
            <p class="mb-0 fst-italic">Mișcând florile ei albe flamuri cu-nfloriții creți</p>
            <p class="mb-0 fst-italic">Și în muri de frunzi lucinde, și în scări de flori pendente</p>
            <p class="mb-0 fst-italic">Și în poduri legănate de zefire somnolente</p>
            <p class="mb-0 fst-italic">Dintr-un arbore într-altul iedera trece măreț.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Spânzură din ramuri nalte vițele cele de vie,</p>
            <p class="mb-0 fst-italic">Struguri vineți și cu brumă poamă albă aurie,</p>
            <p class="mb-0 fst-italic">Și albine roitoare luminoasă miere sug;</p>
            <p class="mb-0 fst-italic">Caii lunei albi ca neaua storc cu gura must din struguri</p>
            <p class="mb-0 fst-italic">Și la vinul ce-i îmbată pasc mirositorii ruguri</p>
            <p class="mb-0 fst-italic">Și în sara cea eternă veseli nechezând ei fug.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și în monastirea lunei cu-argintoasă colonadă,</p>
            <p class="mb-0 fst-italic">Vezi cum trece ea frumoasă corpu-i dulce de zăpadă,</p>
            <p class="mb-0 fst-italic">Umerii, cu-a lor lumine, par de aur moale blond,</p>
            <p class="mb-0 fst-italic">Abia corpul coperit e de-un gaz moale ce transpare</p>
            <p class="mb-0 fst-italic">Astfel trece ea frumoasă, cu-a ei brațe sclipitoare,</p>
            <p class="mb-0 fst-italic">Reflectată-n mii oglinde de pe muri și din plafond.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și-n odăile înalte din frumoasa monastire</p>
            <p class="mb-0 fst-italic">Sunt pe muri tablouri mândre, nimerită zugrăvire</p>
            <p class="mb-0 fst-italic">Ale miturilor dace, a credinței din bătrâni;</p>
            <p class="mb-0 fst-italic">Prin grădini cu albe-izvoare sunt a lunei dulci amoruri,</p>
            <p class="mb-0 fst-italic">Sau palate argintoase unde zori trăiesc în coruri,</p>
            <p class="mb-0 fst-italic">Sau pădurea cea vrăjită cu frumoasele-i regini.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ăsta-i raiul Daciei veche-a zeilor împărăție;</p>
            <p class="mb-0 fst-italic">Într-un loc e zi eternă sara-n altu-n vecinicie,</p>
            <p class="mb-0 fst-italic">Iar în altul, zori eterne cu-aer răcoros de mai;</p>
            <p class="mb-0 fst-italic">Sufletele mari viteze ale-eroilor Daciei</p>
            <p class="mb-0 fst-italic">După moarte vin în șiruri luminoase ce învie</p>
            <p class="mb-0 fst-italic">Vin prin poarta răsăririi care-i poarta de la rai.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Colo Dunărea bătrână, liberă-ndrăzneață, mare,</p>
            <p class="mb-0 fst-italic">C-un murmur rostogolește a ei valuri gânditoare</p>
            <p class="mb-0 fst-italic">Ce mișcându-se-adormite merg în marea de amar;</p>
            <p class="mb-0 fst-italic">Astfel miile de secoli cu vieți, gândiri o mie,</p>
            <p class="mb-0 fst-italic">Adormite și bătrâne s-adâncesc în vecinicie</p>
            <p class="mb-0 fst-italic">Și în urmă din izvoare timpi răcori și clari răsar.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar pe-arcade negre-nalte, ce molatec se-nmormântă</p>
            <p class="mb-0 fst-italic">În a Dunării dulci valuri ce vuiesc și se frământă,</p>
            <p class="mb-0 fst-italic">Trece-un pod, un gând de piatră repezit din arc în arc;</p>
            <p class="mb-0 fst-italic">Valurile-nfuriate ridic frunțile răstite,</p>
            <p class="mb-0 fst-italic">Și izbind cu repejune arcurile neclintite,</p>
            <p class="mb-0 fst-italic">Gem, picioarele le scaldă la stâncosul lor monarc.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Peste pod cu mii de coifuri trece-a Romei grea mărire.</p>
            <p class="mb-0 fst-italic">Soarele orbește-n ceruri de a armelor lucire,</p>
            <p class="mb-0 fst-italic">Scuturi ard, carăle treier și vuiesc asurzitor;</p>
            <p class="mb-0 fst-italic">Iar Saturn, cu fruntea ninsă stând pe steaua-i alburie</p>
            <p class="mb-0 fst-italic">Și-aruncând ochii lui turburi peste-a vremii-mpărăție,</p>
            <p class="mb-0 fst-italic">Aiurind întreabă lumea: Și aceia-s muritori?</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Colo unde stau Carpații cu de stânci înalte coaste,</p>
            <p class="mb-0 fst-italic">Unde paltinii pe dealuri se înșir ca mândră oaste,</p>
            <p class="mb-0 fst-italic">Munții țeapăna lor frunte o suiau-n-albastre bolți;</p>
            <p class="mb-0 fst-italic">Stau tăcuți ostașii Romei, ridicând fruntea lor lată,</p>
            <p class="mb-0 fst-italic">Strălucitele lor coifuri, la stâncimea detunată,</p>
            <p class="mb-0 fst-italic">Unde ultima cetate ridica-n nori a ei colți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Nori ca de bazalt de aspri se zidesc pe-albastra boltă,</p>
            <p class="mb-0 fst-italic">Parc-auzi a Mării Negre și a Dunării revoltă</p>
            <p class="mb-0 fst-italic">Și a lumii-ncheieture parcă le auzi trăsnind;</p>
            <p class="mb-0 fst-italic">Răsculatu-s-a-Universul contra globului din aer?</p>
            <p class="mb-0 fst-italic">Stelele-n oștiri se mișcă? Împărații sori se-ncaier?</p>
            <p class="mb-0 fst-italic">Moare lumea? Cade Roma? Surpă cerul pe pământ?</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Nu. Din fundul Mării Negre, din înalte-adânce hale,</p>
            <p class="mb-0 fst-italic">Dintre stânce arcuite în gigantice portale</p>
            <p class="mb-0 fst-italic">Oastea zeilor Daciei în lungi șiruri au ieșit</p>
            <p class="mb-0 fst-italic">Și Zamolx, cu uraganul cel bătrân, prin drum de nouri,</p>
            <p class="mb-0 fst-italic">Mișcă caii lui de fulger și-a lui car. Călări pe bouri,</p>
            <p class="mb-0 fst-italic">A lui oaste luminoasă îl urma din răsărit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ca o negur-argintie barba lui flutură-n soare,</p>
            <p class="mb-0 fst-italic">Pletele-n furtună-nflate albe ard ca o ninsoare,</p>
            <p class="mb-0 fst-italic">Colțuroasa lui coroană e ca fulger împietrit,</p>
            <p class="mb-0 fst-italic">Împletit cu stele-albastre. Răsturnat în car cu rune,</p>
            <p class="mb-0 fst-italic">Cu-a lui mân-arată drumul la oștirile-i bătrâne</p>
            <p class="mb-0 fst-italic">Și de dor de bătălie crunt e ochiul strălucit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Astfel arcul nalt din ceruri el îl urcă cu grandoare.</p>
            <p class="mb-0 fst-italic">Munții lungi își clatin codrii cei antici, și-n răsunare</p>
            <p class="mb-0 fst-italic">Prăvălesc de stânci căciule, salutând întunecat;</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iar hlamida lui cea albă zvârle falduri de zăpadă,</p>
            <p class="mb-0 fst-italic">Când el brațul își ridică strigând stâncelor să cadă,</p>
            <p class="mb-0 fst-italic">Mișcând codrii de răsună în imperiul lor urcat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și-n zenit opri oștirea-i peste armia romană.</p>
            <p class="mb-0 fst-italic">­ Decebal! el strigă-n nouri îi detun, îi iau în goană</p>
            <p class="mb-0 fst-italic">Și Danubiul o să beie a lor sacre legiuni.</p>
            <p class="mb-0 fst-italic">Decebal s-arată palid în fereasta naltă-ngustă</p>
            <p class="mb-0 fst-italic">Și coroana și-o ridică cătr-imaginea augustă</p>
            <p class="mb-0 fst-italic">Și se uită cu durere la divinii săi străbuni.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iar pe plaiuri verzi de munte oștile-urbei risipite</p>
            <p class="mb-0 fst-italic">Privesc cerul, zeii dacici, armiile lor pornite</p>
            <p class="mb-0 fst-italic">Rupt e șirul lor pe-alocuri de al soarelui foc roș.</p>
            <p class="mb-0 fst-italic">Pe un trunchi înalt de stâncă chiar cezarul stă-n uimire:</p>
            <p class="mb-0 fst-italic">­ Ridicați semnale urbei înspre-a cerului oștire</p>
            <p class="mb-0 fst-italic">Și strigați: Cu noi e Roma! Codri-adânci și-ntunecoși</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Clocotesc de lungul freamăt și de-a armelor sunare.</p>
            <p class="mb-0 fst-italic">Armia: „Cu noi e Roma! " Acvilele-i ard în soare</p>
            <p class="mb-0 fst-italic">Van din Sarmisegetuza vin săgeți în roșii ploi,</p>
            <p class="mb-0 fst-italic">Scuturi se îndrept spre dânsa, oprind grindina de-aramă,</p>
            <p class="mb-0 fst-italic">Zeii urlă stânci se clatin, norii-n fâșii se distramă</p>
            <p class="mb-0 fst-italic">Și pe fulgeri lungi șiroaie curg în munții rupți și goi.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Din apus vin zeii Romei. Pe o stea de vulturi trasă,</p>
            <p class="mb-0 fst-italic">Zeus de nori-adunătorul urcă bolta maiestoasă,</p>
            <p class="mb-0 fst-italic">Mart încoardă arcul falnic spre Zamolxe ațintit;</p>
            <p class="mb-0 fst-italic">Ca să scape neamul nobil răsărit din a lui coaste,</p>
            <p class="mb-0 fst-italic">Însuși el a urbei semne le ridică înspre oaste,</p>
            <p class="mb-0 fst-italic">Și de-antica lui turbare tremur norii de granit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Lumea pare răsculată din caotic-adâncime.</p>
            <p class="mb-0 fst-italic">Nori se suie-n stâlpi și-n globuri. Din eternă-ntunecime</p>
            <p class="mb-0 fst-italic">Ca să lupte-acuma Joe pe titani i-a liberat;</p>
            <p class="mb-0 fst-italic">Și tunând ei urcă cerul, surpând scările de nouri,</p>
            <p class="mb-0 fst-italic">De sub scuturi de fier negru arcurile-ntind în bouri,</p>
            <p class="mb-0 fst-italic">De se năruie văzduhul de-al săgeților vărsat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Negurile-n stâlpi se-ncheagă, suind vârful lor în soare</p>
            <p class="mb-0 fst-italic">Par un codru sur și vecinic. Lunci albastre lucitoare</p>
            <p class="mb-0 fst-italic">Se deschid ca loc de luptă în păduri de nori ș-argint;</p>
            <p class="mb-0 fst-italic">Printre stâlpii suri s-arată coifuri mândru așezate</p>
            <p class="mb-0 fst-italic">Pe pletoase frunți divine pavezi de-aur ridicate,</p>
            <p class="mb-0 fst-italic">Lănci ce fulgeră în soare, arcuri ce se-ntind în vânt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Joe-ncruntă-a lui sprincenă și ca un copil tresare</p>
            <p class="mb-0 fst-italic">Vechiul glob munții se clatin, ceruri tremur, marea moare.</p>
            <p class="mb-0 fst-italic">E semnalul cel de luptă între-armiile de zei;</p>
            <p class="mb-0 fst-italic">Și Zamolx frânele lasă cailor lui de jeratic,</p>
            <p class="mb-0 fst-italic">Coama lor se îmflă-n limbe de-aur tremur nebunatec,</p>
            <p class="mb-0 fst-italic">Bouri daci răstindu-și fruntea surpă norii toți cu ei.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Lupta-i crudă, lungă, aspră. Lumin pavezele dave,</p>
            <p class="mb-0 fst-italic">Sori și lune repezite printr-a norilor dumbrave</p>
            <p class="mb-0 fst-italic">Ard albastrele armure ale zeilor romani;</p>
            <p class="mb-0 fst-italic">Pașii lor amestec cerul caii tropotă, iar bouri</p>
            <p class="mb-0 fst-italic">Ca de tunete un secol împlu halele de nouri</p>
            <p class="mb-0 fst-italic">Și se frâng crâșnind în scuturi spadele-albe-a lui Vulcan.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">În zădar, căci neînvinse șiruri lungi de bătălie</p>
            <p class="mb-0 fst-italic">Își zdrobesc armele-n scuturi pe a cerului câmpie:</p>
            <p class="mb-0 fst-italic">Neînvinși ș-unii și alții ș-unii ș-alți nemuritori.</p>
            <p class="mb-0 fst-italic">În zădar Marte s-aruncă spre a sparge șiruri dace</p>
            <p class="mb-0 fst-italic">Și în van fulgeră Joe supra coifelor audace,</p>
            <p class="mb-0 fst-italic">Neclintiți stau ș-unii ș-alții în măreață lupta lor.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe un arc de cer albastru în senină depărtare,</p>
            <p class="mb-0 fst-italic">Rezimați pe lănci și scuturi, zeii nordici stau în soare,</p>
            <p class="mb-0 fst-italic">O eternă auroră răcorește lumea lor;</p>
            <p class="mb-0 fst-italic">Iar în fruntea-acelei bolte, pe un tron cu spata mare,</p>
            <p class="mb-0 fst-italic">Odin adâncit în gânduri vede-a luptei lungi grandoare</p>
            <p class="mb-0 fst-italic">Și coroana-i de-aur luce pe-a lui frunte arzător.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pletele-albe cad c-argintul pe-umere-n fir îmbrăcate.</p>
            <p class="mb-0 fst-italic">Lin își netezește barba și priviri întunecate</p>
            <p class="mb-0 fst-italic">Ochii lui cei mari albaștri spre luptași au îndreptat;</p>
            <p class="mb-0 fst-italic">Freea albă ca zăpada, zveltă, în albastră haină,</p>
            <p class="mb-0 fst-italic">Capul ei muiat în aurul pletelor, c-o dulce taină,</p>
            <p class="mb-0 fst-italic">Razimă de-umerii asprii l-al Valhalei împărat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cântăreț e uraganul pentru lupta care arde,</p>
            <p class="mb-0 fst-italic">Bolta lirei lui e cerul, stâlpi de nori sunt a lui coarde.</p>
            <p class="mb-0 fst-italic">Vânturând stelele roșii prin argintul neguros,</p>
            <p class="mb-0 fst-italic">Ele lunecă frumoase prin îmflarea sântă-a strunii,</p>
            <p class="mb-0 fst-italic">Gânduri d-aur presărate în cântările furtunii,</p>
            <p class="mb-0 fst-italic">Codri-antici de vânt se-ndoaie și răspund întunecos.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Joe vulturilor lasă frânele. Cu-a lor aripe</p>
            <p class="mb-0 fst-italic">Lungi și negre ei întunec soarele. Iară în râpe</p>
            <p class="mb-0 fst-italic">Goale și adânci de nouri e Zamolxe-n a lui car</p>
            <p class="mb-0 fst-italic">El văzu capul lui Joe, cum l-apus de soare-n vale</p>
            <p class="mb-0 fst-italic">Vezi un vârf de munte negru scris cu raze triumfale,</p>
            <p class="mb-0 fst-italic">Pe când el cu întuneric peste văi stă temerar.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ochii-olimpicului negri ațintesc cadrul. Cu frică,</p>
            <p class="mb-0 fst-italic">Spre-a opri acea privire, dacul manta și-o ridică.</p>
            <p class="mb-0 fst-italic">Caii speriați nechează, tremurând ei se înalță;</p>
            <p class="mb-0 fst-italic">C-o strigare rece Joe fulgerul i-nfige-n coaste</p>
            <p class="mb-0 fst-italic">Și a zeilor Daciei cruntă și măreață oaste</p>
            <p class="mb-0 fst-italic">Orbită aude glasul părintelui lor rănit</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și-o întorc la fugă; caii, carul rupt în nori răstoarnă,</p>
            <p class="mb-0 fst-italic">Din titanicele arcuri ploaie de săgeți se toarnă,</p>
            <p class="mb-0 fst-italic">Nimerind în spate goale pe fugarii cei divini;</p>
            <p class="mb-0 fst-italic">Și răniți, urlând ei bolta o coboară, ș-o coloră</p>
            <p class="mb-0 fst-italic">Cu-a lor sânge care-n râuri ude, roșii, de-auroră,</p>
            <p class="mb-0 fst-italic">Împle-a norilor spărture cu mari lacuri de rubin.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Norii fug și se desfășur bolta limpede se-ndoaie.</p>
            <p class="mb-0 fst-italic">În zenit stau zeii Romei în auritele lor straie,</p>
            <p class="mb-0 fst-italic">Lăncile și-ncrucișează privind armia din văi;</p>
            <p class="mb-0 fst-italic">A lor chipuri luminoase strălucesc frumoase-n soare,</p>
            <p class="mb-0 fst-italic">Ei și-ntorc caii cei falnici și-auritele lor care</p>
            <p class="mb-0 fst-italic">Spre apus iar roșul soare îi urmează-ncet pe ei.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Zeii daci ajung la marea, ce deschide-a ei portale,</p>
            <p class="mb-0 fst-italic">Se reped pe trepte nalte și cobor în sure hale.</p>
            <p class="mb-0 fst-italic">Cu lumina, ei îngroapă a lor trai întunecos;</p>
            <p class="mb-0 fst-italic">Dară ea, înfiorată de adânca ei durere,</p>
            <p class="mb-0 fst-italic">În imagini de talazuri cânt-a Daciei cădere</p>
            <p class="mb-0 fst-italic">Și cu-albastrele ei brațe țărmii-i mângâie duios.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Se constelă sara. Ziua a fugit în lumea mării</p>
            <p class="mb-0 fst-italic">Și pe culmile de munte focuri au aprins străjerii</p>
            <p class="mb-0 fst-italic">Ca și pete mari de aur n-umbra văilor adânci,</p>
            <p class="mb-0 fst-italic">Ele par suspinse-n nouri. Lângă foc străjerii-aruncă</p>
            <p class="mb-0 fst-italic">Pe pereții suri de piatră umbra lor fantastic-lungă.</p>
            <p class="mb-0 fst-italic">Armia doarme pe pajiști ridicate și sub stânci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Sub o stâncă lângă focul ce pereții îi afumă,</p>
            <p class="mb-0 fst-italic">Cezaru-i culcat pe paie, singur, cu-a lui grije numa;</p>
            <p class="mb-0 fst-italic">Sub el, văile adânce pline de neguri și somn.</p>
            <p class="mb-0 fst-italic">El privea la focuri roșii și la stânci de umbră pline;</p>
            <p class="mb-0 fst-italic">Ca un clopot clar albastru și stropit cu mii lumine</p>
            <p class="mb-0 fst-italic">Cerul lumea o cuprinde cu sinistru-i mândru domn.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Amorțit el mișcă limba lui de tunet printre nouri,</p>
            <p class="mb-0 fst-italic">Trezea, scăpărând printr-înșii, ale văilor ecouri,</p>
            <p class="mb-0 fst-italic">Iar în cârduri cuvioase stelele se mișcă-ncet,</p>
            <p class="mb-0 fst-italic">Intră-n domele de neguri argintii, multicoloane;</p>
            <p class="mb-0 fst-italic">De-a lor rugă plină-i noaptea. A lor dulci și moi icoane</p>
            <p class="mb-0 fst-italic">Împlu văile de lacrimi, de-un sclipit împrăștiet.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ale focurilor raze cearcă neguri să străbată</p>
            <p class="mb-0 fst-italic">Și de dunge de lumină umbra văii e tăiată,</p>
            <p class="mb-0 fst-italic">Cari trec prin întuneric râuri și izvoare-albind;</p>
            <p class="mb-0 fst-italic">Luminând în ochi de codri, scăpărând pe repezi unde,</p>
            <p class="mb-0 fst-italic">Vântul c-o suflare plânsă codrii negri îi pătrunde</p>
            <p class="mb-0 fst-italic">Și vrăjește lin din frunze, și vorbește aiurind.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe un vârf de munte negru rari în lună stau stejarii,</p>
            <p class="mb-0 fst-italic">Iar Traian pare că vede răsărind prin ei cezarii,</p>
            <p class="mb-0 fst-italic">Salutând a Romei semne cu-a lor mort, adânc surâs;</p>
            <p class="mb-0 fst-italic">Și încet ei trec prin aer, privind lung cetatea dacă,</p>
            <p class="mb-0 fst-italic">Binecuvântând oștirea spre apus ei iarăși pleacă,</p>
            <p class="mb-0 fst-italic">A lor șiruri luminoase împlu aerul de vis.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Înrădăcinată-n munte cu trunchi lungi de neagră stâncă,</p>
            <p class="mb-0 fst-italic">Răpezită nalt în aer din prăpastia adâncă,</p>
            <p class="mb-0 fst-italic">Sarmisegetuza-ajunge norii cu-a murilor colți;</p>
            <p class="mb-0 fst-italic">Și prin arcurile-nguste, făclii roșii de rășină</p>
            <p class="mb-0 fst-italic">Negrul nopții îl pătează cu bolnava lor lumină,</p>
            <p class="mb-0 fst-italic">Rănind asprul întuneric din a halelor lungi bolți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și prin arcuri îndoite la lumini de roșii torții,</p>
            <p class="mb-0 fst-italic">Adunați văzu cezarul la cumplita mas-a morții:</p>
            <p class="mb-0 fst-italic">Ducii daci. Făclii de smoală sunt înfipte-n stâlpi și-n muri,</p>
            <p class="mb-0 fst-italic">Luminând halele negre, armuri albe și curate,</p>
            <p class="mb-0 fst-italic">Atârnate de columne, lănci și arcuri răzimate</p>
            <p class="mb-0 fst-italic">De păreți pavezi albastre strălucind pe stâlpii suri.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ducii-s nalți ca brazi de munte, tari ca și săpați din stâncă.</p>
            <p class="mb-0 fst-italic">Crunt e ochiul lor cel mare, tristă-i raza lor adâncă,</p>
            <p class="mb-0 fst-italic">Pe-a lor umeri spânzur roșii piei de tigru și de leu,</p>
            <p class="mb-0 fst-italic">Tari la braț și drepți la suflet și pieptoși, cu spete late,</p>
            <p class="mb-0 fst-italic">Coifuri ca granit de negre au pe frunte așezate</p>
            <p class="mb-0 fst-italic">Și-a lor plete lungi și negre pe-umeri cad de semizeu.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cupele țeste de dușman albe, netede, uscate,</p>
            <p class="mb-0 fst-italic">În argint, cu toate de-aur prea maestru cizelate</p>
            <p class="mb-0 fst-italic">Și cu ele-n mână-nconjur lunga masă de granit;</p>
            <p class="mb-0 fst-italic">Vor mai bine-o moarte crudă decât o viață sclavă</p>
            <p class="mb-0 fst-italic">Toarnă-n țestele mărețe vin și peste el otravă,</p>
            <p class="mb-0 fst-italic">Și-n tăcerea sânt-a nopții ei ciocnesc, vorbesc și râd.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Râd și râsul însenină adâncita lor paloare.</p>
            <p class="mb-0 fst-italic">Se sting una câte una faclele mirositoare,</p>
            <p class="mb-0 fst-italic">Se sting una câte una viețile ducilor daci;</p>
            <p class="mb-0 fst-italic">De pe scaune cad pe piatra rece, sură, ce podește</p>
            <p class="mb-0 fst-italic">Sala. Toți, toți pân-la unul. Unul încă tot trăiește,</p>
            <p class="mb-0 fst-italic">Arde sânta lui coroană, fulger ochii lui audaci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Luna-n ocean albastru scaldă corpul ei de aur</p>
            <p class="mb-0 fst-italic">Luminând culmile sure și adâncul colcântaur,</p>
            <p class="mb-0 fst-italic">Dintru care-ieșit se vâră-n nouri anticul castel;</p>
            <p class="mb-0 fst-italic">Decebal (palid ca murul văruit în nopți cu lună)</p>
            <p class="mb-0 fst-italic">Se arată în fereastă și-și întinde alba mână</p>
            <p class="mb-0 fst-italic">Moartă din flamida neagră ce-l acopere pe el.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">El vorbește. Și profetic glasu-i secolii pătrunde:</p>
            <p class="mb-0 fst-italic">Sufletu-i naintea morții lumineaz-a vremii unde;</p>
            <p class="mb-0 fst-italic">Gândul lui o prorocie, vorba lui mărgăritar;</p>
            <p class="mb-0 fst-italic">Și l-aude valea-adâncă și l-aud stelele multe.</p>
            <p class="mb-0 fst-italic">De pe stânca lui cezarul stă-n uimire să-l asculte,</p>
            <p class="mb-0 fst-italic">Vorbele-una câte una lunecă-n ureche-i clar:</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">­ Vai vouă, romani puternici! Umbră, pulbere și spuză</p>
            <p class="mb-0 fst-italic">Din mărirea-vă s-alege! Limba va muri pe buză,</p>
            <p class="mb-0 fst-italic">Vremi veni-vor când nepoții n-or pricepe pe părinți</p>
            <p class="mb-0 fst-italic">Cât de naltă vi-i mărirea tot așa de-adânc- căderea.</p>
            <p class="mb-0 fst-italic">Pic cu pic secând păharul cu a degradărei fiere,</p>
            <p class="mb-0 fst-italic">Îmbăta-se-vor nebunii despera-vor cei cuminți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Pe-a istoriei mari pânze, umbre-a sclavelor popoare</p>
            <p class="mb-0 fst-italic">Prizărite, tremurânde trec o lungă acuzare</p>
            <p class="mb-0 fst-italic">Târând sufletul lor veșted pe-al corupției noroi.</p>
            <p class="mb-0 fst-italic">Voi nu i-ați lăsat în voia sorții lor. Cu putrezirea</p>
            <p class="mb-0 fst-italic">Sufletului vostru propriu ați împlut juna lor fire,</p>
            <p class="mb-0 fst-italic">Soarta lor vă e pe suflet ce-ați făcut cu ele? Voi!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Nu vedeți că în furtune vă blăstamă oceane?</p>
            <p class="mb-0 fst-italic">Prin a craterelor gure răzbunare strig vulcane,</p>
            <p class="mb-0 fst-italic">Lava de evi grămădită o reped adânc în cer,</p>
            <p class="mb-0 fst-italic">Prin a evului nori negri de jeratic cruntă rugă</p>
            <p class="mb-0 fst-italic">Către zei ca neamul vostru cel căzut, ei să-l distrugă</p>
            <p class="mb-0 fst-italic">Moartea voastră: firea-ntreagă și popoarele o cer.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Va veni. Stârniți din pace de-a prorocilor cântare.</p>
            <p class="mb-0 fst-italic">Din păduri eterne, hale verzi, vor curge mari popoare</p>
            <p class="mb-0 fst-italic">Și gândiri de predomnire vor purta pe fruntea lor;</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Constelații sângeroase ale boltelor albastre</p>
            <p class="mb-0 fst-italic">Zugrăvi-vor a lor cale spre imperiile voastre,</p>
            <p class="mb-0 fst-italic">Fluvii cu de pavezi valuri înspre Roma curgători.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">De pe Alpi ce stau deasupra norilor cu fruntea ninsă,</p>
            <p class="mb-0 fst-italic">De prin bolți de codru verde, de prin stâncile suspinse,</p>
            <p class="mb-0 fst-italic">Pe a pavezelor sănii coborâ-vor în șivoi;</p>
            <p class="mb-0 fst-italic">Cu cenușa pocăinței și-a împlea pământul fruntea,</p>
            <p class="mb-0 fst-italic">Cu cenușa Romei voastre moarte legioane punte.</p>
            <p class="mb-0 fst-italic">Peste râuri. Și nimica nu se v-alege din voi.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Veți ajunge ca-n tâmpire, în sclavie, degradare.</p>
            <p class="mb-0 fst-italic">Pas cu pas cade-n rușine neamul vostru sânt și mare:</p>
            <p class="mb-0 fst-italic">Că-n iloți se va preface gintea de-nțelepți și crai,</p>
            <p class="mb-0 fst-italic">Când barbarii vor aduce delta sântelor lor vise,</p>
            <p class="mb-0 fst-italic">Îmbrâncind în întunerec toate cele de voi zise.</p>
            <p class="mb-0 fst-italic">Vai vouă, romani puternici, vai vouă, de trei ori vai!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Astfel zise. În blăstămu-i mâna-i albă și uscată</p>
            <p class="mb-0 fst-italic">El o scoate pe fereastă și coroana-ntunecată</p>
            <p class="mb-0 fst-italic">De pe frunte o aruncă în abisul văii-adânci;</p>
            <p class="mb-0 fst-italic">Palid, adâncit ca moartea, ca o umbră stă în lună,</p>
            <p class="mb-0 fst-italic">Părul lui de vânt se îmflă, iară vorbele-i răsună</p>
            <p class="mb-0 fst-italic">Și blestemu-i se repetă repezit din stânci în stânci!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și uimit stătea Cezarul... Cugeți tu, pământ? el zise</p>
            <p class="mb-0 fst-italic">Avem noi în mâni a lumei soarte sau cortegi de vise?</p>
            <p class="mb-0 fst-italic">Hotărâți de-a ta gândire urmăm azi ziua de ieri?...</p>
            <p class="mb-0 fst-italic">Și în ordinele-eterne mișc-asupra-i universul</p>
            <p class="mb-0 fst-italic">Oceanele-i de stele. Ce ironic li e mersul!</p>
            <p class="mb-0 fst-italic">Cezare! cât pai de mare și ce mic în adevăr!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Sâmburele crud al morții e-n viață... Și-n mărire</p>
            <p class="mb-0 fst-italic">Afli germenii căderei. Astfel toate sunt în fire,</p>
            <p class="mb-0 fst-italic">Astfel au căzut romanii, mari în bine, mari în rău.</p>
            <p class="mb-0 fst-italic">Da-i cumplit să vezi un popol osândit să fie mare</p>
            <p class="mb-0 fst-italic">Chiar în rău, că mereu crește rușinoasa-i degradare</p>
            <p class="mb-0 fst-italic">Și nici moartea nu-i trimite nenduratul Dumnezeu.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Căci a morții braț puternic, când stă viața s-o despartă,</p>
            <p class="mb-0 fst-italic">Nu se-ndură să ridice sângeroasa-i lungă bardă,</p>
            <p class="mb-0 fst-italic">Cum călăul greu se-ndeamnă la un cap d-imperator:</p>
            <p class="mb-0 fst-italic">Zeii pregetă să-și deie-a lor sentință... Și-n uimire</p>
            <p class="mb-0 fst-italic">Cugetă de au fost popol destinat spre nemurire,</p>
            <p class="mb-0 fst-italic">Au fost ei și dacă mor ei suntem noi nemuritori?...</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Strănepoții?... Rupți din trunchiul ce ni da viață fertilă,</p>
            <p class="mb-0 fst-italic">Pe noi singuri ne uitarăm printre secoli făr- de milă.</p>
            <p class="mb-0 fst-italic">Ei purtau coroane de-aur, noi duceam juguri de lemn...</p>
            <p class="mb-0 fst-italic">Exilați în stânci bătrâne au umplut ei cu noi lumea,</p>
            <p class="mb-0 fst-italic">Am uitat mărirea veche, cu rușine chiar de nume,</p>
            <p class="mb-0 fst-italic">Multe semne de pieire și de viață nici un semn.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Au fost vremi când pe pământul lor n-aveau loc să-nmormânte</p>
            <p class="mb-0 fst-italic">Morții lor... P-inimi regale și pe membrele lor sfinte</p>
            <p class="mb-0 fst-italic">Spânzura zdrențe umilice de sclavi, de cerșitori</p>
            <p class="mb-0 fst-italic">Căci simțiră-n ei scânteia care secolii aprinde.</p>
            <p class="mb-0 fst-italic">Întronați au fost în tronuri arse-n foc... Și pe-a lor frunte</p>
            <p class="mb-0 fst-italic">Pusu-ș-au de fier coroane arse-n foc sfășiitor.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și deși-n inima noastră sunt semințe de mărire,</p>
            <p class="mb-0 fst-italic">Noi nu vrem a le cunoaște; căci străina-ne gândire</p>
            <p class="mb-0 fst-italic">Au zdrobit a vieții veche uriaș, puternic lanț;</p>
            <p class="mb-0 fst-italic">Secoli lungi ce-au rămas văduvi de a Romei spirit mare</p>
            <p class="mb-0 fst-italic">L-au creat... în noi el este; noi îl stingem. Dacă moare,</p>
            <p class="mb-0 fst-italic">Noi murim... ramul din urmă din trupina de giganți.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Când îi cugeți, cugetarea sufletu-ți divinizează.</p>
            <p class="mb-0 fst-italic">În trecut mergem, cum zeii trec în cer pe căi de raze.</p>
            <p class="mb-0 fst-italic">Peste adâncimi de secoli ne ridică curcubei;</p>
            <p class="mb-0 fst-italic">Un popor de zei le trecem, căci prin evi de vecinicie</p>
            <p class="mb-0 fst-italic">Auzim cetatea sfântă cu-nmiita-i armonie...</p>
            <p class="mb-0 fst-italic">Și ne simțim mari, puternici, numai de-i gândim pe ei...</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Miazănoaptea-n visuri d-iarnă își petrece a ei viață.</p>
            <p class="mb-0 fst-italic">Doarme-n valurile-i sfinte și-n ruinele-i de gheață,</p>
            <p class="mb-0 fst-italic">Însoțită de-ani o mie cu bătrânul rege Nord,</p>
            <p class="mb-0 fst-italic">Ce, superb în haina-i albă, barba-n vânturi, fruntea ninsă,</p>
            <p class="mb-0 fst-italic">Rece suflă,-n nori aruncă vocea-i turbure și plânsă,</p>
            <p class="mb-0 fst-italic">Îmbătat de mândre stele și cântat de-al mării-acord.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Reci și triști petreceau soții; iarna-n zilele-i eterne</p>
            <p class="mb-0 fst-italic">Văl de-argint peste pustiuri ca lințoliu îl așterne.</p>
            <p class="mb-0 fst-italic">Vânturi reci îs respirarea undelor ce-au amorțit;</p>
            <p class="mb-0 fst-italic">Arfa lui prin nouri strigă inima-i e ger și gheață</p>
            <p class="mb-0 fst-italic">Marea, ca să delireze, vânturi să mugească-nvață</p>
            <p class="mb-0 fst-italic">Stelele s-oglindă-n neauă pe pustiul nesfârșit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar atuncea când sosește blânda miezenopții oră,</p>
            <p class="mb-0 fst-italic">Ceru-albastru ca safirul mândre raze îl coloră</p>
            <p class="mb-0 fst-italic">Și din a Nordului frunte plin se nalță-astrul polar</p>
            <p class="mb-0 fst-italic">Atunci marea nu răsare printre stânci de vânt gonită,</p>
            <p class="mb-0 fst-italic">Vântul pe-aripi nu mai duce pulberea iernei-aurită,</p>
            <p class="mb-0 fst-italic">Toate tac când raza-i albă cade-n marea de amar.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și când steaua se înalță de pe fruntea lui de rege,</p>
            <p class="mb-0 fst-italic">Nordu-atunci cu visuri mândre noaptea lungă și-o petrece.</p>
            <p class="mb-0 fst-italic">De pe stânca-n care tronă, el picioare de granit</p>
            <p class="mb-0 fst-italic">Le întinde-n fundul mării cel amar și fără fine.</p>
            <p class="mb-0 fst-italic">Păru-i alb flutură-n vânturi, stuf de raze lungi, senine,</p>
            <p class="mb-0 fst-italic">Umerii, dealuri de neauă se înalță-n infinit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Iară fruntea lui uscată stă prin viscole rebele,</p>
            <p class="mb-0 fst-italic">Surpând nourii cei aspri și amestecați cu stele</p>
            <p class="mb-0 fst-italic">Jos e-nmormântat de mare, sus e-ncununat de cer;</p>
            <p class="mb-0 fst-italic">Atunci luciul mării turburi se aplană, se-nsenină</p>
            <p class="mb-0 fst-italic">Și din fundul ei sălbatec auzi cântec, vezi lumină</p>
            <p class="mb-0 fst-italic">Visul unei nopți de vară s-a amestecat în ger.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și în fundul mării aspre, de safir mândre palate</p>
            <p class="mb-0 fst-italic">Ridic bolțile lor splendizi, ș-a lor hale luminate,</p>
            <p class="mb-0 fst-italic">Stele de-aur ard în facle, pomi în floare se înșir;</p>
            <p class="mb-0 fst-italic">Și prin aerul cel moale, cald și clar, prin dulci lumine</p>
            <p class="mb-0 fst-italic">Vezi plutind copile albe ca și florile vergine,</p>
            <p class="mb-0 fst-italic">Îmbrăcate-n haine-albastre, blonde ca-auritul fir.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Albe sunt ca neaua noaptea, fața înecată-n raze</p>
            <p class="mb-0 fst-italic">Priivește însuși cerul dintre nouri să le vază:</p>
            <p class="mb-0 fst-italic">Despletit flutură pe-umeri, moale, dulce, părul blond.</p>
            <p class="mb-0 fst-italic">Noaptea-n nori visează stele și se uită-n fund de mare,</p>
            <p class="mb-0 fst-italic">Luna lin roșește-n față de amor și de mirare,</p>
            <p class="mb-0 fst-italic">Se aplană de uimire valu-albastru vagabond.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dară una-i fiica mării ca o lacrimă de aur.</p>
            <p class="mb-0 fst-italic">Păru-i curge la călcâie ca un lung și scump tezaur:</p>
            <p class="mb-0 fst-italic">E a stelelor regină, e al nopții meteor.</p>
            <p class="mb-0 fst-italic">Ades albă dintre valuri de-a înot marea despică</p>
            <p class="mb-0 fst-italic">Și albastrul blând al mării albul sânilor ridică,</p>
            <p class="mb-0 fst-italic">Valurile-n cânt salută sântul apelor odor.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Acolo în fundul mării, în înalte-albastre hale,</p>
            <p class="mb-0 fst-italic">Șed la mese lungi de piatră zeii falnicei Valhale;</p>
            <p class="mb-0 fst-italic">Odin stă-n frunte cu părul de ninsoare încărcat;</p>
            <p class="mb-0 fst-italic">Acolo decid ei moartea Romei și o scriu în rune,</p>
            <p class="mb-0 fst-italic">Presun de argint și zale pun pe caii ca furtune</p>
            <p class="mb-0 fst-italic">Astfel se gătesc de ducă pentru drumu-ndelungat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și atunci furtuna mândră dezrădăcinat-a marea.</p>
            <p class="mb-0 fst-italic">Ea zvârlea frunți de talazuri către stelele-arzătoare.</p>
            <p class="mb-0 fst-italic">Ridica sloiuri de gheață, le-arunca în șanț de nori,</p>
            <p class="mb-0 fst-italic">Vrând să spargă cu ei cerul. Într-un colț de cer e vară</p>
            <p class="mb-0 fst-italic">Și pe scările de-ivoriu unii dintre zei coboară</p>
            <p class="mb-0 fst-italic">Strălucea-n noaptea bătrână fețele ca palizi sori.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Prin a valurilor vaiet, prin a norilor strigare,</p>
            <p class="mb-0 fst-italic">Deschidea portale-albastre mândra și bătrâna mare.</p>
            <p class="mb-0 fst-italic">Desfăcu apele-n două dumnezeilor călări</p>
            <p class="mb-0 fst-italic">Și la țărm cu stânce rupte de a undelor bătaie</p>
            <p class="mb-0 fst-italic">S-adun toți. Aurul din plete lucea-n luna cea bălaie,</p>
            <p class="mb-0 fst-italic">Coifuri străluceau albastre ca lumina sfintei mări.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și pornesc. Odin ș-aruncă sulița prin nori de-aramă,</p>
            <p class="mb-0 fst-italic">Care trece-un ac de aur într-a cerului maramă,</p>
            <p class="mb-0 fst-italic">Arătând pe neauă drumul l-al Italiei pământ.</p>
            <p class="mb-0 fst-italic">Ei se duc, se duc prin câmpii așternuți cu-albă ninsoare,</p>
            <p class="mb-0 fst-italic">Strălucea albastru-oțelul de pe membrele barbare,</p>
            <p class="mb-0 fst-italic">Pletele le-îmfla furtuna, bărbile sclipeau în vânt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ei apar pe-un dâmb al Romei ea dormea sfântă ș-antică.</p>
            <p class="mb-0 fst-italic">Peste lumea-i adormită câte-o stea din ceruri pică,</p>
            <p class="mb-0 fst-italic">Secoli grămădiți într-însa dorm ca și când n-ar fi fost.</p>
            <p class="mb-0 fst-italic">Cugetat-ați vreodată noaptea ce-i lumea întinsă?</p>
            <p class="mb-0 fst-italic">Visurile Omenirei, dorurile ei nenvinse</p>
            <p class="mb-0 fst-italic">Dorm... dacă ar dormi vecinic cine-ar ști că ele-au fost?</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Țara pare-a fi a lunei mândră, veselă grădină.</p>
            <p class="mb-0 fst-italic">Lumina un gând de aur, sus prin nori, luna cea plină,</p>
            <p class="mb-0 fst-italic">Roma-n stele strălucește pe-a ei dâmburi, lângă râu;</p>
            <p class="mb-0 fst-italic">Ei privesc urbea eternă, ce pe dealuri lin străluce,</p>
            <p class="mb-0 fst-italic">Sulița pe loc s-oprește, se preface-n d-aur cruce.</p>
            <p class="mb-0 fst-italic">Odin moare Tibrul este a Credinței lui sicriu.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cum sub stânci, în întuneric, măruntăile de-aramă</p>
            <p class="mb-0 fst-italic">A pământului, în lanțuri țin legat și fără teamă</p>
            <p class="mb-0 fst-italic">Sufletul muiat în flăcări a vulcanului grozav.</p>
            <p class="mb-0 fst-italic">Astfel secoli de-ntuneric țin în lanțuri d-umilire</p>
            <p class="mb-0 fst-italic">Spiritul, ce-adânc se zbate într-a populilor fire,</p>
            <p class="mb-0 fst-italic">Spiritul, ce-a vremei fapte, de-ar ieși, le-ar face prav.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar de secoli fierbe lumea din adâncuri să se scoale.</p>
            <p class="mb-0 fst-italic">Cum vulcanul, ce irumpe, printre nori își face cale</p>
            <p class="mb-0 fst-italic">Și îngroapă sub cenușă creațiunea unei țări,</p>
            <p class="mb-0 fst-italic">Astfel fiii tari și tineri unor secole bătrâne</p>
            <p class="mb-0 fst-italic">Lumea din încheieture vor s-o scoață, din țâțâne</p>
            <p class="mb-0 fst-italic">Să o smulgă, s-o arunce în zbucnirea noii eri.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Tricolorul plin de sânge e-mplântat în baricade,</p>
            <p class="mb-0 fst-italic">Clopotele url-alarmă pe Bastilia ce cade</p>
            <p class="mb-0 fst-italic">Și poporul muge falnic, ca un ocean trezit;</p>
            <p class="mb-0 fst-italic">Sfarmă tot și pe-a lui valuri, ce le urcă cu mândrie,</p>
            <p class="mb-0 fst-italic">El înalță firi cumplite, cari-l duc, o vijelie,</p>
            <p class="mb-0 fst-italic">Să îngroape sub ruine, ce-n picioare a strivit.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și prin negrele icoane unor zile fără frâuri,</p>
            <p class="mb-0 fst-italic">Unde viața e-o scânteie, unde sânge curge-n râuri,</p>
            <p class="mb-0 fst-italic">Palid, adâncit, sinistru, trece tigrul Robespierre;</p>
            <p class="mb-0 fst-italic">Și privirea-i sângeroasă s-alintează ca spre pândă:</p>
            <p class="mb-0 fst-italic">Căci ce scrie e-o sentință, ce gândește e-o osândă</p>
            <p class="mb-0 fst-italic">Într-un cran săpat ca-n piatră fierb gândirile-i de fier.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar el cade și s-așază ale mării nalte unde.</p>
            <p class="mb-0 fst-italic">A dreptății aspră rază în popor adânc pătrunde,</p>
            <p class="mb-0 fst-italic">Zilele de îngrozire s-a contras într-un fantom;</p>
            <p class="mb-0 fst-italic">Dar puteri neliniștite, ce trăiesc în adâncime,</p>
            <p class="mb-0 fst-italic">Ar vrea țărmul să-l evadă, să înece cu mărime</p>
            <p class="mb-0 fst-italic">Lumea. Ele se concentră în suflarea unui om,</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Mare, că-i purtat pe umeri de adânci și mândre vremuri:</p>
            <p class="mb-0 fst-italic">Căci gândiri, cari ieșise dintr-a lumii lung cutremur,</p>
            <p class="mb-0 fst-italic">El le poart-unite-n frunte și le scrie pe stindard;</p>
            <p class="mb-0 fst-italic">Când în lumea subjugată pentru drepturi ridic-arma,</p>
            <p class="mb-0 fst-italic">Arătarea-i salutată de popoare... regi se sfarmă</p>
            <p class="mb-0 fst-italic">Și a gloriei mândre stele într-a lumei noapte ard.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și de-aceea a lui flamuri le-nsoțesc cu-nsuflețire.</p>
            <p class="mb-0 fst-italic">El îi duce la învingeri, el îi duce la pieire.</p>
            <p class="mb-0 fst-italic">Cine moare moare-n cuget c-a rămas trăind în el;</p>
            <p class="mb-0 fst-italic">Tot ce-i nobil și puternic în ăst secol de mândrie</p>
            <p class="mb-0 fst-italic">Îl urmează... Căci prin noaptea unei lumi în bătălie</p>
            <p class="mb-0 fst-italic">Lin lucește-eterna pace, luminos și mândru țel.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cătră țelul care-n noapte le lucește ca un soare</p>
            <p class="mb-0 fst-italic">Ei se duc prin zeci de lupte, urmărindu-l cu ardoare,</p>
            <p class="mb-0 fst-italic">Zeci de mii cad, pe-a lor urme răsar alte zeci de mii,</p>
            <p class="mb-0 fst-italic">Steaua-i duce, ei urmează printre veri și printre ierne,</p>
            <p class="mb-0 fst-italic">Până unde-eterna iarnă munți de neauă-n câmpi așterne,</p>
            <p class="mb-0 fst-italic">Unde crivățul visează uriașe vijelii.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ș-atunci Nordul se stârnește din ruinele-i de gheață,</p>
            <p class="mb-0 fst-italic">Munții plutitori și-i sfarmă și pe-a câmpurilor față</p>
            <p class="mb-0 fst-italic">El ridică visuri nalte... volburi mari de frig se văd</p>
            <p class="mb-0 fst-italic">Și trecând peste oștire o îngroapă... Și cu fală</p>
            <p class="mb-0 fst-italic">El ridică drept făclie aurora-i boreală</p>
            <p class="mb-0 fst-italic">Peste-oștirea-ntroienită în pustiul... de omăt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Nordul m-a învins ideea m-a lăsat. Și ca un soare</p>
            <p class="mb-0 fst-italic">Vezi că-ncepe a apune într-a secolilor mare,</p>
            <p class="mb-0 fst-italic">Aruncând ultima-i rază peste domul d-invalizi.</p>
            <p class="mb-0 fst-italic">La apus privește lumea în duioasa ei uimire.</p>
            <p class="mb-0 fst-italic">N-a fost om acel ce cade, ci a veacului gândire</p>
            <p class="mb-0 fst-italic">A trăit în el... Cu dânsul cartea lumii iar s-a-nchis.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Exilat în stânce sure și-n titanica-i gândire,</p>
            <p class="mb-0 fst-italic">Ca Prometeu ce-a-adus lumei a luminei fericire,</p>
            <p class="mb-0 fst-italic">De pe-o piatră el privește lingușirea mării-adânci;</p>
            <p class="mb-0 fst-italic">Acolo, gonit de soarte și de gânduri el adoarme,</p>
            <p class="mb-0 fst-italic">Cu durere adâncă marea vrea pământul să-l răstoarne</p>
            <p class="mb-0 fst-italic">Și izbea mugind de doliu în mormântul lui de stânci.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Sori se sting și cad în caos mari sisteme planetare,</p>
            <p class="mb-0 fst-italic">Dar a omului gândire să le măsure e-n stare...</p>
            <p class="mb-0 fst-italic">Cine-mi măsur-adâncimea dintr-un om?... nu dintr-un gând</p>
            <p class="mb-0 fst-italic">Neaprofundabil. Vană e-a-nvățăților ghicire.</p>
            <p class="mb-0 fst-italic">Cum în fire-s numai margini, e în om nemărginire.</p>
            <p class="mb-0 fst-italic">Cât geniu, câtă putere într-o mână de pământ.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Într-un cran uscat și palid ce-l acoperi cu o mână,</p>
            <p class="mb-0 fst-italic">Evi întregi de cugetare trăiesc pacinic împreună,</p>
            <p class="mb-0 fst-italic">Univers, râuri de stele fluvii cu mase de sori;</p>
            <p class="mb-0 fst-italic">Viața turbure și mare a popoarelor trecute,</p>
            <p class="mb-0 fst-italic">A veciei văi deschise-s cu-adâncimi necunoscute,</p>
            <p class="mb-0 fst-italic">Vezi icoana unui secol lângă chipul unei flori!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Tu, ce în câmpii de caos semeni stele sfânt și mare,</p>
            <p class="mb-0 fst-italic">Din ruinele gândirii-mi, o, răsai, clar ca un soare,</p>
            <p class="mb-0 fst-italic">Rupe vălurle d-imagini, ce te-ascund ca pe-un fantom;</p>
            <p class="mb-0 fst-italic">Tu, ce scrii mai dinainte a istoriei gândire,</p>
            <p class="mb-0 fst-italic">Ce ții bolțile tăriei să nu cadă-n risipire,</p>
            <p class="mb-0 fst-italic">Cine ești?... Să pot pricepe și icoana ta... pe om.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Fulgeră-n norii de secoli unde-ngropi a ta mărime,</p>
            <p class="mb-0 fst-italic">Printre bolțile surpate să mă uit în adâncime:</p>
            <p class="mb-0 fst-italic">De-oi vedea a ta comoară, nu regret chiar de-oi muri.</p>
            <p class="mb-0 fst-italic">Oare viața omenirei nu te caută pe tine?</p>
            <p class="mb-0 fst-italic">Eu un om de te-aș cunoaște, chiar să mor mi-ar părea bine,</p>
            <p class="mb-0 fst-italic">Dar să știu semeni furnicei ce cuteaz-a te gândi?</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cine-a pus aste semințe, ce-arunc ramure de raze,</p>
            <p class="mb-0 fst-italic">Într-a caosului câmpuri, printre veacuri numeroase,</p>
            <p class="mb-0 fst-italic">Ramuri ce purced cu toate dintr-o inimă de om?</p>
            <p class="mb-0 fst-italic">A pus gânduri uriașe într-o țeastă de furnică,</p>
            <p class="mb-0 fst-italic">O voință-atât de mare-ntr-o putere-atât de mică,</p>
            <p class="mb-0 fst-italic">Grămădind nemărginirea în sclipitu-unui atom.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Vai! în van se luptă firea-mi să-nțeleagă a ta fire!</p>
            <p class="mb-0 fst-italic">Tu cuprinzi întregul spațiu cu a lui nemărginire</p>
            <p class="mb-0 fst-italic">Și icoana-ți n-o inventă omul mic și-n margini strâns.</p>
            <p class="mb-0 fst-italic">Jucăria sclipitoare de gândiri și de sentințe,</p>
            <p class="mb-0 fst-italic">Încurcatele sofisme nu explic a ta ființă</p>
            <p class="mb-0 fst-italic">Și asupra cugetării-ți pe mulți moartea i-a surprins.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Oamenii au făcut chipuri ce ziceau că-ți seamăn ție,</p>
            <p class="mb-0 fst-italic">Te-au săpat în munți de piatră, te-au sculptat într-o cutie,</p>
            <p class="mb-0 fst-italic">Ici erai zidit din stânce, colo-n așchii de lemn sfânt;</p>
            <p class="mb-0 fst-italic">Ș-apoi vrură ca din chipu-ți să explice toate. Mută</p>
            <p class="mb-0 fst-italic">La rugare și la hulă idola de ei făcută</p>
            <p class="mb-0 fst-italic">Rămânea!... Un gând puternic, dar nimic decât un gând.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">În zădar trimit prin secoli de-ntrebări o vijelie,</p>
            <p class="mb-0 fst-italic">Să te cate-n hieroglife din Arabia pustie,</p>
            <p class="mb-0 fst-italic">Unde Samum își zidește vise-n aer, din nisip.</p>
            <p class="mb-0 fst-italic">Ele trec pustiul mândru ș-apoi se coboară-n mare,</p>
            <p class="mb-0 fst-italic">Unde mitele cu-albastre valuri lungi, strălucitoare,</p>
            <p class="mb-0 fst-italic">Înecând a mele gânduri de lungi maluri le risip.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Prefăcute-n vulturi ageri cu aripi fulgerătoare,</p>
            <p class="mb-0 fst-italic">C-ochi adânci și plini de mite, i-au trimis în cer să zboare,</p>
            <p class="mb-0 fst-italic">Dar orbite, cu-aripi arse pe pământ cad îndărăt;</p>
            <p class="mb-0 fst-italic">Prefăcute-n stele de-aur merg pân- l-a veciei ușă,</p>
            <p class="mb-0 fst-italic">Dară arse cad din ceriuri și-mi ning capul cu cenușă</p>
            <p class="mb-0 fst-italic">Și când cred s-aflu-adevărul mă trezesc c-am fost poet.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ca s-explic a ta ființă, de gândiri am pus popoare,</p>
            <p class="mb-0 fst-italic">Ca idee pe idee să clădească pân-în soare,</p>
            <p class="mb-0 fst-italic">Cum popoarele antice în al Asiei pământ</p>
            <p class="mb-0 fst-italic">Au unit stâncă pe stâncă, mur pe mur s-ajungă-n ceruri.</p>
            <p class="mb-0 fst-italic">Un grăunte de-ndoială mestecat în adevăruri</p>
            <p class="mb-0 fst-italic">Și popoarele-mi de gânduri risipescu-se în vânt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cum ești tu nimeni n-o știe. Întrebările de tine,</p>
            <p class="mb-0 fst-italic">Pe-a istoriei lungi unde, se ridică ca ruine</p>
            <p class="mb-0 fst-italic">Și prin valuri de gândire mitici stânce se sulev;</p>
            <p class="mb-0 fst-italic">Nici un chip pe care lumea ți-l atribuiește ție</p>
            <p class="mb-0 fst-italic">Nu-i etern, ci cu mari cete d-îngeri, de ființi o mie,</p>
            <p class="mb-0 fst-italic">C-un cer încărcat de mite asfințești din ev în ev.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Timp, căci din izvoru-ți curge a istoriei gândire,</p>
            <p class="mb-0 fst-italic">Poți răspunde la-ntrebarea ce pătrunde-a noastră fire,</p>
            <p class="mb-0 fst-italic">La enigmele din cari ne simțim a fi compuși?</p>
            <p class="mb-0 fst-italic">Nu!... Tu măsuri intervalul de la leagăn pân- la groapă</p>
            <p class="mb-0 fst-italic">În ăst spaț nu-i adevărul. Orologiul ești ce sapă...</p>
            <p class="mb-0 fst-italic">Tu nedând vo dezlegare, duci l-a dezlegărei uși.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Ș-astăzi punctul de solstițiu a sosit în omenire.</p>
            <p class="mb-0 fst-italic">Din mărire la cădere, din cădere la mărire</p>
            <p class="mb-0 fst-italic">Astfel vezi roata istoriei întorcând schițele ei;</p>
            <p class="mb-0 fst-italic">În zădar palizi, siniștri, o privesc cugetătorii</p>
            <p class="mb-0 fst-italic">Și vor cursul să-l abată... Combinații iluzorii</p>
            <p class="mb-0 fst-italic">E apus de Zeitate ș-asfințire de idei.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Nimeni soarele n-oprește să apuie-n murgul serei,</p>
            <p class="mb-0 fst-italic">Nimeni Dumnezeu s-apuie de pe cerul cugetării,</p>
            <p class="mb-0 fst-italic">Nimeni noaptea să se-ntindă pe-a istoriei mormânt;</p>
            <p class="mb-0 fst-italic">Mulți copii bătrâni crezut-au cum că ei guvernă lume,</p>
            <p class="mb-0 fst-italic">Nesimțind că-s duși ei singuri de un val fără de nume.</p>
            <p class="mb-0 fst-italic">Că planetul ce îi poartă cugetă adânc și sfânt.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Se-nmulțesc semnele vremei, iară cerul de-nserare</p>
            <p class="mb-0 fst-italic">Roșu-i de războaie crunte, de-arderi mari, de disperare</p>
            <p class="mb-0 fst-italic">Și idei a zeci de secoli sunt reduse la nimic;</p>
            <p class="mb-0 fst-italic">Soarele divin ce-apune varsă ultimile-i raze</p>
            <p class="mb-0 fst-italic">Pe-a istoriei câmpie mult iubită și se lasă</p>
            <p class="mb-0 fst-italic">În oceanul de-ntuneric, ce s-arată inamic.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Spune-o veste cum că-n țara unde fug a lumii zile</p>
            <p class="mb-0 fst-italic">Să trăiască mai departe, strălucite și copile,</p>
            <p class="mb-0 fst-italic">Într-a nopților grădine stele cresc în loc de flori;</p>
            <p class="mb-0 fst-italic">Unde-n codrii de aramă cântă-n crengi arfe-atârnate,</p>
            <p class="mb-0 fst-italic">Zmeii-și fac din câte-un munte uriașele palate</p>
            <p class="mb-0 fst-italic">E un lac cu apă vie într-un șes încântător.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Cine bea din el nu moare... O, aș bea, să văd anume</p>
            <p class="mb-0 fst-italic">C-a venit domnia morții, sfărâmând bătrâna lume</p>
            <p class="mb-0 fst-italic">Stele cad și în cădere alte lumi rup cu lovire;</p>
            <p class="mb-0 fst-italic">Într-a cerurilor domă tunetele să vuiască</p>
            <p class="mb-0 fst-italic">Ca mari clopote de jale, fulgere să strălucească</p>
            <p class="mb-0 fst-italic">Ca făclii curate, sfinte pe pământu-nmormântat.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Marea valurle să-și miște și să tremure murindă,</p>
            <p class="mb-0 fst-italic">Norii, vulturii mariůmbrii, a lor aripi să-și aprindă,</p>
            <p class="mb-0 fst-italic">Fulgeri rătăciți s-alerge spintecând aerul mort;</p>
            <p class="mb-0 fst-italic">În catapeteasma lumii soarele să-ngălbenească,</p>
            <p class="mb-0 fst-italic">Ai pieirii palizi îngeri dintre flacăre să crească</p>
            <p class="mb-0 fst-italic">Și să rupă pânz-albastră pe-a cerimei întins cort.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Fulgerele să înghețe sus în nori. Să amorțească</p>
            <p class="mb-0 fst-italic">Tunetul și-adânc să tacă. Soarele să pâlpâiască,</p>
            <p class="mb-0 fst-italic">Să se stingă... Stele-n ceruri tremurând să cadă jos:</p>
            <p class="mb-0 fst-italic">Râur'le să se-nfioare și-n pământ să se ascunză</p>
            <p class="mb-0 fst-italic">Și să sece-a lumei față, să se facă neagră. Frunze</p>
            <p class="mb-0 fst-italic">Galbene, uscate, cerul lumile să-și cearnă jos.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Moartea-ntindă peste lume uriașele-i aripe:</p>
            <p class="mb-0 fst-italic">Întunericul e haina îngropatelor risipe.</p>
            <p class="mb-0 fst-italic">Câte-o stea întârziată stinge izvorul ei mic.</p>
            <p class="mb-0 fst-italic">Timpul mort și-ntinde membrii și devine veșnicie.</p>
            <p class="mb-0 fst-italic">Când nimic se întâmpla-va pe întinderea pustie</p>
            <p class="mb-0 fst-italic">Am să-ntreb: Ce-a rămas, oame, din puterea ta? Nimic!!</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Dar la ce să beau din lacul ce dă viață nesfârșită,</p>
            <p class="mb-0 fst-italic">Ca să văd istoria lumii dinainte-mi repețită,</p>
            <p class="mb-0 fst-italic">Cu aceleași lungi mizerii s-obosesc, sufletu-mi mut?</p>
            <p class="mb-0 fst-italic">Și să văd cum nasc popoare, cum trăiesc, cum mor. Și toate</p>
            <p class="mb-0 fst-italic">Cu virtuți, vicii aceleași, cu mizerii repetate...</p>
            <p class="mb-0 fst-italic">Vrei viitorul a-l cunoaște, te întoarce spre trecut.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Din agheazima din lacul, ce te-nchină nemurirei,</p>
            <p class="mb-0 fst-italic">E o picătură-n vinul poeziei ș-a gândirei,</p>
            <p class="mb-0 fst-italic">Dar o picătură numai. Decât altele, ce mor,</p>
            <p class="mb-0 fst-italic">Ele țin mai mult. Umane, vor pieri și ele toate.</p>
            <p class="mb-0 fst-italic">În zădar le scrii în piatră și le crezi eternizate,</p>
            <p class="mb-0 fst-italic">Căci eternă-i numai moartea, ce-i viață-i trecător.</p>
        </blockquote>

        <blockquote class="blockquote text-center">
            <p class="mb-0 fst-italic">Și de-aceea beau păharul poeziei înfocate.</p>
            <p class="mb-0 fst-italic">Nu-mi mai chinui cugetarea cu-ntrebări nedezlegate</p>
            <p class="mb-0 fst-italic">Să citesc din cartea lumii semne, ce noi nu le-am scris.</p>
            <p class="mb-0 fst-italic">La nimic reduce moartea cifra vieții cea obscură</p>
            <p class="mb-0 fst-italic">În zădar o măsurăm noi cu-a gândirilor măsură,</p>
            <p class="mb-0 fst-italic">Căci gândirile-s fantome, când viața este vis.</p>
        </blockquote>
    </articleTemp>

</template>
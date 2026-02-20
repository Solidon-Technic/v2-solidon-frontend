import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de cookies - Solidon",
  description:
    "Informații despre utilizarea cookie-urilor pe site-ul Solidon.",
}

export default function PoliticaDeCookiesPage() {
  return (
    <div className="content-container py-8 small:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl-semi text-ui-fg-base mb-10">
          Politica de cookies
        </h1>

        <div className="text-ui-fg-subtle space-y-10 text-base leading-7">
          <section>
            <p>
              Următoarele informații sunt prezentate în scopul de a informa utilizatorul în ceea ce privește utilizarea „cookie”-urilor în site-ul nostru sau în site-urile partenere.
            </p>
            <p className="mt-5">
              Acest website folosește cookie-uri proprii și de la terți pentru a furniza vizitatorilor o experiență mult mai bună de navigare și servicii adaptate nevoilor și interesului fiecăruia.
            </p>
            <p className="mt-5">
              În ceea ce numim „web 2.0”, „cookie”-urile joacă un rol important în facilitarea accesului și livrării multiplelor servicii de care utilizatorul se bucură pe internet, cum ar fi personalizarea anumitor setări precum: limba în care este vizualizat un site, moneda în care se exprimă anumite prețuri sau tarife, păstrarea opțiunilor pentru diverse produse (măsuri, alte detalii etc) în coșul de cumpărături (și memorarea acestor opțiuni) – generându-se astfel flexibilitatea „coșului de cumpărături” (accesarea preferințelor vechi prin accesarea butonului „înainte” și „înapoi”).
            </p>
            <p className="mt-5">
              Cookie-urile oferă deținătorilor de site-uri un feedback valoros asupra modului cum sunt utilizate site-urile lor de către utilizatori, astfel încât să le poată face și mai eficiente și mai accesibile pentru utilizatori. Permit aplicațiilor multimedia sau de alt tip de pe alte site-uri să fie incluse într-un anumit site pentru a crea o experiență de navigare mai valoroasă, mai utilă și mai plăcută; Îmbunătățesc eficiența publicității online.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Ce este un „cookie”?</h2>
            <p>
              Un „Internet Cookie” (termen cunoscut și ca „browser cookie” sau „HTTP cookie” sau pur și simplu „cookie”) este un fișier de mici dimensiuni, format din litere și numere, care va fi stocat pe computerul, terminalul mobil sau alte echipamente ale unui utilizator de pe care se accesează Internetul. Cookie-ul este instalat prin solicitarea emisă de către un web-server unui browser (ex: Internet Explorer, Chrome) și este complet „pasiv” (nu conține programe software, virusi sau spyware și nu poate accesa informațiile de pe hard drive-ul utilizatorului). Un cookie este format din 2 părți: numele și conținutul sau valoarea cookie-ului. Mai mult, durata de existență a unui cookie este determinată; tehnic, doar webserverul care a trimis cookie-ul îl poate accesa din nou în momentul în care un utilizator se întoarce pe website-ul asociat webserverului respectiv.
            </p>
            <p className="mt-5">
              Cookie-urile în sine nu solicită informații cu caracter personal pentru a putea fi utilizate și nu identifică personal utilizatorii de internet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Există 2 categorii mari de cookie-uri:</h2>
            <p>
              <strong>Cookie-uri de sesiune</strong> – acestea sunt stocate temporar în dosarul de cookie-uri al browserului web pentru ca acesta să le memoreze până când utilizatorul iese de pe web-siteul respectiv sau închide fereastra browserului (ex: în momentul logării/delogării pe un cont de webmail sau pe rețele de socializare).
            </p>
            <p className="mt-5">
              <strong>Cookie-uri Persistente</strong> – Acestea sunt stocate pe hard-drive-ul unui computer sau echipament (și în general depinde de durata de viață prestabilită pentru cookie). Cookie-urile persistente le includ și pe cele plasate de un alt website decât cel pe care îl vizitează utilizatorul la momentul respectiv – cunoscute sub numele de „third party cookies” (cookie-uri plasate de terți) – care pot fi folosite în mod anonim pentru a memora interesele unui utilizator, astfel încât să fie livrată publicitate cât mai relevantă pentru utilizatori.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Care sunt avantajele cookie-urilor?</h2>
            <p>
              Un cookie conține informații care fac legătura între un web-browser (utilizatorul) și un web-server anume (website-ul). Dacă un browser accesează acel web-server din nou, acesta poate citi informația deja stocată și reacționa în consecință. Cookie-urile asigură userilor o experiență plăcută de navigare și susțin eforturile multor website-uri pentru a oferi servicii confortabile utilizatorilor: ex – preferințele în materie de confidențialitate online, opțiunile privind limba site-ului, coșuri de cumpărături sau publicitate relevantă.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Care este durata de viață a unui cookie?</h2>
            <p>
              Cookie-urile sunt administrate de webservere. Durata de viață a unui cookie poate varia semnificativ, depinzând de scopul pentru care este plasat. Unele cookie-uri sunt folosite exclusiv pentru o singură sesiune (session cookies) și nu mai sunt reținute odată ce utilizatorul a părăsit website-ul și unele cookie-uri sunt reținute și refolosite de fiecare dată când utilizatorul revine pe acel website („cookie-uri permanente”). Cu toate acestea, cookie-urile pot fi șterse de un utilizator în orice moment prin intermediul setărilor browserului.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Ce sunt cookie-urile plasate de terți?</h2>
            <p>
              Anumite secțiuni de conținut de pe unele site-uri pot fi furnizate prin intermediul unor terțe părți/furnizori (ex: news box, un video sau o reclamă). Aceste terțe părți pot plasa de asemenea cookie-uri prin intermediul site-ului și ele se numesc „third party cookies” pentru că nu sunt plasate de proprietarul website-ului respectiv. Furnizorii terți trebuie să respecte de asemenea legea în vigoare și politicile de confidențialitate ale deținătorului site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cum sunt folosite cookie-urile de către acest site?</h2>
            <p className="mb-3">O vizită pe acest site poate plasa cookie-uri în scopuri de:</p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Cookie-uri de performanță a site-ului</li>
              <li>Cookie-uri de analiză a vizitatorilor</li>
              <li>Cookie-uri pentru geotargetting</li>
              <li>Cookie-uri de înregistrare</li>
              <li>Cookie-uri pentru publicitate</li>
              <li>Cookie-uri ale furnizorilor de publicitate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cookie-uri de performanță</h2>
            <p>
              Acest tip de cookie reține preferințele utilizatorului pe acest site, astfel încât nu mai este nevoie de setarea lor la fiecare vizită a site-ului. Exemple: setările volumului pentru video player, viteza de video streaming cu care este compatibil browserul.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cookie-uri pentru analiza vizitatorilor</h2>
            <p>
              De fiecare dată când un utilizator vizitează acest site, softul de analytics furnizat de o terță parte generează un cookie de analiză a utilizatorului. Acest cookie ne spune dacă ați mai vizitat acest site până acum. Browserul ne va spune dacă aveți acest cookie, iar dacă nu, vom genera unul. Acesta permite monitorizarea utilizatorilor unici care ne vizitează și cât de des o fac. Atât timp cât nu sunteți înregistrat pe acest site, acest cookie nu poate fi folosit pentru a identifica persoanele fizice, ele sunt folosite doar în scop statistic.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cookie-uri pentru geotargetting</h2>
            <p>
              Aceste cookie-uri sunt utilizate de către un soft care stabilește din ce țară proveniți. Este complet anonim și este folosit doar pentru a targeta conținutul – chiar și atunci când sunteți pe pagina noastră în limba română sau în altă limbă primiți aceeași reclamă.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cookie-uri pentru înregistrare</h2>
            <p>
              Atunci când vă înregistrați pe acest site, generăm un cookie care ne anunță dacă sunteți înregistrat sau nu. Serverele noastre folosesc aceste cookie-uri pentru a ne arăta contul cu care sunteți înregistrat și dacă aveți permisiunea pentru un serviciu anume. De asemenea, ne permite să asociem orice comentariu pe care îl postați pe site-ul nostru cu username-ul dvs. Dacă nu ați selectat „păstrează-mă înregistrat”, acest cookie se va șterge automat când veți închide browserul sau calculatorul.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cookie-uri pentru publicitate</h2>
            <p>
              Aceste cookie-uri ne permit să aflăm dacă ați vizualizat sau nu o reclamă online, care este tipul acesteia și cât timp a trecut de când ați văzut mesajul publicitar. Aceste cookie-uri le folosim și pentru a targeta publicitatea online. Putem folosi, de asemenea, cookie-uri apartinând unei terțe părți, pentru o mai bună targetare a publicității, pentru a arăta de exemplu reclame despre vacanțe, dacă utilizatorul a vizitat recent un articol pe site despre vacanțe. Aceste cookie-uri sunt anonime, ele stochează informații despre conținutul vizualizat, nu despre utilizatori. De asemenea, setăm cookie-uri anonime și prin alte site-uri pe care avem publicitate. Primindu-le, astfel, noi le putem folosi pentru a vă recunoaște ca vizitator al acelui site dacă ulterior veți vizita site-ul nostru, vă vom putea livra publicitatea bazată pe această informație.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cookie-uri ale furnizorilor de publicitate</h2>
            <p>
              O mare parte din publicitatea pe care o găsiți pe acest site aparține terțelor părți. Unele dintre aceste părți folosesc propriile cookie-uri anonime pentru a analiza cât de multe persoane au fost expuse unui mesaj publicitar, sau pentru a vedea câte persoane au fost expuse de mai multe ori la aceeași reclamă. Companiile care generează aceste cookie-uri au propriile politici de confidențialitate, iar acest site nu are acces pentru a citi sau scrie aceste cookie-uri. Cookie-urile celor terțe părți pot fi folosite pentru a vă arăta publicitatea targetată și pe alte site-uri, bazându-se pe navigarea dvs. pe acest site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Alte cookie-uri ale terțelor părți</h2>
            <p>
              Pe unele pagini, terții pot seta propriile cookie-uri anonime, în scopul de a urmări succesul unei aplicații sau pentru a customiza o aplicație. Datorită modului de utilizare, acest site nu poate accesa aceste cookie-uri, la fel cum terțele părți nu pot accesa cookie-urile deținute de acest site. De exemplu, când distribuiți un articol folosind butonul pentru rețelele sociale aflat pe acest site, acea rețea socială va înregistra activitatea dvs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Ce tip de informații sunt stocate și accesate prin intermediul cookie-urilor?</h2>
            <p>
              Cookie-urile păstrează informații într-un fișier text de mici dimensiuni care permit unui website să recunoască un browser. Webserverul va recunoaște browserul până când cookie-ul expiră sau este șters. Cookie-ul stochează informații importante care îmbunătățesc experiența de navigare pe Internet (ex: setările limbii în care se dorește accesarea unui site; păstrarea unui user logat în contul de webmail; securitatea online banking; păstrarea produselor în coșul de cumpărături).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">De ce sunt cookie-urile importante pentru Internet?</h2>
            <p>
              Cookie-urile reprezintă punctul central al funcționării eficiente a Internetului, ajutând la generarea unei experiențe de navigare prietenoase și adaptate preferințelor și intereselor fiecărui utilizator. Refuzarea sau dezactivarea cookie-urilor poate face unele site-uri imposibil de folosit. Refuzarea sau dezactivarea cookie-urilor nu înseamnă că nu veți mai primi publicitate online – ci doar că aceasta nu vă va mai putea ține cont de preferințele și interesele dvs., evidențiate prin comportamentul de navigare.
            </p>
            <p className="mt-5">
              Exemple de întrebuințări importante ale cookie-urilor (care nu necesită autentificarea unui utilizator prin intermediul unui cont): Conținut și servicii adaptate preferințelor utilizatorului – categorii de știri, vreme, sport, hărți, servicii publice și guvernamentale, site-uri de entertainment și servicii de travel. Oferte adaptate pe interesele utilizatorilor – reținerea parolelor, preferințele de limbă (Ex: afișarea rezultatelor căutărilor în limba Română). Reținerea filtrelor de protecție a copiilor privind conținutul pe Internet (opțiuni family mode, funcții de safe search). Limitarea frecvenței de difuzare a reclamelor – limitarea numărului de afișări a unei reclame pentru un anumit utilizator pe un site. Furnizarea de publicitate mai relevantă pentru utilizator. Măsurarea, optimizarea și caracteristicile de analytics – cum ar fi confirmarea unui anumit nivel de trafic pe un website, ce tip de conținut este vizualizat și modul cum un utilizator ajunge pe un website (ex prin motoare de căutare, direct, din alte website-uri etc). Website-urile derulează aceste analize a utilizării lor pentru a îmbunătăți site-urile în beneficiul userilor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Securitate și probleme legate de confidențialitate</h2>
            <p>
              Cookie-urile NU sunt virusi! Ele folosesc formate tip plain text. Nu sunt alcătuite din bucăți de cod așa că nu pot fi executate nici nu pot auto-rula. În consecință, nu se pot duplica sau replica pe alte rețele pentru a se rula sau replica din nou. Deoarece nu pot îndeplini aceste funcții, nu pot fi considerate virusi. Cookie-urile pot fi totuși folosite pentru scopuri negative. Deoarece stochează informații despre preferințele și istoricul de navigare al utilizatorilor, atât pe un anume site cât și pe mai multe alte site-uri, cookie-urile pot fi folosite ca o formă de Spyware. Multe produse anti-spyware sunt conștiente de acest fapt și în mod constant marchează cookie-urile pentru a fi șterse în cadrul procedurilor de ștergere/scanare anti-virus/anti-spyware. În general browserele au integrate setări de confidențialitate care furnizează diferite nivele de acceptare a cookie-urilor, perioada de valabilitate și ștergere automată după ce utilizatorul a vizitat un anumit site.
            </p>
            <p className="mt-5">
              Alte aspecte de securitate legate de cookie-uri: Deoarece protecția identității este foarte valoroasă și reprezintă dreptul fiecărui utilizator de internet, este indicat să se știe ce eventuale probleme pot crea cookie-urile. Pentru că prin intermediul lor se transmit în mod constant în ambele sensuri informații între browser și website, dacă un atacator sau persoană neautorizată intervine în parcursul de transmitere a datelor, informațiile conținute de cookie pot fi interceptate. Deși foarte rar, acest lucru se poate întâmpla dacă browserul se conectează la server folosind o rețea necriptată (ex: o rețea WiFi nesecurizată). Alte atacuri bazate pe cookie implică setări greșite ale cookie-urilor pe servere. Dacă un website nu solicită browserului să folosească doar canale criptate, atacatorii pot folosi această vulnerabilitate pentru a păcăli browserele în a trimite informații prin intermediul canalelor nesecurizate. Atacatorii utilizează apoi informațiile în scopuri de a accesa neautorizat anumite site-uri. Este foarte important să fiți atenți în alegerea metodei celei mai potrivite de protecție a informațiilor personale.
            </p>
            <p className="mt-5">
              Sfaturi pentru o navigare sigură și responsabilă, bazată pe cookies: Datorită flexibilității lor și a faptului că majoritatea dintre cele mai vizitate site-uri și cele mai mari folosesc cookie-uri, acestea sunt aproape inevitabile. Dezactivarea cookie-urilor nu va permite accesul utilizatorului pe site-urile cele mai răspândite și utilizate printre care Youtube, Gmail, Yahoo și altele.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Câteva sfaturi care vă pot asigura că navigați fără griji însă cu ajutorul cookie-urilor</h2>
            <p>
              Particularizați-vă setările browserului în ceea ce privește cookie-urile pentru a reflecta un nivel confortabil pentru voi al securității utilizării cookie-urilor. Dacă nu vă deranjează cookie-urile și sunteți singura persoană care utilizează computerul, puteți seta termene lungi de expirare pentru stocarea istoricului de navigare și al datelor personale de acces. Dacă împărțiți accesul la calculator, puteți lua în considerare setarea browserului pentru a șterge datele individuale de navigare de fiecare dată când închideți browserul. Aceasta este o variantă de a accesa site-urile care plasează cookie-uri și de a șterge orice informație de vizitare la închiderea sesiunii de navigare. Instalați-vă și actualizați-vă constant aplicații antispyware. Multe dintre aplicațiile de detectare și prevenire a spyware-ului includ detectarea atacurilor pe site-uri. Astfel, împiedică browserul de la a accesa website-uri care ar putea să exploateze vulnerabilitățile browserului sau să descarce software periculos. Asigurați-vă că aveți browserul mereu actualizat. Multe dintre atacurile bazate pe cookies se realizează exploatând punctele slabe ale versiunilor vechi ale browserelor. Cookie-urile sunt pretutindeni și nu pot fi evitate dacă doriți să vă bucurați de acces pe cele mai bune și cele mai mari site-uri de pe Internet – locale sau internaționale. Cu o înțelegere clară a modului lor de operare și a beneficiilor pe care le aduc, puteți lua măsurile necesare de securitate astfel încât să puteți naviga cu încredere pe internet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Cum pot opri cookie-urile?</h2>
            <p>
              Dezactivarea și refuzul de a primi cookie-uri pot face anumite site-uri impracticabile sau dificil de vizitat și folosit. De asemenea, refuzul de a accepta cookie-uri nu înseamnă că nu veți mai primi/vedea publicitate online. Este posibilă setarea din browser pentru ca aceste cookie-uri să nu mai fie acceptate sau puteți seta browserul să accepte cookie-uri de la un site anume. Dar, de exemplu, dacă nu sunteți înregistrat folosind cookie-urile, nu veți putea lăsa comentarii. Toate browserele moderne oferă posibilitatea de a schimba setările cookie-urilor. Aceste setări se găsesc de regulă în „opțiuni” sau în meniul de „preferințe” al browserului tău.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">Link-uri utile</h2>
            <ul className="space-y-3 text-base">
              <li>
                <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-space_indigo hover:underline text-base">
                  allaboutcookies.org
                </a>
              </li>
              <li>
                <a href="http://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noopener noreferrer" className="text-space_indigo hover:underline text-base">
                  Wikipedia - HTTP cookie
                </a>
              </li>
              <li>
                <a href="http://www.google.com/intl/ro/policies/technologies/cookies/" target="_blank" rel="noopener noreferrer" className="text-space_indigo hover:underline text-base">
                  Google - Politica de cookies
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/help/cookies" target="_blank" rel="noopener noreferrer" className="text-space_indigo hover:underline text-base">
                  Facebook - Ajutor cookies
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

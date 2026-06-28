- refactor login page (style)

# special bet scoring
## a) anzeige der punkte und rihcigen antwort
- in daten > spezialtippvergleich
- in tippen > spezialwetten 
## b) anzeige der punkte
- in daten > ranking volle summe, nur match und nur special pts aufschlüsse
- in history mit nem button auch auswählen welche der drei
- bei den anderen stats drauf achten dass nur die match bets ausgewertet werdne
## c) korrekte vergabe der punkte
- gruppen sieger tipps:
    - phase 1: ergebnis ermitteln (on match finish und 1h standing fetch)
        - prüfe ob gruppenphase beendet
        - falls ja, ermittle position 1 pro gruppe
        - speichere in specialBetDefinition das ergebnis
    - phase 2: punkte vergeben (on match finish und 1h standing fetch)
        - prüfe ob die special bet definition als finalized iengestuft
        - falls nein: ergebnis == bet ? 5 pkt : 0 pkt
- torschützenkönig tipps
    - phase 1: (manuell)
        - manuell ergebnis eintragen
    - phase 2: (on match finish und 1h competition fetch)
        - prüfe ob die special bet definition als finalized iengestuft
        - falls nein: ergebnis == bet ? 5 pkt : 0 pkt
- deutschland exit tipp
    - phase 1: ergebnis ermitteln
        - on match ende:
            - falls gruppenphase beendet:
                - platz 4 ist raus, platz 3 prüfe ob d in any ko phasen match
            - falls sonstige stage:
                - wenn du verloren setze exit
    


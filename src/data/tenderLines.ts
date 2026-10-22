// Fake tender lines (Leistungsverzeichnis) for Storybook and prototyping.
// All products, article numbers and quantities are made up.
// Mix: 15 high, 8 check, 5 no-match, 2 errors (lines the AI couldn't read properly).

type Product = {
  name: string
  sku: string
}

type TenderLineBase = {
  position: string
  request: string
  quantity: number | null
  unit: string
}

export type TenderLine = TenderLineBase &
  (
    | { confidence: 'high' | 'check'; suggestion: Product }
    | { confidence: 'no-match' }
    | { confidence: 'error'; error: string }
  )

export const tenderLines: TenderLine[] = [
  // 01 Befestigungstechnik
  {
    position: '01.0010',
    request: 'Sechskantschraube M8 x 40, verzinkt',
    quantity: 500,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Sechskantschraube DIN 933 M8 x 40, verzinkt', sku: '933-0840-VZ' },
  },
  {
    position: '01.0020',
    request: 'Unterlegscheibe M8, verzinkt',
    quantity: 500,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Unterlegscheibe DIN 125 A 8,4, verzinkt', sku: '125-0084-VZ' },
  },
  {
    position: '01.0030',
    request: 'Sechskantmutter M8, verzinkt',
    quantity: 500,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Sechskantmutter DIN 934 M8, verzinkt', sku: '934-0008-VZ' },
  },
  {
    position: '01.0040',
    request: 'Spanplattenschraube 4 x 40, Senkkopf, Torx',
    quantity: 2000,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Spanplattenschraube 4,0 x 40 TX20, verzinkt', sku: 'SPS-4040-TX' },
  },
  {
    position: '01.0050',
    request: 'Dübel für Beton, 10 mm, ca. 200 Stück',
    quantity: 200,
    unit: 'Stk',
    confidence: 'check',
    suggestion: { name: 'Universaldübel UX 10 x 60', sku: 'UX-1060' },
  },
  {
    // Tender asks for stainless steel, suggestion is zinc-plated.
    position: '01.0060',
    request: 'Holzschraube 6 x 80, Edelstahl A2',
    quantity: 300,
    unit: 'Stk',
    confidence: 'check',
    suggestion: { name: 'Tellerkopfschraube 6,0 x 80 TX30, verzinkt', sku: 'TKS-6080-VZ' },
  },

  // 02 Trockenbau
  {
    position: '02.0010',
    request: 'Gipskartonplatte 12,5 mm, 1250 x 2000 mm',
    quantity: 120,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Gipskartonplatte GKB 12,5 x 1250 x 2000 mm', sku: 'GKB-1252000' },
  },
  {
    position: '02.0020',
    request: 'CW-Profil 50 mm, Länge 2600 mm',
    quantity: 80,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'CW-Ständerprofil 50 x 50 x 0,6 mm, 2600 mm', sku: 'CW50-2600' },
  },
  {
    position: '02.0030',
    request: 'UW-Profil 50 mm, Länge 4000 mm',
    quantity: 40,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'UW-Anschlussprofil 50 x 40 x 0,6 mm, 4000 mm', sku: 'UW50-4000' },
  },
  {
    position: '02.0040',
    request: 'Schnellbauschrauben 3,5 x 25 für Gipskarton',
    quantity: 10,
    unit: 'Pak',
    confidence: 'high',
    suggestion: { name: 'Schnellbauschraube 3,5 x 25 mm, Feingewinde, 1000 Stk', sku: 'SBS-3525-FG' },
  },
  {
    // Tender gives m², product is sold per package.
    position: '02.0050',
    request: 'Dämmwolle 40 mm für Trennwand',
    quantity: 90,
    unit: 'm²',
    confidence: 'check',
    suggestion: { name: 'Trennwandplatte Mineralwolle 40 mm, WLG 040', sku: 'TWP-40-040' },
  },
  {
    position: '02.0060',
    request: 'Revisionsklappe 300 x 300 mm, Brandschutz EI 30',
    quantity: 6,
    unit: 'Stk',
    confidence: 'no-match',
  },

  // 03 Elektro
  {
    position: '03.0010',
    request: 'Installationskabel NYM-J 3 x 1,5 mm²',
    quantity: 300,
    unit: 'm',
    confidence: 'high',
    suggestion: { name: 'Mantelleitung NYM-J 3 x 1,5 mm², grau', sku: 'NYM-3150-R100' },
  },
  {
    // Tender asks for 2,5 mm², suggestion is 1,5 mm².
    position: '03.0020',
    request: 'Installationskabel NYM-J 5 x 2,5 mm²',
    quantity: 120,
    unit: 'm',
    confidence: 'check',
    suggestion: { name: 'Mantelleitung NYM-J 5 x 1,5 mm², grau', sku: 'NYM-5150-R100' },
  },
  {
    position: '03.0030',
    request: 'Unterputzdose 60 mm, tief',
    quantity: 150,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Geräte-Verbindungsdose 60 mm, tief', sku: 'UP-60-T' },
  },
  {
    // Suggestion is only the switch insert; the rocker is missing.
    position: '03.0040',
    request: 'Schalter Aus/Wechsel, komplett, reinweiß',
    quantity: 60,
    unit: 'Stk',
    confidence: 'check',
    suggestion: { name: 'Wechselschalter-Einsatz 10 A, ohne Wippe', sku: 'WS-10A-E' },
  },
  {
    position: '03.0050',
    request: 'Bodentank für Hohlboden, 3 Steckdosen, Edelstahl',
    quantity: 4,
    unit: 'Stk',
    confidence: 'no-match',
  },
  {
    // Error 1 of 2: the tender has no quantity for this line.
    position: '03.0060',
    request: 'Leerrohr flexibel M25, grau',
    quantity: null,
    unit: 'm',
    confidence: 'error',
    error: 'Menge fehlt in der Ausschreibung',
  },

  // 04 Dichten und Kleben
  {
    position: '04.0010',
    request: 'Silikon sanitär, weiß, 310 ml',
    quantity: 48,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Sanitär-Silikon weiß, Kartusche 310 ml', sku: 'SIL-310-WS' },
  },
  {
    position: '04.0020',
    request: 'Montageschaum 750 ml, Pistolenschaum',
    quantity: 24,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'PU-Pistolenschaum B2, 750 ml', sku: 'PU-750-PS' },
  },
  {
    // Tender doesn't say the cartridge size.
    position: '04.0030',
    request: 'Acryl überstreichbar, weiß',
    quantity: 36,
    unit: 'Stk',
    confidence: 'check',
    suggestion: { name: 'Maler-Acryl weiß, Kartusche 310 ml', sku: 'ACR-310-WS' },
  },
  {
    position: '04.0040',
    request: 'Brandschutzmanschette für Kunststoffrohr DN 110',
    quantity: 12,
    unit: 'Stk',
    confidence: 'no-match',
  },

  // 05 Fliesenarbeiten
  {
    position: '05.0010',
    request: 'Fliesenkleber flexibel C2TE S1, 25 kg',
    quantity: 40,
    unit: 'Sack',
    confidence: 'high',
    suggestion: { name: 'Flexkleber C2TE S1, grau, 25 kg', sku: 'FK-C2S1-25' },
  },
  {
    position: '05.0020',
    request: 'Fugenmörtel grau, 5 kg',
    quantity: 20,
    unit: 'Stk',
    confidence: 'high',
    suggestion: { name: 'Flexfugenmörtel CG2 WA, grau, 5 kg', sku: 'FM-CG2-5G' },
  },
  {
    // Tender gives litres, product is sold in 10 l canisters.
    position: '05.0030',
    request: 'Grundierung für saugende Untergründe',
    quantity: 50,
    unit: 'l',
    confidence: 'check',
    suggestion: { name: 'Tiefengrund LF, lösemittelfrei, 10 l', sku: 'TG-LF-10' },
  },
  {
    position: '05.0040',
    request: 'Edelstahl-Winkel 90°, Sonderanfertigung nach Zeichnung',
    quantity: 8,
    unit: 'Stk',
    confidence: 'no-match',
  },

  // 06 Baustelleneinrichtung
  {
    position: '06.0010',
    request: 'Malerkrepp 30 mm x 50 m',
    quantity: 60,
    unit: 'Rolle',
    confidence: 'high',
    suggestion: { name: 'Abdeckband Krepp 30 mm x 50 m', sku: 'MK-3050' },
  },
  {
    // Tender asks for 4 x 5 m, suggestion is 4 x 12,5 m.
    position: '06.0020',
    request: 'Abdeckfolie 4 x 5 m',
    quantity: 30,
    unit: 'Stk',
    confidence: 'check',
    suggestion: { name: 'Abdeckfolie LDPE 4 x 12,5 m, 20 µ', sku: 'AF-4125' },
  },
  {
    position: '06.0030',
    request: 'Bauzaun-Banner mit Firmenlogo, 3,4 x 1,7 m',
    quantity: 2,
    unit: 'Stk',
    confidence: 'no-match',
  },
  {
    // Error 2 of 2: the line was cut off when the tender PDF was read.
    position: '06.0040',
    request: 'Abdeckrahmen 2-fach, rein',
    quantity: 40,
    unit: 'Stk',
    confidence: 'error',
    error: 'Text unvollständig – Zeile im PDF abgeschnitten',
  },
]

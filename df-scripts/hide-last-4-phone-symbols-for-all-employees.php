$records = $event['response']['content']['resource'];

foreach($records as $index => $record){
    $record['telephone'] = str_replace(substr($record['telephone'], -4), '****', $record['telephone']);
    $records[$index] = $record;
}

$event['response']['content']['resource'] = $records;

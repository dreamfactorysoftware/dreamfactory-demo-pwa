$record = $event['response']['content'];
$record['telephone'] = str_replace(substr($record['telephone'], -4), '****', $record['telephone']);

$event['response']['content']= $record;

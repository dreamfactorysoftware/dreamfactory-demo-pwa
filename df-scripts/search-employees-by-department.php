$relationship_name = 'employees_by_dept_emp';
$related_filter_name = 'employees_by_dept_emp_filter';
$related_service_name = 'mysql';
$related_table_name = 'employees';
$related_id_field = 'emp_no';
$related_endpoint = $related_service_name . '/_table/' . $related_table_name;
$options = [];
$options['parameters'] = [];
$params = $event['request']['parameters'];
$get = $platform['api']->get;

function map($record)
{
    return $record['emp_no'];
}

if (isset($params['related'])) {
    if (isset($params[$related_filter_name])) {
        if (isset($params['related'][$relationship_name])) {
            $options['parameters']['fields'] = $related_id_field;
            $options['parameters']['filter'] = $params[$related_filter_name];
            $related_result = $get($related_endpoint, null, $options);

            $result = [];
            $filteredEmployee = $related_result['content']['resource'];
            $deptEmp = $event['response']['content'][$relationship_name];

            preg_match('/.*\%(.*)\%/m', $options['parameters']['filter'], $matches);

            if ($matches[1] !== '') {
                foreach($deptEmp as $dEmployee){
                foreach($filteredEmployee as $fEmployee) {
                    if($dEmployee['emp_no'] === $fEmployee['emp_no']) {
                        $result [] = $dEmployee;
                    }
                }
            }
            $event['response']['content'][$relationship_name] = $result;
            }
        }
    }
}
